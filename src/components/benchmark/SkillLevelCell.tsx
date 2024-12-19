import { TableCell } from "@/components/ui/table";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";
import { LevelSelector } from "./LevelSelector";
import { RequirementSelector } from "./RequirementSelector";
import { useParams } from "react-router-dom";
import { SkillLevel, SkillRequirement } from "../skills/types/SkillTypes";

interface SkillLevelCellProps {
  initialLevel: string;
  skillTitle: string;
}

export const SkillLevelCell = ({ 
  initialLevel,
  skillTitle 
}: SkillLevelCellProps) => {
  const { currentStates, setSkillState } = useSkillsMatrixStore();
  const { id: employeeId } = useParams<{ id: string }>();

  const currentState = employeeId && currentStates[employeeId]?.[skillTitle] || {
    level: initialLevel as SkillLevel || "unspecified",
    requirement: "preferred" as SkillRequirement
  };

  const handleLevelChange = (value: string) => {
    if (!employeeId) return;
    
    console.log('Changing level:', {
      skillTitle,
      newLevel: value,
      currentRequired: currentState.requirement,
      employeeId
    });
    
    setSkillState(employeeId, skillTitle, value as SkillLevel, currentState.requirement);
  };

  const handleRequirementChange = (value: string) => {
    if (!employeeId) return;
    
    console.log('Changing requirement:', {
      skillTitle,
      currentLevel: currentState.level,
      newRequired: value,
      employeeId
    });
    
    setSkillState(employeeId, skillTitle, currentState.level, value as SkillRequirement);
  };

  return (
    <TableCell className="text-center border-r border-blue-200 py-2 p-0">
      <div className="flex flex-col items-center">
        <LevelSelector
          currentLevel={currentState.level}
          onLevelChange={handleLevelChange}
        />
        <RequirementSelector
          currentRequired={currentState.requirement}
          currentLevel={currentState.level}
          onRequirementChange={handleRequirementChange}
        />
      </div>
    </TableCell>
  );
};