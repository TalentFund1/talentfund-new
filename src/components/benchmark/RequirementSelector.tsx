import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, X, CircleDashed } from "lucide-react";
import { getRequirementStyles } from "./skill-level/SkillLevelStyles";

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
  return (
    <Select value={currentRequired} onValueChange={onRequirementChange}>
      <SelectTrigger className={getRequirementStyles(currentRequired, currentLevel)}>
        <SelectValue>
          <span className="flex items-center gap-1.5 whitespace-nowrap">
            {currentRequired === 'required' ? (
              <>
                <Check className="w-3.5 h-3.5" />
                Required
              </>
            ) : currentRequired === 'not-interested' ? (
              <>
                <X className="w-3.5 h-3.5" />
                <span className="whitespace-nowrap">Not Interested</span>
              </>
            ) : (
              <>
                <CircleDashed className="w-3.5 h-3.5" />
                Unknown
              </>
            )}
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="required">
          <span className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5" />
            Required
          </span>
        </SelectItem>
        <SelectItem value="not-interested">
          <span className="flex items-center gap-1.5 whitespace-nowrap">
            <X className="w-3.5 h-3.5" />
            Not Interested
          </span>
        </SelectItem>
        <SelectItem value="unknown">
          <span className="flex items-center gap-1.5">
            <CircleDashed className="w-3.5 h-3.5" />
            Unknown
          </span>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};