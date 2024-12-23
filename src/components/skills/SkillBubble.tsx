import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";
import { useSkillsMatrixStore } from "../benchmark/skills-matrix/SkillsMatrixState";

interface SkillBubbleProps {
  skillName: string;
  level?: string;
  isRequired?: boolean;
}

export const SkillBubble = ({ skillName, level = 'unspecified', isRequired = false }: SkillBubbleProps) => {
  const { currentStates } = useSkillsMatrixStore();
  const skillState = currentStates[skillName];

  console.log('SkillBubble rendering:', {
    skillName,
    level,
    isRequired,
    skillState,
    currentLevel: skillState?.level || level,
    isSkillGoal: skillState?.requirement === 'required' || skillState?.requirement === 'skill_goal'
  });

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "advanced":
        return "border-primary-accent bg-primary-accent/10";
      case "intermediate":
        return "border-primary-icon bg-primary-icon/10";
      case "beginner":
        return "border-[#008000] bg-[#008000]/10";
      default:
        return "border-gray-300 bg-gray-100/50";
    }
  };

  const getDotColor = (level: string) => {
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

  // Use the current state level if available, otherwise fall back to the prop
  const currentLevel = skillState?.level || level;
  const isSkillGoal = skillState?.requirement === 'required' || skillState?.requirement === 'skill_goal';

  return (
    <Badge 
      variant="outline" 
      className={`
        rounded-md px-4 py-2 border bg-white hover:bg-background/80 transition-colors 
        flex items-center gap-2
        ${getLevelColor(currentLevel)}
      `}
    >
      {skillName}
      <div className="flex items-center gap-1.5">
        <div className={`h-2 w-2 rounded-full ${getDotColor(currentLevel)}`} />
        {isSkillGoal && (
          <Heart className="w-3 h-3 text-[#1f2144]" />
        )}
      </div>
    </Badge>
  );
};