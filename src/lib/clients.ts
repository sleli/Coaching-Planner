import "server-only";

import { Prisma, type Client } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const CLIENT_ERROR_MESSAGES = {
  requiredName: "Inserisci il nome del cliente.",
  duplicateName: "Esiste gia un cliente con questo nome.",
  notFound: "Cliente non trovato.",
  alreadyInactive: "Il cliente e gia disattivato.",
} as const;

type ClientErrorCode =
  | "REQUIRED_NAME"
  | "DUPLICATE_NAME"
  | "NOT_FOUND"
  | "ALREADY_INACTIVE";

export class ClientDomainError extends Error {
  constructor(
    public readonly code: ClientErrorCode,
    message: string
  ) {
    super(message);
    this.name = "ClientDomainError";
  }
}

export type UpsertClientInput = {
  name: string;
  isActive: boolean;
};

export function normalizeClientName(name: string) {
  return name.trim().replace(/\s+/g, " ");
}

function getNormalizedLookupName(name: string) {
  return normalizeClientName(name).toLocaleLowerCase("it-IT");
}

function mapPrismaError(error: unknown) {
  if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2002"
  ) {
    throw new ClientDomainError(
      "DUPLICATE_NAME",
      CLIENT_ERROR_MESSAGES.duplicateName
    );
  }

  throw error;
}

async function ensureUniqueClientName(normalizedName: string, excludeId?: string) {
  const duplicate = await prisma.client.findFirst({
    where: {
      id: excludeId ? { not: excludeId } : undefined,
      normalizedName,
    },
    select: { id: true },
  });

  if (duplicate) {
    throw new ClientDomainError(
      "DUPLICATE_NAME",
      CLIENT_ERROR_MESSAGES.duplicateName
    );
  }
}

function validateClientName(name: string) {
  const normalizedName = normalizeClientName(name);

  if (!normalizedName) {
    throw new ClientDomainError(
      "REQUIRED_NAME",
      CLIENT_ERROR_MESSAGES.requiredName
    );
  }

  return normalizedName;
}

export async function listClients() {
  return prisma.client.findMany({
    orderBy: [{ isActive: "desc" }, { name: "asc" }],
  });
}

export async function listActiveClients() {
  return prisma.client.findMany({
    where: { isActive: true },
    orderBy: { name: "asc" },
  });
}

export async function createClient(input: UpsertClientInput) {
  const normalizedName = validateClientName(input.name);
  const normalizedLookupName = getNormalizedLookupName(normalizedName);

  await ensureUniqueClientName(normalizedLookupName);

  try {
    return await prisma.client.create({
      data: {
        name: normalizedName,
        normalizedName: normalizedLookupName,
        isActive: input.isActive,
      },
    });
  } catch (error) {
    mapPrismaError(error);
  }
}

export async function updateClient(clientId: string, input: UpsertClientInput) {
  const normalizedName = validateClientName(input.name);
  const normalizedLookupName = getNormalizedLookupName(normalizedName);

  const existingClient = await prisma.client.findUnique({
    where: { id: clientId },
    select: { id: true },
  });

  if (!existingClient) {
    throw new ClientDomainError("NOT_FOUND", CLIENT_ERROR_MESSAGES.notFound);
  }

  await ensureUniqueClientName(normalizedLookupName, clientId);

  try {
    return await prisma.client.update({
      where: { id: clientId },
      data: {
        name: normalizedName,
        normalizedName: normalizedLookupName,
        isActive: input.isActive,
      },
    });
  } catch (error) {
    mapPrismaError(error);
  }
}

export async function deactivateClient(clientId: string): Promise<Client> {
  const existingClient = await prisma.client.findUnique({
    where: { id: clientId },
  });

  if (!existingClient) {
    throw new ClientDomainError("NOT_FOUND", CLIENT_ERROR_MESSAGES.notFound);
  }

  if (!existingClient.isActive) {
    throw new ClientDomainError(
      "ALREADY_INACTIVE",
      CLIENT_ERROR_MESSAGES.alreadyInactive
    );
  }

  return prisma.client.update({
    where: { id: clientId },
    data: { isActive: false },
  });
}
