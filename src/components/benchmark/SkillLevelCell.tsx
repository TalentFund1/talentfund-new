import { TableCell } from "@/components/ui/table";
import { getLevelIcon } from "./skill-level/SkillLevelIcons";
import { getLevelStyles, getRequirementStyles } from "./skill-level/SkillLevelStyles";
import { useSkillLevelState } from "./skill-level/SkillLevelState";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";

interface SkillLevelCellProps {
  initialLevel: string;
  skillTitle: string;
  onLevelChange?: (newLevel: string, requirement: string) => void;
}

export const SkillLevelCell = ({ initialLevel, skillTitle, onLevelChange }: SkillLevelCellProps) => {
  const { getCurrentState, currentStates } = useSkillLevelState(skillTitle);
  const { currentStates: matrixStates } = useSkillsMatrixStore();
  const currentState = getCurrentState() || {
    level: initialLevel.toLowerCase(),
    requirement: 'required'
  };

  return (
    <TableCell className="border-r border-blue-200 p-0">
      <div className="flex flex-col items-center">
        <div className={`${getLevelStyles(currentState.level)} min-h-[28px] w-full`}>
          <span className="flex items-center gap-2 justify-center text-[15px]">
            {getLevelIcon(currentState.level)}
            {currentState.level.charAt(0).toUpperCase() + currentState.level.slice(1)}
          </span>
        </div>

        <div className={`${getRequirementStyles(currentState.requirement, currentState.level)} min-h-[28px] w-full`}>
          <span className="flex items-center gap-1.5 justify-center text-xs">
            {currentState.requirement === 'required' ? 'Skill Goal' : 
             currentState.requirement === 'not-interested' ? 'Not Interested' : 
             currentState.requirement === 'unknown' ? 'Unknown' : 'Skill Goal'}
          </span>
        </div>
      </div>
    </TableCell>
  );
};