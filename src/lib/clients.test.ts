import {
  CLIENT_ERROR_MESSAGES,
  ClientDomainError,
  createClient,
  deactivateClient,
  listActiveClients,
  updateClient,
} from "@/lib/clients";
import { prisma } from "@/lib/prisma";

vi.mock("@/lib/prisma", () => ({
  prisma: {
    client: {
      create: vi.fn(),
      findFirst: vi.fn(),
      findMany: vi.fn(),
      findUnique: vi.fn(),
      update: vi.fn(),
    },
  },
}));

const prismaClient = prisma.client as {
  create: ReturnType<typeof vi.fn>;
  findFirst: ReturnType<typeof vi.fn>;
  findMany: ReturnType<typeof vi.fn>;
  findUnique: ReturnType<typeof vi.fn>;
  update: ReturnType<typeof vi.fn>;
};

describe("clients domain", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("rejects a missing client name", async () => {
    await expect(
      createClient({
        name: "   ",
        isActive: true,
      })
    ).rejects.toMatchObject({
      code: "REQUIRED_NAME",
      message: CLIENT_ERROR_MESSAGES.requiredName,
    } satisfies Partial<ClientDomainError>);

    expect(prismaClient.findFirst).not.toHaveBeenCalled();
    expect(prismaClient.create).not.toHaveBeenCalled();
  });

  it("rejects duplicate names case-insensitively", async () => {
    prismaClient.findFirst.mockResolvedValue({ id: "existing-client" });

    await expect(
      createClient({
        name: "Acme",
        isActive: true,
      })
    ).rejects.toMatchObject({
      code: "DUPLICATE_NAME",
      message: CLIENT_ERROR_MESSAGES.duplicateName,
    } satisfies Partial<ClientDomainError>);

    expect(prismaClient.findFirst).toHaveBeenCalledWith({
      where: {
        id: undefined,
        normalizedName: "acme",
      },
      select: { id: true },
    });
    expect(prismaClient.create).not.toHaveBeenCalled();
  });

  it("returns only active clients for future operational flows", async () => {
    const activeClients = [
      { id: "1", name: "Acme", isActive: true },
      { id: "2", name: "Beta", isActive: true },
    ];
    prismaClient.findMany.mockResolvedValue(activeClients);

    await expect(listActiveClients()).resolves.toEqual(activeClients);

    expect(prismaClient.findMany).toHaveBeenCalledWith({
      where: { isActive: true },
      orderBy: { name: "asc" },
    });
  });

  it("deactivates an active client", async () => {
    prismaClient.findUnique.mockResolvedValue({
      id: "client-1",
      name: "Acme",
      isActive: true,
    });
    prismaClient.update.mockResolvedValue({
      id: "client-1",
      name: "Acme",
      isActive: false,
    });

    await expect(deactivateClient("client-1")).resolves.toEqual({
      id: "client-1",
      name: "Acme",
      isActive: false,
    });

    expect(prismaClient.update).toHaveBeenCalledWith({
      where: { id: "client-1" },
      data: { isActive: false },
    });
  });

  it("updates an existing client without creating duplicates", async () => {
    prismaClient.findUnique.mockResolvedValueOnce({ id: "client-1" });
    prismaClient.findFirst.mockResolvedValueOnce(null);
    prismaClient.update.mockResolvedValueOnce({
      id: "client-1",
      name: "Acme Italia",
      isActive: true,
    });

    await expect(
      updateClient("client-1", {
        name: "  Acme   Italia  ",
        isActive: true,
      })
    ).resolves.toEqual({
      id: "client-1",
      name: "Acme Italia",
      isActive: true,
    });

    expect(prismaClient.findUnique).toHaveBeenCalledWith({
      where: { id: "client-1" },
      select: { id: true },
    });
    expect(prismaClient.findFirst).toHaveBeenCalledWith({
      where: {
        id: { not: "client-1" },
        normalizedName: "acme italia",
      },
      select: { id: true },
    });
    expect(prismaClient.update).toHaveBeenCalledWith({
      where: { id: "client-1" },
      data: {
        name: "Acme Italia",
        normalizedName: "acme italia",
        isActive: true,
      },
    });
  });

  it("rejects deactivation when the client is already inactive", async () => {
    prismaClient.findUnique.mockResolvedValue({
      id: "client-1",
      name: "Acme",
      isActive: false,
    });

    await expect(deactivateClient("client-1")).rejects.toMatchObject({
      code: "ALREADY_INACTIVE",
      message: CLIENT_ERROR_MESSAGES.alreadyInactive,
    } satisfies Partial<ClientDomainError>);

    expect(prismaClient.update).not.toHaveBeenCalled();
  });
});
