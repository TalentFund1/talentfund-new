import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";
import { BaseSkill } from "./types";
import { useSkillsMatrixStore } from "../benchmark/skills-matrix/SkillsMatrixState";
import { EmployeeSkillRequirement } from "../../types/skillTypes";

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
  const skillState = currentStates[skill.name];

  console.log('SkillBadge rendering:', {
    skillName: skill.name,
    currentState: skillState,
    isSkillGoal,
    isRoleBenchmark
  });

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

  const shouldShowGoal = () => {
    // Don't show heart in role benchmark view
    if (isRoleBenchmark) {
      console.log('Not showing heart - role benchmark view');
      return false;
    }
    
    // If it's in the current states and requirement is skill_goal
    if (skillState) {
      const showHeart = skillState.requirement === 'skill_goal';
      console.log('Checking skill state requirement:', {
        requirement: skillState.requirement,
        showHeart
      });
      return showHeart;
    }
    
    console.log('Not showing heart - no matching conditions');
    return false;
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