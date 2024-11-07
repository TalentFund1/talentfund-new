import { cn } from "@/lib/utils";
import { Star, Shield, Target } from "lucide-react";

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
      default:
        return "bg-gray-100 text-gray-400";
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
      default:
        return null;
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