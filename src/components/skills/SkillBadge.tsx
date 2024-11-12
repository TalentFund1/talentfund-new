import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";
import { BaseSkill } from "./types";
import { useSkillsMatrixStore } from "../benchmark/skills-matrix/SkillsMatrixState";

interface SkillBadgeProps {
  skill: BaseSkill;
  showLevel?: boolean;
  level?: string;
  isSkillGoal?: boolean;
}

export const SkillBadge = ({ skill, showLevel = false, level, isSkillGoal }: SkillBadgeProps) => {
  const { currentStates } = useSkillsMatrixStore();
  const skillState = currentStates[skill.name];

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

  // Determine if this skill should show a goal indicator
  const shouldShowGoal = () => {
    // If explicitly passed as a prop
    if (isSkillGoal) return true;
    
    // If it's in the current states
    if (skillState) {
      return skillState.requirement === 'required' || 
             skillState.requirement === 'skill_goal';
    }
    
    // For all skill levels, show goal by default
    const currentLevel = (skillState?.level || level || '').toLowerCase();
    return ['advanced', 'intermediate', 'beginner'].includes(currentLevel);
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
          <div className={`h-2 w-2 rounded-full ${
            getLevelColor(skillState?.level || level || "unspecified")
          }`} />
          {shouldShowGoal() && (
            <Heart className="w-3 h-3 text-[#1f2144]" />
          )}
        </div>
      )}
    </Badge>
  );
};