import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";
import { useSkillsMatrixStore } from "../benchmark/skills-matrix/SkillsMatrixState";
import { useParams } from "react-router-dom";

interface SkillBubbleProps {
  skillName: string;
  level?: string;
  isRequired?: boolean;
}

export const SkillBubble = ({ skillName, level = 'unspecified', isRequired = false }: SkillBubbleProps) => {
  const { id } = useParams();
  const { getSkillState } = useSkillsMatrixStore();
  const skillState = id ? getSkillState(skillName, id) : null;

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

  // Use the current state level if available, otherwise fall back to the prop
  const currentLevel = skillState?.level || level;
  const isSkillGoal = skillState?.goalStatus === 'skill_goal';

  return (
    <Badge 
      variant="outline" 
      className="rounded-md px-4 py-2 border border-border bg-white hover:bg-background/80 transition-colors flex items-center gap-2"
    >
      {skillName}
      <div className="flex items-center gap-1.5">
        <div className={`h-2 w-2 rounded-full ${getLevelColor(currentLevel)}`} />
        {isSkillGoal && (
          <Heart className="w-3 h-3 text-[#1f2144]" />
        )}
      </div>
    </Badge>
  );
};