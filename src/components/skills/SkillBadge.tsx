import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";
import { BaseSkill, DetailedSkill } from "./types";

interface SkillBadgeProps {
  skill: BaseSkill;
  showLevel?: boolean;
  level?: string;
  isSkillGoal?: boolean;
}

export const SkillBadge = ({ skill, showLevel = false, level, isSkillGoal }: SkillBadgeProps) => {
  const getLevelColor = () => {
    switch (level?.toLowerCase()) {
      case 'advanced':
        return 'bg-[#8073ec]/10 border-[#8073ec]';
      case 'intermediate':
        return 'bg-[#ff9800]/10 border-[#ff9800]';
      case 'beginner':
        return 'bg-[#008000]/10 border-[#008000]';
      default:
        return 'bg-gray-100 border-gray-300';
    }
  };

  return (
    <Badge 
      key={skill.name} 
      variant="outline" 
      className={`rounded-md px-4 py-2 border hover:bg-background/80 transition-colors flex items-center gap-2 ${showLevel ? getLevelColor() : 'bg-white border-border'}`}
    >
      {skill.name}
      {showLevel && (
        <div className="flex items-center gap-1.5">
          <div className={`h-2 w-2 rounded-full ${
            level === "advanced" ? "bg-[#8073ec]" :
            level === "intermediate" ? "bg-[#ff9800]" :
            level === "beginner" ? "bg-[#008000]" :
            "bg-gray-300"
          }`} />
          {isSkillGoal && (
            <Heart className="w-3 h-3 text-[#1f2144]" />
          )}
        </div>
      )}
    </Badge>
  );
};