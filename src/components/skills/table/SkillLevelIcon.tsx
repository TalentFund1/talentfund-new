import { Star, Shield, Target } from "lucide-react";

interface SkillLevelIconProps {
  level: "beginner" | "intermediate" | "advanced";
}

export const SkillLevelIcon = ({ level }: SkillLevelIconProps) => {
  switch (level) {
    case "advanced":
      return <Star className="w-4 h-4 text-primary-accent" />;
    case "intermediate":
      return <Shield className="w-4 h-4 text-primary-icon" />;
    case "beginner":
      return <Target className="w-4 h-4 text-[#008000]" />;
    default:
      return null;
  }
};