import { SKILL_LABELS, SkillCategory } from "@/types";
import { SKILL_ICONS } from "@/data/mockData";
import { cn } from "@/lib/utils";

interface SkillBadgeProps {
  skill: SkillCategory;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export function SkillBadge({ skill, selected, onClick, className }: SkillBadgeProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
        "border-2 min-h-[44px]",
        selected
          ? "border-primary bg-primary text-primary-foreground shadow-primary"
          : "border-border bg-card text-foreground hover:border-primary/50 hover:bg-kerjain-blue-50",
        onClick && "cursor-pointer",
        className
      )}
    >
      <span className="text-lg">{SKILL_ICONS[skill]}</span>
      <span>{SKILL_LABELS[skill]}</span>
    </button>
  );
}
