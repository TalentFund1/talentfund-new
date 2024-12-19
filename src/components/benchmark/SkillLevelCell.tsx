import { TableCell } from "@/components/ui/table";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";
import { LevelSelector } from "./LevelSelector";
import { RequirementSelector } from "./RequirementSelector";
import { useParams } from "react-router-dom";

interface SkillCellProps {
  skillName: string;
  details: {
    level: string;
    required: string;
  };
  isLastColumn: boolean;
  levelKey: string;
}

export const SkillCell = ({ 
  skillName, 
  details, 
  isLastColumn, 
  levelKey 
}: SkillCellProps) => {
  const { currentStates, setSkillState } = useSkillsMatrixStore();
  const { id: employeeId } = useParams<{ id: string }>();

  const currentState = currentStates[employeeId || ""]?.[skillName] || {
    level: details.level || "unspecified",
    requirement: details.required || "preferred",
  };

  const handleLevelChange = (value: string) => {
    console.log('Changing level:', {
      skillName,
      levelKey,
      newLevel: value,
      currentRequired: currentState.requirement,
      employeeId
    });
    
    if (employeeId) {
      setSkillState(employeeId, skillName, value, currentState.requirement || 'preferred');
    }
  };

  const handleRequirementChange = (value: string) => {
    console.log('Changing requirement:', {
      skillName,
      levelKey,
      currentLevel: currentState.level,
      newRequired: value,
      employeeId
    });
    
    if (employeeId) {
      setSkillState(employeeId, skillName, currentState.level || 'unspecified', value);
    }
  };

  return (
    <TableCell 
      className={`text-center p-2 align-middle ${!isLastColumn ? 'border-r' : ''} border-border`}
    >
      <div className="flex flex-col items-center gap-0">
        <LevelSelector
          currentLevel={currentState.level || 'unspecified'}
          onLevelChange={handleLevelChange}
        />
        <RequirementSelector
          currentRequired={currentState.requirement || 'preferred'}
          currentLevel={currentState.level || 'unspecified'}
          onRequirementChange={handleRequirementChange}
        />
      </div>
    </TableCell>
  );
};