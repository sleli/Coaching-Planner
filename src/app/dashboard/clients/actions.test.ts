import {
  ClientDomainError,
  CLIENT_ERROR_MESSAGES,
} from "@/lib/clients";
import {
  createClientAction,
  deactivateClientAction,
  updateClientAction,
} from "@/app/dashboard/clients/actions";
import { initialClientActionState } from "@/app/dashboard/clients/action-state";
import { revalidatePath } from "next/cache";
import { createClient, deactivateClient, updateClient } from "@/lib/clients";
import { getCurrentUser } from "@/lib/user";

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

vi.mock("@/lib/user", () => ({
  getCurrentUser: vi.fn(),
}));

vi.mock("@/lib/clients", async () => {
  const actual = await vi.importActual<typeof import("@/lib/clients")>(
    "@/lib/clients"
  );

  return {
    ...actual,
    createClient: vi.fn(),
    deactivateClient: vi.fn(),
    updateClient: vi.fn(),
  };
});

const mockedCreateClient = vi.mocked(createClient);
const mockedDeactivateClient = vi.mocked(deactivateClient);
const mockedUpdateClient = vi.mocked(updateClient);
const mockedGetCurrentUser = vi.mocked(getCurrentUser);
const mockedRevalidatePath = vi.mocked(revalidatePath);

describe("client actions", () => {
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

  it("creates a client from form data and revalidates the clients page", async () => {
    mockedCreateClient.mockResolvedValue({
      id: "client-1",
      name: "Acme",
      isActive: true,
      createdAt: new Date("2026-05-05T08:00:00.000Z"),
      updatedAt: new Date("2026-05-05T08:00:00.000Z"),
    });

    const formData = new FormData();
    formData.set("name", "Acme");
    formData.set("isActive", "on");

    await expect(
      createClientAction(initialClientActionState, formData)
    ).resolves.toEqual({
      status: "success",
      message: "Cliente creato correttamente.",
    });

    expect(mockedCreateClient).toHaveBeenCalledWith({
      name: "Acme",
      isActive: true,
    });
    expect(mockedRevalidatePath).toHaveBeenCalledWith("/dashboard/clients");
  });

  it("returns a stable error state when the domain rejects a duplicate name", async () => {
    mockedCreateClient.mockRejectedValue(
      new ClientDomainError(
        "DUPLICATE_NAME",
        CLIENT_ERROR_MESSAGES.duplicateName
      )
    );

    const formData = new FormData();
    formData.set("name", "acme");
    formData.set("isActive", "true");

    await expect(
      createClientAction(initialClientActionState, formData)
    ).resolves.toEqual({
      status: "error",
      message: CLIENT_ERROR_MESSAGES.duplicateName,
    });

    expect(mockedRevalidatePath).not.toHaveBeenCalled();
  });

  it("returns an error immediately when deactivate is missing the client id", async () => {
    const formData = new FormData();

    await expect(
      deactivateClientAction(initialClientActionState, formData)
    ).resolves.toEqual({
      status: "error",
      message: "Cliente non trovato.",
      fields: { clientId: "missing" },
    });

    expect(mockedDeactivateClient).not.toHaveBeenCalled();
    expect(mockedRevalidatePath).not.toHaveBeenCalled();
  });

  it("updates a client from form data and revalidates the clients page", async () => {
    mockedUpdateClient.mockResolvedValue({
      id: "client-1",
      name: "Acme Italia",
      isActive: false,
      createdAt: new Date("2026-05-05T08:00:00.000Z"),
      updatedAt: new Date("2026-05-05T09:00:00.000Z"),
    });

    const formData = new FormData();
    formData.set("clientId", "client-1");
    formData.set("name", "Acme Italia");

    await expect(
      updateClientAction(initialClientActionState, formData)
    ).resolves.toEqual({
      status: "success",
      message: "Cliente aggiornato correttamente.",
    });

    expect(mockedUpdateClient).toHaveBeenCalledWith("client-1", {
      name: "Acme Italia",
      isActive: false,
    });
    expect(mockedRevalidatePath).toHaveBeenCalledWith("/dashboard/clients");
  });

  it("returns a stable error state when the user is not authenticated", async () => {
    mockedGetCurrentUser.mockResolvedValue(null);

    const formData = new FormData();
    formData.set("name", "Acme");
    formData.set("isActive", "on");

    await expect(
      createClientAction(initialClientActionState, formData)
    ).resolves.toEqual({
      status: "error",
      message: "Sessione scaduta. Accedi di nuovo.",
    });

    expect(mockedCreateClient).not.toHaveBeenCalled();
    expect(mockedRevalidatePath).not.toHaveBeenCalled();
  });
});
