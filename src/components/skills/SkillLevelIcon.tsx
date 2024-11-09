import { cn } from "@/lib/utils";
import { Star, Shield, Target, CircleDashed } from "lucide-react";

interface SkillLevelIconProps {
  level: string;
}

export const SkillLevelIcon = ({ level }: SkillLevelIconProps) => {
  const getColorClass = () => {
    switch (level) {
      case "advanced":
        return "bg-primary-accent/10 text-primary-accent";
      case "intermediate":
        return "bg-primary-icon/10 text-primary-icon";
      case "beginner":
        return "bg-[#008000]/10 text-[#008000]";
      case "unspecified":
      default:
        return "bg-[#F7F9FF] text-[#6B7280]";
    }
  };

  const getIcon = () => {
    switch (level) {
      case "advanced":
        return <Star className="w-5 h-5" strokeWidth={2} />;
      case "intermediate":
        return <Shield className="w-5 h-5" strokeWidth={2} />;
      case "beginner":
        return <Target className="w-5 h-5" strokeWidth={2} />;
      case "unspecified":
      default:
        return <CircleDashed className="w-5 h-5" strokeWidth={2} />;
    }
  };

  return (
    <div className={cn(
      "relative inline-flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 hover:scale-110",
      getColorClass()
    )}>
      {getIcon()}
    </div>
  );
};