import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";
import { BaseSkill } from "./types";
import { useSkillsMatrixStore } from "../benchmark/skills-matrix/SkillsMatrixState";

interface SkillState {
  level: string | { level: string };
  requirement: string | { requirement: string } | null;
}

interface SkillBadgeProps {
  skill: BaseSkill;
  showLevel?: boolean;
  level?: string;
  isSkillGoal?: boolean;
  isRoleBenchmark?: boolean;
}

export const SkillBadge = ({ 
  skill, 
  showLevel = false, 
  level, 
  isSkillGoal,
  isRoleBenchmark = false 
}: SkillBadgeProps) => {
  const { currentStates } = useSkillsMatrixStore();
  const skillState = currentStates[skill.name] as SkillState | undefined;

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
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

  const shouldShowGoal = () => {
    if (isRoleBenchmark) return false;
    if (isSkillGoal) return true;
    
    if (skillState?.requirement) {
      const requirement = typeof skillState.requirement === 'string' 
        ? skillState.requirement 
        : skillState.requirement?.requirement;
      return requirement === 'required' || requirement === 'skill_goal';
    }
    
    const currentLevel = skillState?.level || level || '';
    const levelStr = typeof currentLevel === 'string' ? currentLevel : currentLevel?.level;
    return ['advanced', 'intermediate', 'beginner'].includes(levelStr?.toLowerCase() || '');
  };

  const getDisplayLevel = () => {
    if (skillState?.level) {
      return typeof skillState.level === 'string' ? skillState.level : skillState.level?.level;
    }
    return level || 'unspecified';
  };

  return (
    <Badge 
      key={skill.name} 
      variant="outline" 
      className="rounded-md px-4 py-2 border border-border bg-white hover:bg-background/80 transition-colors flex items-center gap-2"
    >
      {skill.name}
      {(showLevel || skillState) && (
        <div className="flex items-center gap-1.5">
          <div className={`h-2 w-2 rounded-full ${getLevelColor(getDisplayLevel())}`} />
          {shouldShowGoal() && (
            <Heart className="w-3 h-3 text-[#1f2144]" />
          )}
        </div>
      )}
    </Badge>
  );
};