"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Project } from "@prisma/client";
import { closeProjectAction } from "@/app/dashboard/projects/actions";
import {
  initialProjectActionState,
  type ProjectActionState,
} from "@/app/dashboard/projects/action-state";
import { ProjectFormDialog } from "@/components/projects/project-form-dialog";
import { Button } from "@/components/ui/button";

type ProjectActionsProps = {
  project: Pick<Project, "id" | "name" | "isActive" | "clientId">;
  activeClients: { id: string; name: string }[];
};

export function ProjectActions({ project, activeClients }: ProjectActionsProps) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState<
    ProjectActionState,
    FormData
  >(closeProjectAction, initialProjectActionState);

  useEffect(() => {
    if (state.status === "success") {
      router.refresh();
    }
  }, [router, state.status]);

  return (
    <div className="flex flex-col items-end gap-2">
      <div className="flex items-center gap-2">
        <ProjectFormDialog
          mode="edit"
          project={project}
          activeClients={activeClients}
        />
        {project.isActive ? (
          <form
            action={formAction}
            onSubmit={(event) => {
              if (
                !window.confirm(
                  `Chiudere la commessa "${project.name}"? Non sarà più disponibile per nuovi inserimenti.`
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <input type="hidden" name="projectId" value={project.id} />
            <Button
              type="submit"
              variant="outline"
              size="lg"
              disabled={pending}
              className="border-secondary/35 text-[#7b4c00] hover:bg-secondary/15"
            >
              {pending ? "Chiusura..." : "Chiudi"}
            </Button>
          </form>
        ) : null}
      </div>

      {state.status === "error" ? (
        <p className="text-right text-xs font-medium text-destructive">
          {state.message}
        </p>
      ) : null}
    </div>
  );
}
