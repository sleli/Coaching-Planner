import { Building2, CircleOff, UsersRound } from "lucide-react";
import { ClientFormDialog } from "@/components/clients/client-form-dialog";
import { ClientList } from "@/components/clients/client-list";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { listClients } from "@/lib/clients";

export default async function ClientsPage() {
  const clients = await listClients();
  const activeClients = clients.filter((client) => client.isActive).length;
  const inactiveClients = clients.length - activeClients;

  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-border/80 bg-card px-6 py-6 shadow-[0_18px_50px_-42px_rgba(11,28,48,0.45)] sm:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/75">
              Anagrafica clienti
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
              Crea, aggiorna e disattiva i clienti operativi.
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Questa vista segue i mockup backoffice: superfici leggere,
              gerarchia chiara e stato del cliente immediatamente leggibile per
              tenere pulita l&apos;anagrafica aziendale.
            </p>
          </div>
          <ClientFormDialog mode="create" />
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card className="border border-border/80 shadow-none">
          <CardHeader className="flex flex-row items-center justify-between gap-3 border-b border-border/60">
            <CardTitle className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Totale clienti
            </CardTitle>
            <Building2 className="size-4 text-primary" />
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-3xl font-semibold tracking-tight text-foreground">
              {clients.length}
            </p>
          </CardContent>
        </Card>

        <Card className="border border-border/80 shadow-none">
          <CardHeader className="flex flex-row items-center justify-between gap-3 border-b border-border/60">
            <CardTitle className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Attivi
            </CardTitle>
            <UsersRound className="size-4 text-primary" />
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-3xl font-semibold tracking-tight text-foreground">
              {activeClients}
            </p>
          </CardContent>
        </Card>

        <Card className="border border-border/80 shadow-none">
          <CardHeader className="flex flex-row items-center justify-between gap-3 border-b border-border/60">
            <CardTitle className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Disattivati
            </CardTitle>
            <CircleOff className="size-4 text-secondary" />
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-3xl font-semibold tracking-tight text-foreground">
              {inactiveClients}
            </p>
          </CardContent>
        </Card>
      </section>

      <ClientList clients={clients} />
    </div>
  );
}
