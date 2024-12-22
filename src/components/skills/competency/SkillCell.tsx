import { TableCell } from "@/components/ui/table";
import { useCompetencyStore } from "./CompetencyState";
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
  const { roleStates, setSkillState } = useCompetencyStore();
  const { id: roleId, employeeId } = useParams<{ id: string; employeeId: string }>();
  const currentRoleId = roleId || "123";
  const currentEmployeeId = employeeId || "default";

  const currentState = roleStates[currentRoleId]?.[currentEmployeeId]?.[skillName]?.[levelKey] || {
    level: details.level || "unspecified",
    required: details.required || "preferred",
  };

  const handleLevelChange = (value: string) => {
    console.log('Changing level:', {
      skillName,
      levelKey,
      newLevel: value,
      currentRequired: currentState.required,
      roleId: currentRoleId,
      employeeId: currentEmployeeId
    });
    
    setSkillState(
      skillName,
      value,
      levelKey,
      currentState.required || 'preferred',
      currentRoleId,
      currentEmployeeId
    );
  };

  const handleRequirementChange = (value: string) => {
    console.log('Changing requirement:', {
      skillName,
      levelKey,
      currentLevel: currentState.level,
      newRequired: value,
      roleId: currentRoleId,
      employeeId: currentEmployeeId
    });
    
    setSkillState(
      skillName,
      currentState.level || 'unspecified',
      levelKey,
      value,
      currentRoleId,
      currentEmployeeId
    );
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
          currentRequired={currentState.required || 'preferred'}
          currentLevel={currentState.level || 'unspecified'}
          onRequirementChange={handleRequirementChange}
        />
      </div>
    </TableCell>
  );
};