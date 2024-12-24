import { TableCell } from "@/components/ui/table";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";
import { useEffect } from "react";
import { getLevelIcon } from "./skill-level/SkillLevelIcons";
import { getLevelStyles, getGoalStatusStyles } from "./skill-level/SkillLevelStyles";

interface StaticSkillLevelCellProps {
  initialLevel: string;
  skillTitle: string;
}

export const StaticSkillLevelCell = ({ 
  initialLevel, 
  skillTitle,
}: StaticSkillLevelCellProps) => {
  const { currentStates, initializeState } = useSkillsMatrixStore();

  useEffect(() => {
    if (!currentStates[skillTitle]) {
      console.log('Initializing static skill cell:', {
        skillTitle,
        initialLevel,
        currentState: currentStates[skillTitle]
      });
      
      initializeState(skillTitle, 'unspecified', 'unknown');
    }
  }, [skillTitle, initialLevel, currentStates, initializeState]);

  const currentState = currentStates[skillTitle] || {
    level: 'unspecified',
    goalStatus: 'unknown'
  };

  return (
    <TableCell className="border-r border-blue-200 p-0">
      <div className="flex flex-col items-center">
        <div className={getLevelStyles(currentState?.level)}>
          <span className="flex items-center gap-2">
            {getLevelIcon(currentState?.level)}
            {(currentState?.level || 'unspecified').charAt(0).toUpperCase() + (currentState?.level || 'unspecified').slice(1)}
          </span>
        </div>
        <div className={getGoalStatusStyles(currentState?.goalStatus, currentState?.level)}>
          <span className="flex items-center gap-1.5">
            {currentState?.goalStatus === 'required' ? 'Skill Goal' : 
             currentState?.goalStatus === 'not_interested' ? 'Not Interested' : 
             'Unknown'}
          </span>
        </div>
      </div>
    </TableCell>
  );
};