import { prisma } from "@/lib/prisma";
import {
  ProjectDomainError,
  PROJECT_ERROR_MESSAGES,
  createProject,
  updateProject,
  closeProject,
  listProjects,
  listActiveProjects,
  getProjectById,
} from "@/lib/projects";

vi.mock("@/lib/prisma", () => ({
  prisma: {
    project: {
      findMany: vi.fn(),
      findFirst: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    },
    client: {
      findUnique: vi.fn(),
    },
  },
}));

const mockedProject = vi.mocked(prisma.project);
const mockedClient = vi.mocked(prisma.client);

const activeClient = {
  id: "client-1",
  name: "Acme Corp",
  normalizedName: "acme corp",
  isActive: true,
  createdAt: new Date("2026-05-05T08:00:00.000Z"),
  updatedAt: new Date("2026-05-05T08:00:00.000Z"),
};

const inactiveClient = {
  ...activeClient,
  id: "client-2",
  name: "Inactive Inc",
  normalizedName: "inactive inc",
  isActive: false,
};

const sampleProject = {
  id: "project-1",
  name: "Digital Transformation",
  normalizedName: "digital transformation",
  isActive: true,
  clientId: "client-1",
  createdAt: new Date("2026-05-05T10:00:00.000Z"),
  updatedAt: new Date("2026-05-05T10:00:00.000Z"),
};

describe("createProject", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("creates a project when the client is active and name is unique", async () => {
    mockedClient.findUnique.mockResolvedValue(activeClient);
    mockedProject.findFirst.mockResolvedValue(null);
    mockedProject.create.mockResolvedValue(sampleProject);

    const result = await createProject({
      name: "  Digital Transformation  ",
      clientId: "client-1",
    });

    expect(result).toEqual(sampleProject);
    expect(mockedProject.create).toHaveBeenCalledWith({
      data: {
        name: "Digital Transformation",
        normalizedName: "digital transformation",
        clientId: "client-1",
      },
      include: { client: { select: { id: true, name: true } } },
    });
  });

  it("rejects an empty name", async () => {
    await expect(
      createProject({ name: "  ", clientId: "client-1" })
    ).rejects.toThrow(
      new ProjectDomainError("REQUIRED_NAME", PROJECT_ERROR_MESSAGES.requiredName)
    );

    expect(mockedProject.create).not.toHaveBeenCalled();
  });

  it("rejects a duplicate name for the same client", async () => {
    mockedClient.findUnique.mockResolvedValue(activeClient);
    mockedProject.findFirst.mockResolvedValue({ id: "existing" });

    await expect(
      createProject({ name: "Digital Transformation", clientId: "client-1" })
    ).rejects.toThrow(
      new ProjectDomainError(
        "DUPLICATE_NAME",
        PROJECT_ERROR_MESSAGES.duplicateName
      )
    );

    expect(mockedProject.create).not.toHaveBeenCalled();
  });

  it("rejects creation when the client does not exist", async () => {
    mockedClient.findUnique.mockResolvedValue(null);

    await expect(
      createProject({ name: "New Project", clientId: "nonexistent" })
    ).rejects.toThrow(
      new ProjectDomainError(
        "CLIENT_NOT_FOUND",
        PROJECT_ERROR_MESSAGES.clientNotFound
      )
    );

    expect(mockedProject.create).not.toHaveBeenCalled();
  });

  it("rejects creation when the client is inactive", async () => {
    mockedClient.findUnique.mockResolvedValue(inactiveClient);

    await expect(
      createProject({ name: "New Project", clientId: "client-2" })
    ).rejects.toThrow(
      new ProjectDomainError(
        "CLIENT_INACTIVE",
        PROJECT_ERROR_MESSAGES.clientInactive
      )
    );

    expect(mockedProject.create).not.toHaveBeenCalled();
  });
});

describe("updateProject", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("updates a project name and client", async () => {
    mockedProject.findUnique.mockResolvedValueOnce(sampleProject);
    mockedClient.findUnique.mockResolvedValue(activeClient);
    mockedProject.findFirst.mockResolvedValue(null);
    mockedProject.update.mockResolvedValue({
      ...sampleProject,
      name: "Digital Transform 2.0",
      normalizedName: "digital transform 2.0",
    });

    const result = await updateProject("project-1", {
      name: "Digital Transform 2.0",
      clientId: "client-1",
    });

    expect(result.name).toBe("Digital Transform 2.0");
    expect(mockedProject.update).toHaveBeenCalled();
  });

  it("rejects update when project is not found", async () => {
    mockedProject.findUnique.mockResolvedValue(null);

    await expect(
      updateProject("nonexistent", { name: "New Name", clientId: "client-1" })
    ).rejects.toThrow(
      new ProjectDomainError("NOT_FOUND", PROJECT_ERROR_MESSAGES.notFound)
    );

    expect(mockedProject.update).not.toHaveBeenCalled();
  });

  it("rejects update with an empty name", async () => {
    mockedProject.findUnique.mockResolvedValue(sampleProject);

    await expect(
      updateProject("project-1", { name: "", clientId: "client-1" })
    ).rejects.toThrow(
      new ProjectDomainError("REQUIRED_NAME", PROJECT_ERROR_MESSAGES.requiredName)
    );

    expect(mockedProject.update).not.toHaveBeenCalled();
  });

  it("validates the new client is active when clientId changes", async () => {
    mockedProject.findUnique.mockResolvedValueOnce(sampleProject);
    mockedClient.findUnique.mockResolvedValue(inactiveClient);

    await expect(
      updateProject("project-1", { name: "New Name", clientId: "client-2" })
    ).rejects.toThrow(
      new ProjectDomainError(
        "CLIENT_INACTIVE",
        PROJECT_ERROR_MESSAGES.clientInactive
      )
    );

    expect(mockedProject.update).not.toHaveBeenCalled();
  });
});

describe("closeProject", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("closes an active project", async () => {
    mockedProject.findUnique.mockResolvedValue(sampleProject);
    mockedProject.update.mockResolvedValue({
      ...sampleProject,
      isActive: false,
    });

    const result = await closeProject("project-1");

    expect(result.isActive).toBe(false);
    expect(mockedProject.update).toHaveBeenCalledWith({
      where: { id: "project-1" },
      data: { isActive: false },
      include: { client: { select: { id: true, name: true } } },
    });
  });

  it("rejects closing a project that is already closed", async () => {
    mockedProject.findUnique.mockResolvedValue({
      ...sampleProject,
      isActive: false,
    });

    await expect(closeProject("project-1")).rejects.toThrow(
      new ProjectDomainError(
        "ALREADY_CLOSED",
        PROJECT_ERROR_MESSAGES.alreadyClosed
      )
    );

    expect(mockedProject.update).not.toHaveBeenCalled();
  });

  it("rejects closing a non-existent project", async () => {
    mockedProject.findUnique.mockResolvedValue(null);

    await expect(closeProject("nonexistent")).rejects.toThrow(
      new ProjectDomainError("NOT_FOUND", PROJECT_ERROR_MESSAGES.notFound)
    );

    expect(mockedProject.update).not.toHaveBeenCalled();
  });
});

describe("listProjects", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns all projects ordered by active status and name", async () => {
    const projects = [
      { ...sampleProject, isActive: true, name: "Alpha" },
      { ...sampleProject, id: "project-2", name: "Beta", isActive: true },
      { ...sampleProject, id: "project-3", name: "Gamma", isActive: false },
    ];

    mockedProject.findMany.mockResolvedValue(projects);

    const result = await listProjects();

    expect(result).toEqual(projects);
    expect(mockedProject.findMany).toHaveBeenCalledWith({
      include: { client: { select: { id: true, name: true } } },
      orderBy: [{ isActive: "desc" }, { name: "asc" }],
    });
  });
});

describe("listActiveProjects", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns only active projects", async () => {
    const activeProjects = [
      { ...sampleProject, name: "Alpha" },
      { ...sampleProject, id: "project-2", name: "Beta" },
    ];

    mockedProject.findMany.mockResolvedValue(activeProjects);

    const result = await listActiveProjects();

    expect(result).toHaveLength(2);
    expect(mockedProject.findMany).toHaveBeenCalledWith({
      where: { isActive: true },
      include: { client: { select: { id: true, name: true } } },
      orderBy: { name: "asc" },
    });
  });
});

describe("getProjectById", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns a project by id", async () => {
    mockedProject.findUnique.mockResolvedValue(sampleProject);

    const result = await getProjectById("project-1");

    expect(result).toEqual(sampleProject);
  });

  it("throws when project is not found", async () => {
    mockedProject.findUnique.mockResolvedValue(null);

    await expect(getProjectById("nonexistent")).rejects.toThrow(
      new ProjectDomainError("NOT_FOUND", PROJECT_ERROR_MESSAGES.notFound)
    );
  });
});
