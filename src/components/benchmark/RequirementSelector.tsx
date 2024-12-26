import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, Check, X, CircleDashed } from "lucide-react";
import { cn } from "@/lib/utils";

interface RequirementSelectorProps {
  currentRequired: string;
  currentLevel: string;
  onRequirementChange: (value: string) => void;
  isRoleRequirement?: boolean;
}

export const RequirementSelector = ({
  currentRequired,
  currentLevel,
  onRequirementChange,
  isRoleRequirement = false
}: RequirementSelectorProps) => {
  console.log('Rendering RequirementSelector:', {
    currentRequired,
    currentLevel,
    isRoleRequirement
  });

  const getRequirementStyles = (requirement: string) => {
    const baseStyles = "rounded-b-md px-3 py-1.5 text-xs font-medium w-full capitalize flex items-center justify-center min-h-[26px] text-[#1f2144]";
    
    const borderColor = currentLevel?.toLowerCase() === 'advanced' 
      ? 'border-primary-accent'
      : currentLevel?.toLowerCase() === 'intermediate'
        ? 'border-primary-icon'
        : currentLevel?.toLowerCase() === 'beginner'
          ? 'border-[#008000]'
          : 'border-gray-400';
    
    return cn(baseStyles, `bg-gray-100 border-x-2 border-b-2 ${borderColor}`);
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
            {isRoleRequirement ? (
              currentRequired === 'required' ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  Required
                </>
              ) : (
                <>
                  <Heart className="h-3.5 w-3.5" />
                  Preferred
                </>
              )
            ) : (
              currentRequired === 'skill_goal' ? (
                <>
                  <Heart className="h-3.5 w-3.5" />
                  Skill Goal
                </>
              ) : currentRequired === 'not_interested' ? (
                <>
                  <X className="h-3.5 w-3.5" />
                  Not Interested
                </>
              ) : (
                <>
                  <CircleDashed className="h-3.5 w-3.5" />
                  Unknown
                </>
              )
            )}
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {isRoleRequirement ? (
          <>
            <SelectItem value="required">
              <span className="flex items-center gap-2 text-[#1f2144]">
                <Check className="h-3.5 w-3.5" />
                Required
              </span>
            </SelectItem>
            <SelectItem value="preferred">
              <span className="flex items-center gap-2 text-[#1f2144]">
                <Heart className="h-3.5 w-3.5" />
                Preferred
              </span>
            </SelectItem>
          </>
        ) : (
          <>
            <SelectItem value="skill_goal">
              <span className="flex items-center gap-2 text-[#1f2144]">
                <Heart className="h-3.5 w-3.5" />
                Skill Goal
              </span>
            </SelectItem>
            <SelectItem value="not_interested">
              <span className="flex items-center gap-2 text-[#1f2144]">
                <X className="h-3.5 w-3.5" />
                Not Interested
              </span>
            </SelectItem>
            <SelectItem value="unknown">
              <span className="flex items-center gap-2 text-[#1f2144]">
                <CircleDashed className="h-3.5 w-3.5" />
                Unknown
              </span>
            </SelectItem>
          </>
        )}
      </SelectContent>
    </Select>
  );
};