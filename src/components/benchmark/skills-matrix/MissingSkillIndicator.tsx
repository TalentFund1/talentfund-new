import { cn } from "@/lib/utils";

interface MissingSkillIndicatorProps {
  className?: string;
}

export const MissingSkillIndicator = ({ className }: MissingSkillIndicatorProps) => {
  return (
    <div className={cn(
      "px-2 py-1 text-sm text-muted-foreground border border-border rounded bg-background",
      className
    )}>
      Missing Skill
    </div>
  );
};