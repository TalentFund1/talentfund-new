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
    <div className={cn("relative inline-flex items-center justify-center", getColorClass())}>
      <div className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-current" />
      </div>
    </div>
  );
};