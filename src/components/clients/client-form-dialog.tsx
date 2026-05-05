"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { Client } from "@prisma/client";
import {
  createClientAction,
  updateClientAction,
} from "@/app/dashboard/clients/actions";
import {
  initialClientActionState,
  type ClientActionState,
} from "@/app/dashboard/clients/action-state";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ClientFormDialogProps = {
  mode: "create" | "edit";
  client?: Pick<Client, "id" | "name" | "isActive">;
};

export function ClientFormDialog({
  mode,
  client,
}: ClientFormDialogProps) {
  const [open, setOpen] = useState(false);
  const [formVersion, setFormVersion] = useState(0);

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);

    if (nextOpen) {
      setFormVersion((currentVersion) => currentVersion + 1);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button variant={mode === "create" ? "default" : "outline"} size="lg" />
        }
      >
        {mode === "create" ? "Aggiungi cliente" : "Modifica"}
      </DialogTrigger>

      <ClientFormDialogBody
        key={`${mode}-${client?.id ?? "new"}-${formVersion}`}
        mode={mode}
        client={client}
        onCompleted={() => setOpen(false)}
      />
    </Dialog>
  );
}

type ClientFormDialogBodyProps = ClientFormDialogProps & {
  onCompleted: () => void;
};

function ClientFormDialogBody({
  mode,
  client,
  onCompleted,
}: ClientFormDialogBodyProps) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const action = mode === "create" ? createClientAction : updateClientAction;
  const [state, formAction, pending] = useActionState<ClientActionState, FormData>(
    action,
    initialClientActionState
  );

  useEffect(() => {
    if (state.status !== "success") {
      return;
    }

    router.refresh();
    onCompleted();

    if (mode === "create") {
      formRef.current?.reset();
    }
  }, [mode, onCompleted, router, state.status]);

  const title =
    mode === "create" ? "Nuovo cliente" : `Modifica ${client?.name ?? "cliente"}`;
  const description =
    mode === "create"
      ? "Inserisci i dati minimi richiesti per aggiungere il cliente all'anagrafica."
      : "Aggiorna i dati anagrafici del cliente mantenendo lo stato coerente con l'operativita.";

  return (
    <DialogContent className="max-w-md rounded-[24px] border border-border/80 bg-card p-0 shadow-[0_24px_80px_-40px_rgba(11,28,48,0.45)]">
      <DialogHeader className="px-6 pt-6">
        <DialogTitle className="text-xl font-semibold text-foreground">
          {title}
        </DialogTitle>
        <DialogDescription className="text-sm leading-6 text-muted-foreground">
          {description}
        </DialogDescription>
      </DialogHeader>

      <form ref={formRef} action={formAction} className="px-6 pb-6">
        {client ? <input type="hidden" name="clientId" value={client.id} /> : null}

        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor={`${mode}-name`} className="text-sm font-semibold text-foreground">
              Nome cliente
            </Label>
            <Input
              id={`${mode}-name`}
              name="name"
              placeholder="Es. Global Consulting Group"
              defaultValue={client?.name ?? ""}
              className="h-11 rounded-xl border-border/90 bg-background"
            />
          </div>

          <label className="flex items-start gap-3 rounded-2xl border border-border/80 bg-muted/40 px-4 py-4">
            <input
              type="checkbox"
              name="isActive"
              defaultChecked={client?.isActive ?? true}
              className="mt-1 size-4 rounded border-border text-primary accent-[var(--primary)]"
            />
            <span className="space-y-1">
              <span className="block text-sm font-semibold text-foreground">
                Cliente attivo
              </span>
              <span className="block text-sm leading-6 text-muted-foreground">
                Se disattivato non comparira nei futuri flussi operativi.
              </span>
            </span>
          </label>

          {state.message ? (
            <p
              className={
                state.status === "error"
                  ? "text-sm font-medium text-destructive"
                  : "text-sm font-medium text-primary"
              }
            >
              {state.message}
            </p>
          ) : null}
        </div>

        <DialogFooter className="mt-6 rounded-b-[24px] border-t border-border/80 bg-muted/30 px-6 py-4">
          <Button type="submit" size="lg" disabled={pending}>
            {pending
              ? "Salvataggio..."
              : mode === "create"
                ? "Salva cliente"
                : "Aggiorna cliente"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
