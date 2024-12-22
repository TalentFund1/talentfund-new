import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, X, CircleDashed } from "lucide-react";

interface RequirementSelectorProps {
  currentRequired: string;
  currentLevel: string;
  onRequirementChange: (value: string) => void;
}

export const RequirementSelector = ({ 
  currentRequired, 
  currentLevel,
  onRequirementChange 
}: RequirementSelectorProps) => {
  const getRequirementStyles = (requirement: string, level: string) => {
    const borderColor = level.toLowerCase() === 'advanced' 
      ? 'border-primary-accent'
      : level.toLowerCase() === 'intermediate'
        ? 'border-primary-icon'
        : level.toLowerCase() === 'beginner'
          ? 'border-[#008000]'
          : 'border-gray-400';

    const baseStyles = 'text-xs px-2 py-1.5 font-medium text-[#1f2144] w-full flex items-center justify-center gap-1.5';
    
    switch (requirement.toLowerCase()) {
      case 'skill_goal':
        return `${baseStyles} bg-gray-100/90 border-x-2 border-b-2 rounded-b-md ${borderColor}`;
      default:
        return `${baseStyles} bg-gray-50/90 border-x-2 border-b-2 rounded-b-md border-gray-300`;
    }
  };

  return (
    <Select 
      value={currentRequired}
      onValueChange={onRequirementChange}
    >
      <SelectTrigger 
        className={`${getRequirementStyles(currentRequired, currentLevel)} focus:ring-0 focus:ring-offset-0 focus-visible:ring-0`}
      >
        <SelectValue>
          <span className="flex items-center gap-2 justify-center">
            {currentRequired === 'skill_goal' ? (
              <>
                <Heart className="w-3.5 h-3.5" />
                <span>Skill Goal</span>
              </>
            ) : currentRequired === 'not_interested' ? (
              <>
                <X className="w-3.5 h-3.5" />
                <span>Not Interested</span>
              </>
            ) : (
              <>
                <CircleDashed className="w-3.5 h-3.5" />
                <span>Unknown</span>
              </>
            )}
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="skill_goal">
          <span className="flex items-center gap-2">
            <Heart className="w-3.5 h-3.5" /> Skill Goal
          </span>
        </SelectItem>
        <SelectItem value="not_interested">
          <span className="flex items-center gap-2">
            <X className="w-3.5 h-3.5" /> Not Interested
          </span>
        </SelectItem>
        <SelectItem value="unknown">
          <span className="flex items-center gap-2">
            <CircleDashed className="w-3.5 h-3.5" /> Unknown
          </span>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};