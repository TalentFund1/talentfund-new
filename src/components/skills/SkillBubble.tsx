import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";
import { BaseSkill } from "./types";
import { useSkillsMatrixStore } from "../benchmark/skills-matrix/SkillsMatrixState";

interface SkillBubbleProps {
  skill: BaseSkill;
  showLevel?: boolean;
  level?: string;
  isSkillGoal?: boolean;
}

export const SkillBubble = ({ 
  skill, 
  showLevel = false, 
  level, 
  isSkillGoal 
}: SkillBubbleProps) => {
  const { currentStates } = useSkillsMatrixStore();
  const skillState = currentStates[skill.name];

  const getCurrentLevel = () => {
    if (!skillState) return level || 'unspecified';
    return typeof skillState.level === 'string' ? 
      skillState.level : 
      skillState.level?.level || 'unspecified';
  };

  const shouldShowGoal = () => {
    if (isSkillGoal) return true;
    
    if (skillState) {
      const goalStatus = typeof skillState.goalStatus === 'string' ? 
        skillState.goalStatus : 
        skillState.goalStatus?.goalStatus || 'unknown';
      return goalStatus === 'required' || goalStatus === 'skill_goal';
    }
    
    return false;
  };

  const getLevelColor = (level: string) => {
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

  const currentLevel = getCurrentLevel();

  return (
    <Badge 
      variant="outline" 
      className="rounded-full px-4 py-2 border border-border bg-white hover:bg-background/80 transition-colors flex items-center gap-2"
    >
      {skill.name}
      {(showLevel || skillState) && (
        <div className="flex items-center gap-1.5">
          <div className={`h-2 w-2 rounded-full ${getLevelColor(currentLevel)}`} />
          {shouldShowGoal() && (
            <Heart className="w-3 h-3 text-[#1f2144]" />
          )}
        </div>
      )}
    </Badge>
  );
};