import { cn } from "@/lib/utils";

interface SkillLevelIconProps {
  level: string;
}

export const SkillLevelIcon = ({ level }: SkillLevelIconProps) => {
  const getColorClass = () => {
    switch (level) {
      case "advanced":
        return "text-primary-accent";
      case "intermediate":
        return "text-primary-icon";
      case "beginner":
        return "text-[#008000]";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className={cn("relative inline-flex items-center justify-center w-8 h-8", getColorClass())}>
      {/* Outer circle */}
      <div className="absolute w-8 h-8 rounded-full border-2 border-current" />
      {/* Middle circle (white background) */}
      <div className="absolute w-5 h-5 rounded-full bg-white" />
      {/* Inner circle (filled dot) */}
      <div className="absolute w-2.5 h-2.5 rounded-full bg-current" />
    </div>
  );
};