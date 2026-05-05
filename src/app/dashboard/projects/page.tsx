import { Briefcase, CircleCheckBig, FolderKanban, ListTodo } from "lucide-react";
import { ProjectFormDialog } from "@/components/projects/project-form-dialog";
import { ProjectList } from "@/components/projects/project-list";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { listActiveClients } from "@/lib/clients";
import { listProjects } from "@/lib/projects";

export default async function ProjectsPage() {
  const [projects, activeClients] = await Promise.all([
    listProjects(),
    listActiveClients(),
  ]);

  const activeCount = projects.filter((p) => p.isActive).length;
  const closedCount = projects.length - activeCount;

  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-border/80 bg-card px-6 py-6 shadow-[0_18px_50px_-42px_rgba(11,28,48,0.45)] sm:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/75">
              Gestione commesse
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
              Crea, aggiorna e chiudi le commesse operative.
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Ogni commessa è associata a un cliente attivo. Una volta conclusa,
              chiudi la commessa per mantenerla separata da quelle ancora
              operative.
            </p>
          </div>
          <ProjectFormDialog mode="create" activeClients={activeClients} />
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        <Card className="border border-border/80 shadow-none">
          <CardHeader className="flex flex-row items-center justify-between gap-3 border-b border-border/60">
            <CardTitle className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Totale commesse
            </CardTitle>
            <FolderKanban className="size-4 text-primary" />
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-3xl font-semibold tracking-tight text-foreground">
              {projects.length}
            </p>
          </CardContent>
        </Card>

        <Card className="border border-border/80 shadow-none">
          <CardHeader className="flex flex-row items-center justify-between gap-3 border-b border-border/60">
            <CardTitle className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Attive
            </CardTitle>
            <ListTodo className="size-4 text-primary" />
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-3xl font-semibold tracking-tight text-foreground">
              {activeCount}
            </p>
          </CardContent>
        </Card>

        <Card className="border border-border/80 shadow-none">
          <CardHeader className="flex flex-row items-center justify-between gap-3 border-b border-border/60">
            <CardTitle className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Chiuse
            </CardTitle>
            <CircleCheckBig className="size-4 text-secondary" />
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-3xl font-semibold tracking-tight text-foreground">
              {closedCount}
            </p>
          </CardContent>
        </Card>

        <Card className="border border-border/80 shadow-none">
          <CardHeader className="flex flex-row items-center justify-between gap-3 border-b border-border/60">
            <CardTitle className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Clienti coinvolti
            </CardTitle>
            <Briefcase className="size-4 text-primary" />
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-3xl font-semibold tracking-tight text-foreground">
              {new Set(projects.map((p) => p.client?.id)).size}
            </p>
          </CardContent>
        </Card>
      </section>

      <ProjectList projects={projects} activeClients={activeClients} />
    </div>
  );
}
