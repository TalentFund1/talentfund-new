import { Circle } from "lucide-react";
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
            <Circle className="w-8 h-8 absolute" strokeWidth={1.5} />
            <Circle className="w-5 h-5 absolute" strokeWidth={1.5} />
            <Circle className="w-2 h-2 absolute fill-current" />
          </div>
        );
      case "intermediate":
        return (
          <div className={cn(baseClasses, "text-primary-icon")}>
            <Circle className="w-8 h-8 absolute" strokeWidth={1.5} />
            <Circle className="w-5 h-5 absolute" strokeWidth={1.5} />
            <Circle className="w-2 h-2 absolute fill-current" />
          </div>
        );
      case "beginner":
        return (
          <div className={cn(baseClasses, "text-[#008000]")}>
            <Circle className="w-8 h-8 absolute" strokeWidth={1.5} />
            <Circle className="w-5 h-5 absolute" strokeWidth={1.5} />
            <Circle className="w-2 h-2 absolute fill-current" />
          </div>
        );
      default:
        return null;
    }
  };

  return renderIcon();
};