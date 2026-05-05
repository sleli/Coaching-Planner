import Link from "next/link";
import {
  ArrowRight,
  Building2,
  FolderKanban,
  ShieldCheck,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export default async function Dashboard() {
  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-border/80 bg-card px-6 py-6 shadow-[0_20px_60px_-50px_rgba(11,28,48,0.35)] sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/75">
          Dashboard
        </p>
        <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground">
              Gestione anagrafiche pronta per il backoffice.
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              La nuova shell riprende il linguaggio dei mockup e prepara il
              prodotto a ospitare clienti, collaboratori e commesse con una
              navigazione coerente.
            </p>
          </div>
          <Link
            href="/dashboard/clients"
            className={cn(buttonVariants({ variant: "default" }))}
          >
            Vai ai clienti
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card className="border border-border/80 shadow-none">
          <CardHeader>
            <CardDescription className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/75">
              Anagrafiche
            </CardDescription>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Building2 className="size-5 text-primary" />
              Clienti
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              Crea, aggiorna e disattiva l&apos;anagrafica clienti mantenendo
              puliti i flussi operativi successivi.
            </p>
            <Link
              href="/dashboard/clients"
              className="inline-flex items-center gap-2 font-medium text-primary"
            >
              Apri la sezione clienti
              <ArrowRight className="size-4" />
            </Link>
          </CardContent>
        </Card>

        <Card className="border border-border/80 shadow-none">
          <CardHeader>
            <CardDescription className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/75">
              Sicurezza
            </CardDescription>
            <CardTitle className="flex items-center gap-2 text-xl">
              <ShieldCheck className="size-5 text-primary" />
              Accesso protetto
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-7 text-muted-foreground">
            La route resta protetta dal middleware Supabase esistente e tutte le
            mutazioni clienti passano da Server Actions autenticate.
          </CardContent>
        </Card>

        <Card className="border border-border/80 shadow-none">
          <CardHeader>
            <CardDescription className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/75">
              Prossimi moduli
            </CardDescription>
            <CardTitle className="flex items-center gap-2 text-xl">
              <FolderKanban className="size-5 text-primary" />
              Flussi operativi
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-7 text-muted-foreground">
            L&apos;elenco dei soli clienti attivi e gia pronto per essere
            riusato nelle prossime story su commesse e selettori.
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
