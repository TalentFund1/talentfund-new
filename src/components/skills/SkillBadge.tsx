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
  return (
    <Badge 
      key={skill.name} 
      variant="outline" 
      className="rounded-md px-4 py-2 border border-border bg-white hover:bg-background/80 transition-colors flex items-center gap-2"
    >
      {skill.name}
      {showLevel && (
        <div className="flex items-center gap-1.5">
          <div className={`h-2 w-2 rounded-full ${
            level === "advanced" ? "bg-primary-accent" :
            level === "intermediate" ? "bg-primary-icon" :
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