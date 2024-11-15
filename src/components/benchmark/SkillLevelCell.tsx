import { TableCell } from "@/components/ui/table";
import { getLevelIcon, getRequirementIcon } from "./skill-level/SkillLevelIcons";
import { getLevelStyles, getRequirementStyles } from "./skill-level/SkillLevelStyles";
import { useSkillLevelState } from "./skill-level/SkillLevelState";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";

interface SkillLevelCellProps {
  initialLevel: string;
  skillTitle: string;
  onLevelChange?: (newLevel: string, requirement: string) => void;
  isReadOnly?: boolean;
}

export const SkillLevelCell = ({ 
  initialLevel, 
  skillTitle, 
  onLevelChange,
  isReadOnly = false 
}: SkillLevelCellProps) => {
  const { getCurrentState, currentStates } = useSkillLevelState(skillTitle);
  const { currentStates: matrixStates, originalStates } = useSkillsMatrixStore();
  
  const state = getCurrentState();
  const level = state?.level || initialLevel.toLowerCase();
  const required = state?.requirement || "required";

  const ReadOnlyDisplay = () => (
    <div className="flex flex-col items-center">
      <div className={`${getLevelStyles(level)} rounded-t-md px-3 py-1.5 text-sm font-medium w-full capitalize flex items-center justify-center min-h-[28px] text-[#1f2144]`}>
        <span className="flex items-center gap-2 justify-center text-[15px]">
          {getLevelIcon(level)}
          {level.charAt(0).toUpperCase() + level.slice(1)}
        </span>
      </div>
      <div className={`${getRequirementStyles(required, level)}`}>
        <span className="flex items-center gap-1.5 justify-center text-xs">
          {getRequirementIcon(required)}
          {required === 'required' ? 'Skill Goal' : required === 'not-interested' ? 'Not Interested' : required === 'unknown' ? 'Unknown' : 'Skill Goal'}
        </span>
      </div>
    </div>
  );

  const EditableDisplay = () => (
    <Select value={level} onValueChange={(newLevel) => onLevelChange?.(newLevel, required)}>
      <SelectTrigger 
        className={`rounded-t-md px-3 py-1.5 text-sm font-medium w-full capitalize flex items-center justify-center min-h-[28px] text-[#1f2144] ${getLevelStyles(level)}`}
      >
        <SelectValue>
          <span className="flex items-center gap-2 justify-center text-[15px]">
            {getLevelIcon(level)}
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="unspecified">
          <span className="flex items-center gap-1.5">
            {getLevelIcon('unspecified')}
            Unspecified
          </span>
        </SelectItem>
        <SelectItem value="beginner">
          <span className="flex items-center gap-1.5">
            {getLevelIcon('beginner')}
            Beginner
          </span>
        </SelectItem>
        <SelectItem value="intermediate">
          <span className="flex items-center gap-1.5">
            {getLevelIcon('intermediate')}
            Intermediate
          </span>
        </SelectItem>
        <SelectItem value="advanced">
          <span className="flex items-center gap-1.5">
            {getLevelIcon('advanced')}
            Advanced
          </span>
        </SelectItem>
      </SelectContent>
    </Select>
  );

  return (
    <TableCell className="border-r border-blue-200 p-0">
      {isReadOnly ? <ReadOnlyDisplay /> : <EditableDisplay />}
    </TableCell>
  );
};
