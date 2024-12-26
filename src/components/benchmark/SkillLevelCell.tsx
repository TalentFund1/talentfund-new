import { TableCell } from "@/components/ui/table";
import { useEmployeeSkillsStore } from "../employee/store/employeeSkillsStore";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";
import { useEffect } from "react";
import { LevelSelector } from "./LevelSelector";
import { RequirementSelector } from "./RequirementSelector";

interface SkillCellProps {
  skillName: string;
  employeeId: string;
  isLastColumn: boolean;
  levelKey: string;
}

export const SkillLevelCell = ({ 
  skillName, 
  employeeId,
  isLastColumn, 
  levelKey 
}: SkillCellProps) => {
  const { getSkillState, setSkillLevel, setSkillGoalStatus } = useEmployeeSkillsStore();
  const { setBenchmarkState } = useSkillsMatrixStore();

  const skillState = getSkillState(employeeId, skillName);

  const handleLevelChange = (value: string) => {
    console.log('Changing level:', {
      skillName,
      levelKey,
      newLevel: value,
      currentRequired: skillState.goalStatus,
      employeeId
    });
    
    setSkillLevel(employeeId, skillName, value);
    setBenchmarkState(skillName, levelKey, value, skillState.goalStatus);
  };

  const handleRequirementChange = (value: string) => {
    console.log('Changing requirement:', {
      skillName,
      levelKey,
      currentLevel: skillState.level,
      newRequired: value,
      employeeId
    });
    
    setSkillGoalStatus(employeeId, skillName, value);
    setBenchmarkState(skillName, levelKey, skillState.level, value);
  };

  return (
    <TableCell 
      className={`text-center p-2 align-middle ${!isLastColumn ? 'border-r' : ''} border-border`}
    >
      <div className="flex flex-col items-center gap-0">
        <LevelSelector
          currentLevel={skillState.level}
          onLevelChange={handleLevelChange}
        />
        <RequirementSelector
          currentRequired={skillState.goalStatus}
          currentLevel={skillState.level}
          onRequirementChange={handleRequirementChange}
        />
      </div>
    </TableCell>
  );
};