import { TableCell } from "@/components/ui/table";
import { useCompetencyStore } from "./CompetencyState";
import { LevelSelector } from "./LevelSelector";
import { RequirementSelector } from "./RequirementSelector";
import { useParams } from "react-router-dom";
import { SkillState } from "./state/competencyTypes";

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

  const currentState = currentStates[skillName]?.[levelKey] || {
    level: details.level || "unspecified",
    required: details.required || "preferred",
  };

  const handleLevelChange = (value: string) => {
    console.log('Changing level:', {
      skillName,
      levelKey,
      newLevel: value,
      currentRequired: currentState.required,
      roleId
    });
    
    setSkillState(
      skillName,
      value,
      levelKey,
      typeof currentState.required === 'string' ? currentState.required : 'preferred',
      roleId || "123"
    );
  };

  const handleRequirementChange = (value: string) => {
    console.log('Changing requirement:', {
      skillName,
      levelKey,
      currentLevel: currentState.level,
      newRequired: value,
      roleId
    });
    
    setSkillState(
      skillName,
      typeof currentState.level === 'string' ? currentState.level : 'unspecified',
      levelKey,
      value,
      roleId || "123"
    );
  };

  return (
    <TableCell 
      className={`text-center p-2 align-middle ${!isLastColumn ? 'border-r' : ''} border-border`}
    >
      <div className="flex flex-col items-center gap-0">
        <LevelSelector
          currentLevel={typeof currentState.level === 'string' ? currentState.level : 'unspecified'}
          onLevelChange={handleLevelChange}
        />
        <RequirementSelector
          currentRequired={typeof currentState.required === 'string' ? currentState.required : 'preferred'}
          currentLevel={typeof currentState.level === 'string' ? currentState.level : 'unspecified'}
          onRequirementChange={handleRequirementChange}
        />
      </div>
    </TableCell>
  );
};