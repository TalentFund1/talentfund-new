import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EmployeeSkillRequirement } from '../../types/skillTypes';

interface RequirementSelectorProps {
  currentRequired: EmployeeSkillRequirement;
  currentLevel: string;
  onRequirementChange: (value: EmployeeSkillRequirement) => void;
}

export const RequirementSelector = ({
  currentRequired,
  currentLevel,
  onRequirementChange
}: RequirementSelectorProps) => {
  const getRequirementColor = (requirement: EmployeeSkillRequirement) => {
    switch (requirement) {
      case 'skill_goal':
        return 'text-primary-accent';
      case 'not_interested':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  const getRequirementLabel = (requirement: EmployeeSkillRequirement): string => {
    switch (requirement) {
      case 'skill_goal':
        return 'Skill Goal';
      case 'not_interested':
        return 'Not Interested';
      case 'unknown':
        return 'Unknown';
      default:
        return 'Unknown';
    }
  };

  return (
    <Select
      value={currentRequired}
      onValueChange={(value) => onRequirementChange(value as EmployeeSkillRequirement)}
    >
      <SelectTrigger className="h-7 w-[110px] text-xs">
        <SelectValue>
          <span className={getRequirementColor(currentRequired)}>
            {getRequirementLabel(currentRequired)}
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="skill_goal">Skill Goal</SelectItem>
        <SelectItem value="not_interested">Not Interested</SelectItem>
        <SelectItem value="unknown">Unknown</SelectItem>
      </SelectContent>
    </Select>
  );
};