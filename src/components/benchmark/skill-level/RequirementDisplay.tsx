import { Check, Heart } from "lucide-react";

interface RequirementDisplayProps {
  requirement: string;
  level: string;
}

export const RequirementDisplay = ({ requirement, level }: RequirementDisplayProps) => {
  const getBorderColorClass = (level: string) => {
    switch (level.toLowerCase()) {
      case 'advanced':
        return 'border-primary-accent';
      case 'intermediate':
        return 'border-primary-icon';
      case 'beginner':
        return 'border-[#008000]';
      default:
        return 'border-gray-400';
    }
  };

  return (
    <div className={`
      text-xs px-2 py-1.5 font-normal text-[#1f2144] w-full flex items-center justify-center gap-1.5 
      border-x-2 border-b-2 min-h-[32px] rounded-b-md bg-[#F9FAFB]
      ${getBorderColorClass(level)}
    `}>
      <span className="flex items-center gap-1.5">
        {requirement === 'required' ? (
          <>
            <Check className="w-3.5 h-3.5" />
            <span>Skill Goal</span>
          </>
        ) : (
          <>
            <Heart className="w-3.5 h-3.5" />
            <span>Skill Goal</span>
          </>
        )}
      </span>
    </div>
  );
};