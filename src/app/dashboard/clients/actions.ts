"use server";

import { revalidatePath } from "next/cache";
import {
  ClientDomainError,
  createClient,
  deactivateClient,
  updateClient,
} from "@/lib/clients";
import { getCurrentUser } from "@/lib/user";
import type { ClientActionState } from "./action-state";

async function ensureAuthenticated() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }
}

function getCheckboxValue(value: FormDataEntryValue | null) {
  return value === "on" || value === "true";
}

function handleClientError(error: unknown): ClientActionState {
  if (error instanceof ClientDomainError) {
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
    message: "Si e verificato un errore inatteso. Riprova.",
  };
}

export async function createClientAction(
  _prevState: ClientActionState,
  formData: FormData
): Promise<ClientActionState> {
  try {
    await ensureAuthenticated();

    await createClient({
      name: String(formData.get("name") ?? ""),
      isActive: getCheckboxValue(formData.get("isActive")),
    });

    revalidatePath("/dashboard/clients");

    return {
      status: "success",
      message: "Cliente creato correttamente.",
    };
  } catch (error) {
    return handleClientError(error);
  }
}

export async function updateClientAction(
  _prevState: ClientActionState,
  formData: FormData
): Promise<ClientActionState> {
  const clientId = String(formData.get("clientId") ?? "");

  if (!clientId) {
    return {
      status: "error",
      message: "Cliente non trovato.",
      fields: { clientId: "missing" },
    };
  }

  try {
    await ensureAuthenticated();

    await updateClient(clientId, {
      name: String(formData.get("name") ?? ""),
      isActive: getCheckboxValue(formData.get("isActive")),
    });

    revalidatePath("/dashboard/clients");

    return {
      status: "success",
      message: "Cliente aggiornato correttamente.",
    };
  } catch (error) {
    return handleClientError(error);
  }
}

export async function deactivateClientAction(
  _prevState: ClientActionState,
  formData: FormData
): Promise<ClientActionState> {
  const clientId = String(formData.get("clientId") ?? "");

  if (!clientId) {
    return {
      status: "error",
      message: "Cliente non trovato.",
      fields: { clientId: "missing" },
    };
  }

  try {
    await ensureAuthenticated();

    await deactivateClient(clientId);

    revalidatePath("/dashboard/clients");

    return {
      status: "success",
      message: "Cliente disattivato correttamente.",
    };
  } catch (error) {
    return handleClientError(error);
  }
}
