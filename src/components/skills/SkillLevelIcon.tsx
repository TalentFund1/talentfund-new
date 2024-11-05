import { Target } from "lucide-react";
import { cn } from "@/lib/utils";

interface SkillLevelIconProps {
  level: string;
}

export const SkillLevelIcon = ({ level }: SkillLevelIconProps) => {
  const baseClasses = "relative inline-flex items-center justify-center w-8 h-8";
  
  const renderIcon = () => {
    switch (level) {
      case "advanced":
        return (
          <div className={cn(baseClasses, "text-primary-accent")}>
            <Target className="w-8 h-8" strokeWidth={1.5} />
          </div>
        );
      case "intermediate":
        return (
          <div className={cn(baseClasses, "text-primary-icon")}>
            <Target className="w-8 h-8" strokeWidth={1.5} />
          </div>
        );
      case "beginner":
        return (
          <div className={cn(baseClasses, "text-[#008000]")}>
            <Target className="w-8 h-8" strokeWidth={1.5} />
          </div>
        );
      default:
        return null;
    }
  };

  return renderIcon();
};