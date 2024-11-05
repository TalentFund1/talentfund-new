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
      {/* Outer circle */}
      <div className="w-8 h-8 rounded-full border-2 border-current absolute" />
      {/* Middle circle (white space) */}
      <div className="w-5 h-5 rounded-full bg-white absolute" />
      {/* Inner circle */}
      <div className="w-2 h-2 rounded-full bg-current absolute" />
    </div>
  );
};