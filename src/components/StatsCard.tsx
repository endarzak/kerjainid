import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  className?: string;
}

export function StatsCard({ icon: Icon, value, label, className }: StatsCardProps) {
  return (
    <div className={cn("text-center p-6", className)}>
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-4">
        <Icon className="h-7 w-7" />
      </div>
      <div className="text-3xl md:text-4xl font-bold text-foreground">{value}</div>
      <div className="text-sm text-muted-foreground mt-1">{label}</div>
    </div>
  );
}
