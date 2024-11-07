import { cn } from "@/lib/utils";

interface SkillLevelIconProps {
  level: string;
}

export const SkillLevelIcon = ({ level }: SkillLevelIconProps) => {
  const getColorClass = () => {
    switch (level) {
      case "advanced":
        return "bg-primary-accent/20 text-primary-accent";
      case "intermediate":
        return "bg-primary-icon/20 text-primary-icon";
      case "beginner":
        return "bg-[#008000]/20 text-[#008000]";
      default:
        return "bg-gray-100 text-gray-400";
    }
  };

  return (
    <div className={cn("relative inline-flex items-center justify-center w-6 h-6 rounded-full", getColorClass())}>
      <div className="w-2 h-2 rounded-full bg-current" />
    </div>
  );
};