import { TableCell } from "@/components/ui/table";
import { useCompetencyStore } from "./CompetencyState";
import { LevelSelector } from "./LevelSelector";
import { RequirementSelector } from "./RequirementSelector";
import { useParams } from "react-router-dom";
import { RoleSkillRequirement, SkillLevel } from "@/types/skillTypes";

interface SkillCellProps {
  skillName: string;
  details: {
    level: SkillLevel;
    requirement: RoleSkillRequirement;
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
  const { id: roleId } = useParams<{ id: string }>();
  const currentRoleId = roleId || "123";

  const currentState = roleStates[currentRoleId]?.[skillName]?.[levelKey] || {
    id: skillName,
    level: details.level || "unspecified",
    requirement: details.requirement || "preferred",
  };

  const handleLevelChange = (value: SkillLevel) => {
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
      currentState.requirement || 'preferred',
      currentRoleId,
      skillName
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
      currentRoleId,
      skillName
    );
  };

  return (
    <TableCell 
      className={`text-center p-2 align-middle ${!isLastColumn ? 'border-r' : ''} border-border`}
    >
      <div className="flex flex-col items-center gap-0">
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