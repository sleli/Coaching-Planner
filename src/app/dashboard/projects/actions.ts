"use server";

import { revalidatePath } from "next/cache";
import {
  ProjectDomainError,
  createProject,
  updateProject,
  closeProject,
} from "@/lib/projects";
import { getCurrentUser } from "@/lib/user";
import type { ProjectActionState } from "./action-state";

async function ensureAuthenticated() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }
}

function handleProjectError(error: unknown): ProjectActionState {
  if (error instanceof ProjectDomainError) {
    return {
      status: "error",
      message: error.message,
    };
  }

  if (error instanceof Error && error.message === "Unauthorized") {
    return {
      status: "error",
      message: "Sessione scaduta. Accedi di nuovo.",
    };
  }

  return {
    status: "error",
    message: "Si è verificato un errore inatteso. Riprova.",
  };
}

export async function createProjectAction(
  _prevState: ProjectActionState,
  formData: FormData
): Promise<ProjectActionState> {
  try {
    await ensureAuthenticated();

    await createProject({
      name: String(formData.get("name") ?? ""),
      clientId: String(formData.get("clientId") ?? ""),
    });

    revalidatePath("/dashboard/projects");

    return {
      status: "success",
      message: "Commessa creata correttamente.",
    };
  } catch (error) {
    return handleProjectError(error);
  }
}

export async function updateProjectAction(
  _prevState: ProjectActionState,
  formData: FormData
): Promise<ProjectActionState> {
  const projectId = String(formData.get("projectId") ?? "");

  if (!projectId) {
    return {
      status: "error",
      message: "Commessa non trovata.",
      fields: { projectId: "missing" },
    };
  }

  try {
    await ensureAuthenticated();

    await updateProject(projectId, {
      name: String(formData.get("name") ?? ""),
      clientId: String(formData.get("clientId") ?? ""),
    });

    revalidatePath("/dashboard/projects");

    return {
      status: "success",
      message: "Commessa aggiornata correttamente.",
    };
  } catch (error) {
    return handleProjectError(error);
  }
}

export async function closeProjectAction(
  _prevState: ProjectActionState,
  formData: FormData
): Promise<ProjectActionState> {
  const projectId = String(formData.get("projectId") ?? "");

  if (!projectId) {
    return {
      status: "error",
      message: "Commessa non trovata.",
      fields: { projectId: "missing" },
    };
  }

  try {
    await ensureAuthenticated();

    await closeProject(projectId);

    revalidatePath("/dashboard/projects");

    return {
      status: "success",
      message: "Commessa chiusa correttamente.",
    };
  } catch (error) {
    return handleProjectError(error);
  }
}
