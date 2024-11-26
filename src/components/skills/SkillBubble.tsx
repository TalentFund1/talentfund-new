import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";

interface SkillBubbleProps {
  skill: {
    name: string;
  };
  level?: string;
  showLevel?: boolean;
  isRoleBenchmark?: boolean;
}

export const SkillBubble = ({ 
  skill, 
  level = 'unspecified', 
  showLevel = false,
  isRoleBenchmark = false 
}: SkillBubbleProps) => {
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

  return (
    <Badge 
      variant="outline" 
      className="rounded-md px-4 py-2 border border-border bg-white hover:bg-background/80 transition-colors flex items-center gap-2"
    >
      {skill.name}
      {showLevel && (
        <div className="flex items-center gap-1.5">
          <div className={`h-2 w-2 rounded-full ${getLevelColor(level)}`} />
          {!isRoleBenchmark && (
            <Heart className="w-3 h-3 text-[#1f2144]" />
          )}
        </div>
      )}
    </Badge>
  );
};