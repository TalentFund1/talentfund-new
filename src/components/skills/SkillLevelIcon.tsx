import { CircleDot } from "lucide-react";

interface SkillLevelIconProps {
  level: string;
}

export const SkillLevelIcon = ({ level }: SkillLevelIconProps) => {
  const getIconStyles = (level: string) => {
    switch (level) {
      case "advanced":
        return "h-5 w-5 text-primary-accent mx-auto hover:scale-110 transition-transform";
      case "intermediate":
        return "h-5 w-5 text-primary-icon mx-auto hover:scale-110 transition-transform";
      case "beginner":
        return "h-5 w-5 text-[#008000] mx-auto hover:scale-110 transition-transform";
      default:
        return "";
    }
  };

  return <CircleDot className={getIconStyles(level)} />;
};