"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";

const icons = {
  dashboard: LayoutDashboard,
  clients: Building2,
} as const;

type DashboardNavLinkProps = {
  href: string;
  label: string;
  icon: keyof typeof icons;
};

export function DashboardNavLink({
  href,
  label,
  icon,
}: DashboardNavLinkProps) {
  const pathname = usePathname();
  const Icon = icons[icon];
  const isActive =
    pathname === href || (href !== "/dashboard" && pathname.startsWith(`${href}/`));

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all",
        isActive
          ? "bg-primary text-primary-foreground shadow-[0_12px_24px_-18px_rgba(15,76,129,0.75)]"
          : "text-muted-foreground hover:bg-accent hover:text-foreground"
      )}
    >
      <Icon className="size-4" />
      <span>{label}</span>
    </Link>
  );
}
