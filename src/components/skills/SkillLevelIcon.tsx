import { CircleDot } from "lucide-react";

interface SkillLevelIconProps {
  level: string;
}

export const SkillLevelIcon = ({ level }: SkillLevelIconProps) => {
  switch (level) {
    case "advanced":
      return (
        <div className="flex flex-col items-center gap-1">
          <CircleDot className="h-5 w-5 text-primary-accent" />
          <span className="text-xs text-muted-foreground">Advanced</span>
        </div>
      );
    case "intermediate":
      return (
        <div className="flex flex-col items-center gap-1">
          <CircleDot className="h-5 w-5 text-primary-icon" />
          <span className="text-xs text-muted-foreground">Intermediate</span>
        </div>
      );
    case "beginner":
      return (
        <div className="flex flex-col items-center gap-1">
          <CircleDot className="h-5 w-5 text-[#008000]" />
          <span className="text-xs text-muted-foreground">Beginner</span>
        </div>
      );
    default:
      return null;
  }
};