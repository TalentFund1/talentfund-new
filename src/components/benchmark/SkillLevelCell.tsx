import { TableCell } from "@/components/ui/table";
import { useCompetencyStore } from "./CompetencyState";
import { LevelSelector } from "./LevelSelector";
import { RequirementSelector } from "./RequirementSelector";
import { useParams } from "react-router-dom";
import { SkillGoalStatus } from "../employee/types/employeeSkillTypes";

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
  const { currentStates, setSkillState } = useCompetencyStore();
  const { id: roleId } = useParams<{ id: string }>();
  const currentRoleId = roleId || "123";

  const currentState = currentStates[currentRoleId]?.[skillName]?.[levelKey] || {
    level: details.level || "unspecified",
    required: details.required || "preferred",
  };

  const handleLevelChange = (value: string) => {
    console.log('Changing level:', {
      skillName,
      levelKey,
      newLevel: value,
      currentRequired: currentState.required
    });
    
    setSkillState(
      skillName,
      value,
      levelKey,
      currentState.required || 'preferred'
    );
  };

  const handleRequirementChange = (value: string) => {
    console.log('Changing requirement:', {
      skillName,
      levelKey,
      currentLevel: currentState.level,
      newRequired: value
    });
    
    setSkillState(
      skillName,
      currentState.level || 'unspecified',
      levelKey,
      value
    );
  };

  console.log('Rendering SkillCell:', {
    skillName,
    levelKey,
    currentState,
    roleId: currentRoleId
  });

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
          currentRequired={currentState.required || 'preferred'}
          currentLevel={currentState.level || 'unspecified'}
          onRequirementChange={handleRequirementChange}
        />
      </div>
    </TableCell>
  );
};