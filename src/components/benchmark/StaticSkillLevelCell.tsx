import { TableCell } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";
import { SkillLevel, SkillGoalStatus } from "../employee/types/employeeSkillTypes";
import { getLevelIcon, getRequirementIcon } from "./skill-level/SkillLevelIcons";
import { getLevelStyles, getRequirementStyles } from "./skill-level/SkillLevelStyles";

interface StaticSkillLevelCellProps {
  initialLevel: string;
  skillTitle: string;
  onLevelChange?: (newLevel: string, goalStatus: string) => void;
  isRoleBenchmark?: boolean;
}

export const StaticSkillLevelCell = ({ 
  initialLevel, 
  skillTitle,
  onLevelChange,
  isRoleBenchmark = false
}: StaticSkillLevelCellProps) => {
  const { currentStates, initializeState } = useSkillsMatrixStore();

  // Initialize state if it doesn't exist
  React.useEffect(() => {
    if (!currentStates[skillTitle]) {
      initializeState(skillTitle, initialLevel, 'unknown');
    }
  }, [skillTitle, initialLevel, currentStates, initializeState]);

  const currentState = currentStates[skillTitle] || {
    level: initialLevel,
    goalStatus: 'unknown'
  };

  // Extract level and goalStatus safely
  const levelValue = typeof currentState === 'string' ? 
    currentState : 
    typeof currentState.level === 'string' ? 
      currentState.level : 
      'unspecified';

  const goalStatusValue = typeof currentState === 'string' ? 
    'unknown' : 
    typeof currentState.goalStatus === 'string' ? 
      currentState.goalStatus : 
      'unknown';

  return (
    <TableCell className="border-r border-blue-200 p-0">
      <div className="flex flex-col items-center">
        <div className={getLevelStyles(levelValue)}>
          <span className="flex items-center gap-2">
            {getLevelIcon(levelValue)}
            {levelValue.charAt(0).toUpperCase() + levelValue.slice(1)}
          </span>
        </div>
        <div className={getRequirementStyles(goalStatusValue, levelValue)}>
          <span className="flex items-center gap-1.5">
            {getRequirementIcon(goalStatusValue)}
            {goalStatusValue === 'skill_goal' ? 'Skill Goal' : 
             goalStatusValue === 'not_interested' ? 'Not Interested' : 
             'Unknown'}
          </span>
        </div>
      </div>
    </TableCell>
  );
};