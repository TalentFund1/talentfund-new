import { TableCell } from "@/components/ui/table";
import { useCompetencyStore } from "./CompetencyState";
import { useEffect, useCallback } from "react";
import { LevelSelector } from "./LevelSelector";
import { RequirementSelector } from "./RequirementSelector";

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
  const roleId = "123"; // Default role ID

  // Initialize state only once when component mounts
  useEffect(() => {
    if (!currentStates[roleId]?.[skillName]?.[levelKey]) {
      console.log('Initializing skill state:', {
        roleId,
        skillName,
        levelKey
      });
      setSkillState(
        skillName,
        "unspecified",
        levelKey,
        "preferred"
      );
    }
  }, [roleId, skillName, levelKey]); // Remove currentStates and setSkillState from deps

  const currentState = currentStates[roleId]?.[skillName]?.[levelKey] || {
    level: "unspecified",
    required: "preferred",
  };

  const handleLevelChange = useCallback((value: string) => {
    console.log('Changing level:', {
      skillName,
      levelKey,
      newLevel: value,
      currentRequired: currentState.required
    });
    setSkillState(skillName, value, levelKey, currentState.required);
  }, [skillName, levelKey, currentState.required, setSkillState]);

  const handleRequirementChange = useCallback((value: string) => {
    console.log('Changing requirement:', {
      skillName,
      levelKey,
      currentLevel: currentState.level,
      newRequired: value
    });
    setSkillState(skillName, currentState.level, levelKey, value);
  }, [skillName, levelKey, currentState.level, setSkillState]);

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
          currentRequired={currentState.required}
          currentLevel={currentState.level}
          onRequirementChange={handleRequirementChange}
        />
      </div>
    </TableCell>
  );
};