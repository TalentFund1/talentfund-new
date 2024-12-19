import { TableCell } from "@/components/ui/table";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";
import { LevelSelector } from "./LevelSelector";
import { RequirementSelector } from "./RequirementSelector";
import { useParams } from "react-router-dom";

interface SkillCellProps {
  skillName: string;
  employeeId: string;
}

export const SkillLevelCell = ({ skillName, employeeId }: SkillCellProps) => {
  const { setSkillState, getSkillState, initializeEmployeeSkills } = useSkillsMatrixStore();
  
  // Initialize skills if needed
  initializeEmployeeSkills(employeeId);
  
  const currentState = getSkillState(employeeId, skillName);

  const handleLevelChange = (value: string) => {
    console.log('Changing level:', {
      employeeId,
      skillName,
      newLevel: value,
      currentRequired: currentState.required
    });
    
    setSkillState(
      employeeId,
      skillName,
      value,
      currentState.required
    );
  };

  const handleRequirementChange = (value: string) => {
    console.log('Changing requirement:', {
      employeeId,
      skillName,
      currentLevel: currentState.level,
      newRequired: value
    });
    
    setSkillState(
      employeeId,
      skillName,
      currentState.level,
      value
    );
  };

  return (
    <TableCell className="text-center p-2 align-middle border-r border-border">
      <div className="flex flex-col items-center gap-0">
        <LevelSelector
          currentLevel={currentState.level}
          onLevelChange={handleLevelChange}
        />
        <RequirementSelector
          currentRequired={currentState.required}
          currentLevel={currentState.level}
          onRequirementChange={handleRequirementChange}
        />
      </div>
    </TableCell>
  );
};