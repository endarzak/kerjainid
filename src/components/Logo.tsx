import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className, size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-4xl",
  };

  return (
    <div className={cn("flex items-center gap-1 font-bold", sizeClasses[size], className)}>
      <span className="text-primary">KERJA</span>
      <span className="text-accent">.</span>
      <span className="text-secondary">IN</span>
    </div>
  );
}
