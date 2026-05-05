import {
  ProjectDomainError,
  PROJECT_ERROR_MESSAGES,
} from "@/lib/projects";
import {
  createProjectAction,
  closeProjectAction,
  updateProjectAction,
} from "@/app/dashboard/projects/actions";
import { initialProjectActionState } from "@/app/dashboard/projects/action-state";
import { revalidatePath } from "next/cache";
import { createProject, closeProject, updateProject } from "@/lib/projects";
import { getCurrentUser } from "@/lib/user";

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

vi.mock("@/lib/user", () => ({
  getCurrentUser: vi.fn(),
}));

vi.mock("@/lib/projects", async () => {
  const actual = await vi.importActual<typeof import("@/lib/projects")>(
    "@/lib/projects"
  );

  return {
    ...actual,
    createProject: vi.fn(),
    updateProject: vi.fn(),
    closeProject: vi.fn(),
  };
});

const mockedCreateProject = vi.mocked(createProject);
const mockedUpdateProject = vi.mocked(updateProject);
const mockedCloseProject = vi.mocked(closeProject);
const mockedGetCurrentUser = vi.mocked(getCurrentUser);
const mockedRevalidatePath = vi.mocked(revalidatePath);

describe("project actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockedGetCurrentUser.mockResolvedValue({
      id: "user-1",
      supabaseId: "supabase-1",
      email: "marta@example.com",
      name: "Marta",
      image: null,
      createdAt: new Date("2026-05-05T08:00:00.000Z"),
      updatedAt: new Date("2026-05-05T08:00:00.000Z"),
    });
  });

  it("creates a project from form data and revalidates the projects page", async () => {
    mockedCreateProject.mockResolvedValue({
      id: "project-1",
      name: "Digital Transformation",
      normalizedName: "digital transformation",
      isActive: true,
      clientId: "client-1",
      createdAt: new Date("2026-05-05T10:00:00.000Z"),
      updatedAt: new Date("2026-05-05T10:00:00.000Z"),
    });

    const formData = new FormData();
    formData.set("name", "Digital Transformation");
    formData.set("clientId", "client-1");

    await expect(
      createProjectAction(initialProjectActionState, formData)
    ).resolves.toEqual({
      status: "success",
      message: "Commessa creata correttamente.",
    });

    expect(mockedCreateProject).toHaveBeenCalledWith({
      name: "Digital Transformation",
      clientId: "client-1",
    });
    expect(mockedRevalidatePath).toHaveBeenCalledWith("/dashboard/projects");
  });

  it("returns a stable error state when the domain rejects a duplicate name", async () => {
    mockedCreateProject.mockRejectedValue(
      new ProjectDomainError(
        "DUPLICATE_NAME",
        PROJECT_ERROR_MESSAGES.duplicateName
      )
    );

    const formData = new FormData();
    formData.set("name", "Digital Transformation");
    formData.set("clientId", "client-1");

    await expect(
      createProjectAction(initialProjectActionState, formData)
    ).resolves.toEqual({
      status: "error",
      message: PROJECT_ERROR_MESSAGES.duplicateName,
    });

    expect(mockedRevalidatePath).not.toHaveBeenCalled();
  });

  it("returns an error when the client is inactive", async () => {
    mockedCreateProject.mockRejectedValue(
      new ProjectDomainError(
        "CLIENT_INACTIVE",
        PROJECT_ERROR_MESSAGES.clientInactive
      )
    );

    const formData = new FormData();
    formData.set("name", "New Project");
    formData.set("clientId", "client-2");

    await expect(
      createProjectAction(initialProjectActionState, formData)
    ).resolves.toEqual({
      status: "error",
      message: PROJECT_ERROR_MESSAGES.clientInactive,
    });
  });

  it("returns an error immediately when close is missing the project id", async () => {
    const formData = new FormData();

    await expect(
      closeProjectAction(initialProjectActionState, formData)
    ).resolves.toEqual({
      status: "error",
      message: "Commessa non trovata.",
      fields: { projectId: "missing" },
    });

    expect(mockedCloseProject).not.toHaveBeenCalled();
    expect(mockedRevalidatePath).not.toHaveBeenCalled();
  });

  it("closes a project and revalidates", async () => {
    mockedCloseProject.mockResolvedValue({
      id: "project-1",
      name: "Digital Transformation",
      normalizedName: "digital transformation",
      isActive: false,
      clientId: "client-1",
      createdAt: new Date("2026-05-05T10:00:00.000Z"),
      updatedAt: new Date("2026-05-05T11:00:00.000Z"),
    });

    const formData = new FormData();
    formData.set("projectId", "project-1");

    await expect(
      closeProjectAction(initialProjectActionState, formData)
    ).resolves.toEqual({
      status: "success",
      message: "Commessa chiusa correttamente.",
    });

    expect(mockedCloseProject).toHaveBeenCalledWith("project-1");
    expect(mockedRevalidatePath).toHaveBeenCalledWith("/dashboard/projects");
  });

  it("updates a project from form data and revalidates", async () => {
    mockedUpdateProject.mockResolvedValue({
      id: "project-1",
      name: "Digital Transformation 2.0",
      normalizedName: "digital transformation 2.0",
      isActive: true,
      clientId: "client-1",
      createdAt: new Date("2026-05-05T10:00:00.000Z"),
      updatedAt: new Date("2026-05-05T11:00:00.000Z"),
    });

    const formData = new FormData();
    formData.set("projectId", "project-1");
    formData.set("name", "Digital Transformation 2.0");
    formData.set("clientId", "client-1");

    await expect(
      updateProjectAction(initialProjectActionState, formData)
    ).resolves.toEqual({
      status: "success",
      message: "Commessa aggiornata correttamente.",
    });

    expect(mockedUpdateProject).toHaveBeenCalledWith("project-1", {
      name: "Digital Transformation 2.0",
      clientId: "client-1",
    });
    expect(mockedRevalidatePath).toHaveBeenCalledWith("/dashboard/projects");
  });

  it("returns a stable error state when the user is not authenticated", async () => {
    mockedGetCurrentUser.mockResolvedValue(null);

    const formData = new FormData();
    formData.set("name", "Digital Transformation");
    formData.set("clientId", "client-1");

    await expect(
      createProjectAction(initialProjectActionState, formData)
    ).resolves.toEqual({
      status: "error",
      message: "Sessione scaduta. Accedi di nuovo.",
    });

    expect(mockedCreateProject).not.toHaveBeenCalled();
    expect(mockedRevalidatePath).not.toHaveBeenCalled();
  });
});
