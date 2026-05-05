import { cn } from "@/lib/utils";

type ClientStatusBadgeProps = {
  isActive: boolean;
};

export function ClientStatusBadge({ isActive }: ClientStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-[0.18em] uppercase",
        isActive
          ? "border-primary/20 bg-primary/10 text-primary"
          : "border-secondary/30 bg-secondary/15 text-[#7b4c00]"
      )}
    >
      {isActive ? "Attivo" : "Disattivato"}
    </span>
  );
}
