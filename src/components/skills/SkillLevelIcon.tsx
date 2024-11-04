import { CircleDot, Star, StarHalf, CircleDashed } from "lucide-react";
import { cn } from "@/lib/utils";

interface SkillLevelIconProps {
  level: string;
  className?: string;
}

export const SkillLevelIcon = ({ level, className }: SkillLevelIconProps) => {
  const baseStyles = "h-6 w-6 mx-auto transition-all duration-200";
  
  switch (level) {
    case "advanced":
      return (
        <div className="relative group">
          <Star 
            className={cn(
              baseStyles,
              "text-primary-accent hover:scale-110",
              className
            )}
            fill="currentColor"
          />
          <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-popover text-xs px-2 py-1 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Advanced Level
          </span>
        </div>
      );
    case "intermediate":
      return (
        <div className="relative group">
          <StarHalf 
            className={cn(
              baseStyles,
              "text-primary-icon hover:scale-110",
              className
            )}
            fill="currentColor"
          />
          <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-popover text-xs px-2 py-1 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Intermediate Level
          </span>
        </div>
      );
    case "beginner":
      return (
        <div className="relative group">
          <CircleDashed 
            className={cn(
              baseStyles,
              "text-[#008000] hover:scale-110",
              className
            )}
          />
          <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-popover text-xs px-2 py-1 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Beginner Level
          </span>
        </div>
      );
    default:
      return null;
  }
};