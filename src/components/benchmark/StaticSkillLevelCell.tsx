import { TableCell } from "@/components/ui/table";
import { getLevelIcon } from "./skill-level/SkillLevelIcons";
import { getLevelStyles } from "./skill-level/SkillLevelStyles";
import { SkillLevel, SkillGoalStatus } from "../employee/types/employeeSkillTypes";

interface StaticSkillLevelCellProps {
  level: string;
  goalStatus?: string;
}

export const StaticSkillLevelCell = ({ 
  level, 
  goalStatus = 'unknown'
}: StaticSkillLevelCellProps) => {
  const currentLevel = (level || 'unspecified').toLowerCase() as SkillLevel;
  const currentGoalStatus = goalStatus as SkillGoalStatus;

  return (
    <TableCell className="border-r border-blue-200 p-0">
      <div className="flex flex-col items-center">
        <div className={getLevelStyles(currentLevel)}>
          <span className="flex items-center gap-2">
            {getLevelIcon(currentLevel)}
            {currentLevel.charAt(0).toUpperCase() + currentLevel.slice(1)}
          </span>
        </div>
        <div className="text-xs text-gray-500">
          {currentGoalStatus === 'skill_goal' ? 'Skill Goal' : 
           currentGoalStatus === 'not_interested' ? 'Not Interested' : 
           'Unknown'}
        </div>
      </div>
    </TableCell>
  );
};