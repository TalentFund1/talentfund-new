import { CircleDot } from "lucide-react";

interface SkillLevelIconProps {
  level: string;
}

export const SkillLevelIcon = ({ level }: SkillLevelIconProps) => {
  switch (level) {
    case "advanced":
      return <CircleDot className="h-5 w-5 text-primary-accent mx-auto" />;
    case "intermediate":
      return <CircleDot className="h-5 w-5 text-primary-icon mx-auto" />;
    case "beginner":
      return <CircleDot className="h-5 w-5 text-[#008000] mx-auto" />;
    default:
      return null;
  }
};