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
      case 'not-interested':
      case 'preferred':
      case 'unknown':
      default:
        return `${baseStyles} bg-gray-100 border-x-2 border-b-2 rounded-b-md border-gray-300`;
    }
  };

  // Normalize the requirement value for consistent comparison
  const normalizedRequired = currentRequired.toLowerCase();

  // Map the backend state to UI display state
  const getDisplayState = (state: string) => {
    switch (state.toLowerCase()) {
      case 'required':
        return 'Skill Goal';
      case 'not-interested':
        return 'Not Interested';
      case 'preferred':
        return 'Unknown';
      case 'unknown':
        return 'Unknown';
      default:
        return 'Unknown';
    }
  };

  // Get the appropriate icon based on the requirement state
  const getRequirementIcon = (state: string) => {
    switch (state.toLowerCase()) {
      case 'required':
        return <Heart className="w-3.5 h-3.5" />;
      case 'not-interested':
        return <X className="w-3.5 h-3.5" />;
      case 'preferred':
      case 'unknown':
      default:
        return <CircleDashed className="w-3.5 h-3.5" />;
    }
  };

  console.log('Requirement state:', {
    currentRequired,
    normalized: normalizedRequired,
    display: getDisplayState(normalizedRequired)
  });

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
            {getRequirementIcon(normalizedRequired)}
            <span>{getDisplayState(normalizedRequired)}</span>
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="required">
          <span className="flex items-center gap-2">
            <Heart className="w-3.5 h-3.5" /> Skill Goal
          </span>
        </SelectItem>
        <SelectItem value="not-interested">
          <span className="flex items-center gap-2">
            <X className="w-3.5 h-3.5" /> Not Interested
          </span>
        </SelectItem>
        <SelectItem value="preferred">
          <span className="flex items-center gap-2">
            <CircleDashed className="w-3.5 h-3.5" /> Unknown
          </span>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};