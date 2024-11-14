import { Badge } from "@/components/ui/badge";
import { Heart, Star, Shield, Target, CircleDashed } from "lucide-react";
import { BaseSkill } from "./types";

interface SkillBadgeProps {
  skill: BaseSkill;
  showLevel?: boolean;
  level?: string;
  isSkillGoal?: boolean;
  isRoleBenchmark?: boolean;
  isRequired?: boolean;
}

export const SkillBadge = ({ 
  skill, 
  showLevel = false, 
  level, 
  isSkillGoal,
  isRoleBenchmark = false,
  isRequired = false
}: SkillBadgeProps) => {
  const getLevelIcon = () => {
    switch (level?.toLowerCase()) {
      case "advanced":
        return <Star className="w-3 h-3 text-primary-accent" />;
      case "intermediate":
        return <Shield className="w-3 h-3 text-primary-icon" />;
      case "beginner":
        return <Target className="w-3 h-3 text-[#008000]" />;
      default:
        return <CircleDashed className="w-3 h-3 text-gray-400" />;
    }
  };

  const getLevelColor = () => {
    switch (level?.toLowerCase()) {
      case "advanced":
        return "bg-primary-accent";
      case "intermediate":
        return "bg-primary-icon";
      case "beginner":
        return "bg-[#008000]";
      default:
        return "bg-gray-300";
    }
  };

  const getBadgeStyle = () => {
    const baseStyle = "rounded-md px-4 py-2 border transition-colors flex items-center gap-2";
    
    if (isRequired) {
      return `${baseStyle} bg-white border-primary-accent/50 hover:border-primary-accent`;
    }
    
    return `${baseStyle} bg-white border-border hover:bg-background/80`;
  };

  return (
    <Badge 
      variant="outline" 
      className={getBadgeStyle()}
    >
      {skill.name}
      {showLevel && (
        <div className="flex items-center gap-1.5">
          {getLevelIcon()}
          {isSkillGoal && !isRoleBenchmark && (
            <Heart className="w-3 h-3 text-[#1f2144]" />
          )}
        </div>
      )}
    </Badge>
  );
};