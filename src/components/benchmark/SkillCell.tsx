import { TableCell } from "@/components/ui/table";
import { useCompetencyStore } from "./CompetencyState";
import { LevelSelector } from "./LevelSelector";
import { RequirementSelector } from "./RequirementSelector";
import { useParams } from "react-router-dom";
import { RoleSkillState, RoleSkillRequirement } from "../../types/skillTypes";

interface SkillCellProps {
  skillName: string;
  details: {
    level: string;
    requirement: RoleSkillRequirement;
  };
  isLastColumn: boolean;
  levelKey: string;
}

export const SkillCell = ({ 
  skillName, 
  details = { level: 'unspecified', requirement: 'preferred' }, 
  isLastColumn = false, 
  levelKey 
}: SkillCellProps) => {
  if (!skillName || !levelKey) {
    console.warn('SkillCell: Missing required props', {
      skillName,
      levelKey
    });
    return null;
  }

  const { roleStates, setSkillState } = useCompetencyStore();
  const { id: roleId } = useParams<{ id: string }>();
  const currentRoleId = roleId || "123";

  const currentState = roleStates[currentRoleId]?.[skillName]?.[levelKey] || {
    id: skillName,
    skillId: skillName,
    roleId: currentRoleId,
    level: details.level || "unspecified",
    requirement: details.requirement || "preferred"
  };

  const handleLevelChange = (value: string) => {
    console.log('Changing level:', {
      skillName,
      levelKey,
      newLevel: value,
      currentRequirement: currentState.requirement,
      roleId: currentRoleId
    });
    
    setSkillState(
      skillName,
      value,
      levelKey,
      currentState.requirement,
      currentRoleId
    );
  };

  const handleRequirementChange = (value: RoleSkillRequirement) => {
    console.log('Changing requirement:', {
      skillName,
      levelKey,
      currentLevel: currentState.level,
      newRequirement: value,
      roleId: currentRoleId
    });
    
    setSkillState(
      skillName,
      currentState.level || 'unspecified',
      levelKey,
      value,
      currentRoleId
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
          currentRequired={currentState.requirement || 'preferred'}
          currentLevel={currentState.level || 'unspecified'}
          onRequirementChange={handleRequirementChange}
        />
      </div>
    </TableCell>
  );
};