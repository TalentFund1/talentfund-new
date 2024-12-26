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
    const baseStyles = 'text-xs px-2 py-1.5 font-medium text-[#1f2144] w-full flex items-center justify-center gap-1.5';
    
    switch (requirement.toLowerCase()) {
      case 'required':
        return `${baseStyles} border-x-2 border-b-2 rounded-b-md ${
          level.toLowerCase() === 'advanced' 
            ? 'bg-primary-accent/20 border-primary-accent' 
            : level.toLowerCase() === 'intermediate'
              ? 'bg-primary-icon/20 border-primary-icon'
              : level.toLowerCase() === 'beginner'
                ? 'bg-[#008000]/20 border-[#008000]'
                : 'bg-gray-100 border-gray-300'
        }`;
      case 'not_interested':
      case 'unknown':
      default:
        return `${baseStyles} bg-gray-100 border-x-2 border-b-2 rounded-b-md border-gray-300`;
    }
  };

  // Normalize the requirement value for consistent comparison
  const normalizedRequired = currentRequired.toLowerCase();

  return (
    <Select 
      value={normalizedRequired}
      onValueChange={onRequirementChange}
    >
      <SelectTrigger 
        className={`${getRequirementStyles(normalizedRequired, currentLevel)} focus:ring-0 focus:ring-offset-0 focus-visible:ring-0`}
      >
        <SelectValue>
          <span className="flex items-center gap-2 justify-center">
            {normalizedRequired === 'required' ? (
              <>
                <Heart className="w-3.5 h-3.5" />
                <span>Skill Goal</span>
              </>
            ) : normalizedRequired === 'not_interested' ? (
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
        <SelectItem value="required">
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