import "server-only";

import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const PROJECT_ERROR_MESSAGES = {
  requiredName: "Inserisci il nome della commessa.",
  duplicateName: "Esiste già una commessa con questo nome per lo stesso cliente.",
  notFound: "Commessa non trovata.",
  alreadyClosed: "La commessa è già chiusa.",
  clientNotFound: "Cliente non trovato.",
  clientInactive: "Il cliente non è attivo. Impossibile creare la commessa.",
} as const;

type ProjectErrorCode =
  | "REQUIRED_NAME"
  | "DUPLICATE_NAME"
  | "NOT_FOUND"
  | "ALREADY_CLOSED"
  | "CLIENT_NOT_FOUND"
  | "CLIENT_INACTIVE";

export class ProjectDomainError extends Error {
  constructor(
    public readonly code: ProjectErrorCode,
    message: string
  ) {
    super(message);
    this.name = "ProjectDomainError";
  }
}

export type UpsertProjectInput = {
  name: string;
  clientId: string;
};

export function normalizeProjectName(name: string) {
  return name.trim().replace(/\s+/g, " ");
}

function getNormalizedLookupName(name: string) {
  return normalizeProjectName(name).toLocaleLowerCase("it-IT");
}

function mapPrismaError(error: unknown) {
  if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2002"
  ) {
    throw new ProjectDomainError(
      "DUPLICATE_NAME",
      PROJECT_ERROR_MESSAGES.duplicateName
    );
  }

  throw error;
}

async function ensureUniqueProjectName(
  normalizedName: string,
  clientId: string,
  excludeId?: string
) {
  const duplicate = await prisma.project.findFirst({
    where: {
      id: excludeId ? { not: excludeId } : undefined,
      normalizedName,
      clientId,
    },
    select: { id: true },
  });

  if (duplicate) {
    throw new ProjectDomainError(
      "DUPLICATE_NAME",
      PROJECT_ERROR_MESSAGES.duplicateName
    );
  }
}

function validateProjectName(name: string) {
  const normalizedName = normalizeProjectName(name);

  if (!normalizedName) {
    throw new ProjectDomainError(
      "REQUIRED_NAME",
      PROJECT_ERROR_MESSAGES.requiredName
    );
  }

  return normalizedName;
}

async function validateActiveClient(clientId: string) {
  const client = await prisma.client.findUnique({
    where: { id: clientId },
    select: { id: true, isActive: true },
  });

  if (!client) {
    throw new ProjectDomainError(
      "CLIENT_NOT_FOUND",
      PROJECT_ERROR_MESSAGES.clientNotFound
    );
  }

  if (!client.isActive) {
    throw new ProjectDomainError(
      "CLIENT_INACTIVE",
      PROJECT_ERROR_MESSAGES.clientInactive
    );
  }
}

export async function listProjects() {
  return prisma.project.findMany({
    include: { client: { select: { id: true, name: true } } },
    orderBy: [{ isActive: "desc" }, { name: "asc" }],
  });
}

export async function listActiveProjects() {
  return prisma.project.findMany({
    where: { isActive: true },
    include: { client: { select: { id: true, name: true } } },
    orderBy: { name: "asc" },
  });
}

export async function getProjectById(id: string) {
  const project = await prisma.project.findUnique({
    where: { id },
    include: { client: { select: { id: true, name: true } } },
  });

  if (!project) {
    throw new ProjectDomainError("NOT_FOUND", PROJECT_ERROR_MESSAGES.notFound);
  }

  return project;
}

export async function createProject(input: UpsertProjectInput) {
  const normalizedName = validateProjectName(input.name);
  const normalizedLookupName = getNormalizedLookupName(normalizedName);

  await validateActiveClient(input.clientId);
  await ensureUniqueProjectName(normalizedLookupName, input.clientId);

  try {
    return await prisma.project.create({
      data: {
        name: normalizedName,
        normalizedName: normalizedLookupName,
        clientId: input.clientId,
      },
      include: { client: { select: { id: true, name: true } } },
    });
  } catch (error) {
    mapPrismaError(error);
  }
}

export async function updateProject(
  projectId: string,
  input: UpsertProjectInput
) {
  const normalizedName = validateProjectName(input.name);
  const normalizedLookupName = getNormalizedLookupName(normalizedName);

  const existingProject = await prisma.project.findUnique({
    where: { id: projectId },
    select: { id: true, clientId: true },
  });

  if (!existingProject) {
    throw new ProjectDomainError("NOT_FOUND", PROJECT_ERROR_MESSAGES.notFound);
  }

  const targetClientId = input.clientId ?? existingProject.clientId;

  if (input.clientId && input.clientId !== existingProject.clientId) {
    await validateActiveClient(targetClientId);
  }

  await ensureUniqueProjectName(normalizedLookupName, targetClientId, projectId);

  try {
    return await prisma.project.update({
      where: { id: projectId },
      data: {
        name: normalizedName,
        normalizedName: normalizedLookupName,
        clientId: targetClientId,
      },
      include: { client: { select: { id: true, name: true } } },
    });
  } catch (error) {
    mapPrismaError(error);
  }
}

export async function closeProject(projectId: string) {
  const existingProject = await prisma.project.findUnique({
    where: { id: projectId },
    select: { id: true, isActive: true },
  });

  if (!existingProject) {
    throw new ProjectDomainError("NOT_FOUND", PROJECT_ERROR_MESSAGES.notFound);
  }

  if (!existingProject.isActive) {
    throw new ProjectDomainError(
      "ALREADY_CLOSED",
      PROJECT_ERROR_MESSAGES.alreadyClosed
    );
  }

  return prisma.project.update({
    where: { id: projectId },
    data: { isActive: false },
    include: { client: { select: { id: true, name: true } } },
  });
}
