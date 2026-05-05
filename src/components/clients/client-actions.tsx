"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Client } from "@prisma/client";
import { deactivateClientAction } from "@/app/dashboard/clients/actions";
import {
  initialClientActionState,
  type ClientActionState,
} from "@/app/dashboard/clients/action-state";
import { ClientFormDialog } from "@/components/clients/client-form-dialog";
import { Button } from "@/components/ui/button";

type ClientActionsProps = {
  client: Pick<Client, "id" | "name" | "isActive">;
};

export function ClientActions({ client }: ClientActionsProps) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState<ClientActionState, FormData>(
    deactivateClientAction,
    initialClientActionState
  );

  useEffect(() => {
    if (state.status === "success") {
      router.refresh();
    }
  }, [router, state.status]);

  return (
    <div className="flex flex-col items-end gap-2">
      <div className="flex items-center gap-2">
        <ClientFormDialog mode="edit" client={client} />
        <form
          action={formAction}
          onSubmit={(event) => {
            if (
              !window.confirm(
                `Disattivare ${client.name}? Non sara piu selezionabile nei nuovi flussi operativi.`
              )
            ) {
              event.preventDefault();
            }
          }}
        >
          <input type="hidden" name="clientId" value={client.id} />
          <Button
            type="submit"
            variant="outline"
            size="lg"
            disabled={!client.isActive || pending}
            className="border-secondary/35 text-[#7b4c00] hover:bg-secondary/15"
          >
            {pending ? "Disattivazione..." : "Disattiva"}
          </Button>
        </form>
      </div>

      {state.status === "error" ? (
        <p className="text-right text-xs font-medium text-destructive">
          {state.message}
        </p>
      ) : null}
    </div>
  );
}
