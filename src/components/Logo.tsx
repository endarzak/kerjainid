import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ className, size = "md" }, ref) => {
    const sizeClasses = {
      sm: "text-xl",
      md: "text-2xl",
      lg: "text-4xl",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center font-bold",
          sizeClasses[size],
          className
        )}
      >
        <span className="text-primary">QERDJAIN</span>
        <span className="text-accent">.</span>
        <span className="text-secondary">ID</span>
      </div>
    );
  }
);

Logo.displayName = "Logo";
