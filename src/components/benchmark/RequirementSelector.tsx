import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, Heart, X, CircleDashed } from "lucide-react";

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
    const baseStyles = 'text-xs px-2 py-1.5 font-medium text-[#1f2144] w-full flex items-center justify-center gap-1.5 border-x-2 border-b-2 rounded-b-md';
    
    // Get background and border colors based on level for required/skill goal state
    const getLevelColors = (level: string) => {
      switch (level.toLowerCase()) {
        case 'advanced':
          return 'border-primary-accent bg-primary-accent/10';
        case 'intermediate':
          return 'border-primary-icon bg-primary-icon/10';
        case 'beginner':
          return 'border-[#008000] bg-[#008000]/10';
        default:
          return 'border-gray-300 bg-gray-50/90';
      }
    };

    return requirement.toLowerCase() === 'required'
      ? `${baseStyles} ${getLevelColors(level)}`
      : `${baseStyles} border-gray-300 bg-gray-50/90`;
  };

  // Map the backend state to UI display state
  const getDisplayState = (state: string) => {
    switch (state.toLowerCase()) {
      case 'required':
        return 'Skill Goal';
      case 'not-interested':
        return 'Not Interested';
      case 'preferred':
      case 'unknown':
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

  // Normalize the requirement value for consistent comparison
  const normalizedRequired = currentRequired.toLowerCase();

  console.log('Requirement state:', {
    currentRequired,
    normalized: normalizedRequired,
    display: getDisplayState(normalizedRequired),
    level: currentLevel
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