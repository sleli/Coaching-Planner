import type { Project } from "@prisma/client";
import { ProjectActions } from "@/components/projects/project-actions";
import { ProjectStatusBadge } from "@/components/projects/project-status-badge";

type ProjectListProps = {
  projects: (Project & {
    client: { id: string; name: string };
  })[];
  activeClients: { id: string; name: string }[];
};

function formatUpdatedAt(date: Date) {
  return new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function ProjectList({
  projects,
  activeClients,
}: ProjectListProps) {
  if (projects.length === 0) {
    return (
      <div className="rounded-[28px] border border-dashed border-border/90 bg-card px-6 py-10 text-center">
        <p className="text-lg font-semibold text-foreground">
          Nessuna commessa ancora presente.
        </p>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Inizia creando la prima commessa per organizzare il lavoro per
          incarico.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[28px] border border-border/80 bg-card shadow-[0_18px_45px_-40px_rgba(11,28,48,0.55)]">
      <div className="grid grid-cols-[minmax(0,1.2fr)_160px_140px_140px_minmax(0,0.9fr)] gap-4 border-b border-border/80 bg-muted/65 px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground max-md:hidden">
        <span>Commessa</span>
        <span>Cliente</span>
        <span>Stato</span>
        <span>Ultimo update</span>
        <span className="text-right">Azioni</span>
      </div>

      <div className="divide-y divide-border/70">
        {projects.map((project) => (
          <article
            key={project.id}
            className="grid gap-5 px-6 py-5 transition-colors hover:bg-muted/30 md:grid-cols-[minmax(0,1.2fr)_160px_140px_140px_minmax(0,0.9fr)] md:items-center"
          >
            <div>
              <p className="text-base font-semibold text-foreground">
                {project.name}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                ID {project.id.slice(0, 8).toUpperCase()}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-foreground">
                {project.client.name}
              </p>
            </div>

            <div className="md:justify-self-start">
              <ProjectStatusBadge isActive={project.isActive} />
            </div>

            <div className="text-sm text-muted-foreground">
              <p className="font-medium text-foreground md:hidden">
                Ultimo update
              </p>
              <p>{formatUpdatedAt(project.updatedAt)}</p>
            </div>

            <div className="md:justify-self-end">
              <ProjectActions
                project={project}
                activeClients={activeClients}
              />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
