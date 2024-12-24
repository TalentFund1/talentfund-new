import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface RequirementSelectorProps {
  currentRequired: string;
  currentLevel: string;
  onRequirementChange: (value: string) => void;
}

export const RequirementSelector = ({
  currentRequired,
  currentLevel,
  onRequirementChange,
}: RequirementSelectorProps) => {
  console.log('Rendering RequirementSelector:', {
    currentRequired,
    currentLevel
  });

  const getRequirementStyles = (requirement: string) => {
    const baseStyles = "rounded-b-md px-3 py-1.5 text-xs font-medium w-full capitalize flex items-center justify-center min-h-[26px] text-[#1f2144]";
    
    // If required, match the border color with the skill level
    if (requirement === 'required') {
      const borderColor = currentLevel?.toLowerCase() === 'advanced' 
        ? 'border-primary-accent'
        : currentLevel?.toLowerCase() === 'intermediate'
          ? 'border-primary-icon'
          : currentLevel?.toLowerCase() === 'beginner'
            ? 'border-[#008000]'
            : 'border-gray-500';
      
      return cn(baseStyles, `bg-gray-100 border-x-2 border-b-2 ${borderColor}`);
    }
    
    // For preferred state
    return cn(baseStyles, "bg-gray-50 border-x-2 border-b-2 border-gray-500");
  };

  return (
    <Select value={currentRequired} onValueChange={onRequirementChange}>
      <SelectTrigger 
        className={cn(
          getRequirementStyles(currentRequired),
          "focus:ring-0 focus:ring-offset-0 focus-visible:ring-0"
        )}
      >
        <SelectValue>
          <span className="flex items-center gap-2">
            {currentRequired === 'required' ? (
              <>
                <Check className="h-3.5 w-3.5" />
                Required
              </>
            ) : (
              <>
                <Heart className="h-3.5 w-3.5" />
                Preferred
              </>
            )}
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="required" className="cursor-pointer">
          <span className="flex items-center gap-2 text-[#1f2144]">
            <Check className="h-3.5 w-3.5" />
            Required
          </span>
        </SelectItem>
        <SelectItem value="preferred" className="cursor-pointer">
          <span className="flex items-center gap-2 text-[#1f2144]">
            <Heart className="h-3.5 w-3.5" />
            Preferred
          </span>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};