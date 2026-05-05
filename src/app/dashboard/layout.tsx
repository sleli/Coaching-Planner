import { redirect } from "next/navigation";
import { LogOut, ShieldCheck } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DashboardNavLink } from "@/components/dashboard/dashboard-nav-link";
import { getCurrentUser } from "@/lib/user";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: "dashboard" as const },
  { href: "/dashboard/clients", label: "Clienti", icon: "clients" as const },
];

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/signin");
  }

  const displayName = user.name ?? user.email ?? "Utente";
  const email = user.email ?? "";
  const initials = displayName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-transparent text-foreground">
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <aside className="hidden w-[272px] shrink-0 border-r border-border/80 bg-sidebar/95 px-4 py-6 backdrop-blur md:flex md:flex-col">
          <div className="px-3 pb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/75">
              Backoffice
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-primary">
              Coaching Planner
            </h1>
            <p className="mt-2 max-w-[18rem] text-sm leading-6 text-muted-foreground">
              Hub operativo per mantenere anagrafiche e flussi interni sempre
              ordinati.
            </p>
          </div>

          <nav className="flex flex-1 flex-col gap-2">
            {navItems.map((item) => (
              <DashboardNavLink key={item.href} {...item} />
            ))}
          </nav>

          <div className="mt-6 rounded-2xl border border-border/80 bg-card px-4 py-4">
            <div className="flex items-center gap-3">
              <Avatar size="lg">
                <AvatarImage src={user.image ?? ""} alt={displayName} />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">
                  {displayName}
                </p>
                <p className="truncate text-xs text-muted-foreground">{email}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between rounded-xl bg-muted/70 px-3 py-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="size-3.5 text-primary" />
                Accesso protetto
              </span>
              <form action="/auth/signout" method="post">
                <button
                  type="submit"
                  className="inline-flex items-center gap-1 font-medium text-primary"
                >
                  <LogOut className="size-3.5" />
                  Esci
                </button>
              </form>
            </div>
          </div>
        </aside>

        <div className="flex min-h-screen flex-1 flex-col">
          <header className="sticky top-0 z-20 border-b border-border/80 bg-background/90 px-5 py-4 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/75">
                    Partner Portal
                  </p>
                  <p className="text-lg font-semibold tracking-tight text-primary">
                    Backoffice operativo
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Avatar size="sm">
                  <AvatarImage src={user.image ?? ""} alt={displayName} />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <div className="hidden text-right sm:block">
                  <p className="text-sm font-medium text-foreground">
                    {displayName}
                  </p>
                  <p className="text-xs text-muted-foreground">{email}</p>
                </div>
              </div>
            </div>

            <nav className="mx-auto mt-4 flex max-w-6xl gap-2 md:hidden">
              {navItems.map((item) => (
                <DashboardNavLink key={`mobile-${item.href}`} {...item} />
              ))}
            </nav>
          </header>

          <main className="flex-1 px-5 py-6">
            <div className="mx-auto max-w-6xl">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
