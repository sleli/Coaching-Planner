"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { Project } from "@prisma/client";
import {
  createProjectAction,
  updateProjectAction,
} from "@/app/dashboard/projects/actions";
import {
  initialProjectActionState,
  type ProjectActionState,
} from "@/app/dashboard/projects/action-state";
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

type ProjectFormDialogProps = {
  mode: "create" | "edit";
  project?: Pick<Project, "id" | "name" | "clientId">;
  activeClients: { id: string; name: string }[];
};

export function ProjectFormDialog({
  mode,
  project,
  activeClients,
}: ProjectFormDialogProps) {
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
          <Button
            variant={mode === "create" ? "default" : "outline"}
            size="lg"
          />
        }
      >
        {mode === "create" ? "Nuova commessa" : "Modifica"}
      </DialogTrigger>

      <ProjectFormDialogBody
        key={`${mode}-${project?.id ?? "new"}-${formVersion}`}
        mode={mode}
        project={project}
        activeClients={activeClients}
        onCompleted={() => setOpen(false)}
      />
    </Dialog>
  );
}

type ProjectFormDialogBodyProps = ProjectFormDialogProps & {
  onCompleted: () => void;
};

function ProjectFormDialogBody({
  mode,
  project,
  activeClients,
  onCompleted,
}: ProjectFormDialogBodyProps) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const action = mode === "create" ? createProjectAction : updateProjectAction;
  const [state, formAction, pending] = useActionState<
    ProjectActionState,
    FormData
  >(action, initialProjectActionState);

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
    mode === "create"
      ? "Nuova commessa"
      : `Modifica ${project?.name ?? "commessa"}`;
  const description =
    mode === "create"
      ? "Inserisci i dati richiesti per creare una nuova commessa associata a un cliente attivo."
      : "Aggiorna i dati della commessa mantenendo l'associazione al cliente.";

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
        {project ? (
          <input type="hidden" name="projectId" value={project.id} />
        ) : null}

        <div className="space-y-5">
          <div className="space-y-2">
            <Label
              htmlFor={`${mode}-project-name`}
              className="text-sm font-semibold text-foreground"
            >
              Nome commessa
            </Label>
            <Input
              id={`${mode}-project-name`}
              name="name"
              placeholder="Es. Digital Transformation 2.0"
              defaultValue={project?.name ?? ""}
              className="h-11 rounded-xl border-border/90 bg-background"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor={`${mode}-client-id`}
              className="text-sm font-semibold text-foreground"
            >
              Cliente
            </Label>
            <select
              id={`${mode}-client-id`}
              name="clientId"
              defaultValue={project?.clientId ?? ""}
              className="flex h-11 w-full rounded-xl border border-border/90 bg-background px-3 py-2 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:border-primary"
            >
              <option value="" disabled>
                Seleziona un cliente
              </option>
              {activeClients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
          </div>

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
                ? "Salva commessa"
                : "Aggiorna commessa"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
