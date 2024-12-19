import { TableCell } from "@/components/ui/table";
import { useCompetencyStore } from "./CompetencyState";
import { useEffect, useRef } from "react";
import { LevelSelector } from "./LevelSelector";
import { RequirementSelector } from "./RequirementSelector";

interface SkillCellProps {
  skillName: string;
  details: {
    level?: string;
    required?: string;
  };
  isLastColumn: boolean;
  levelKey: string;
}

export const SkillCell = ({ 
  skillName, 
  details = { level: 'unspecified', required: 'preferred' }, 
  isLastColumn, 
  levelKey 
}: SkillCellProps) => {
  const { currentStates, setSkillState } = useCompetencyStore();
  const initRef = useRef(false);

  // Initialize state only once when component mounts
  useEffect(() => {
    if (!initRef.current) {
      console.log('Initializing skill state:', {
        skillName,
        levelKey,
        initialLevel: details?.level || "unspecified",
        initialRequired: details?.required || "preferred"
      });
      
      setSkillState(
        skillName,
        details?.level || "unspecified",
        levelKey,
        details?.required || "preferred"
      );
      initRef.current = true;
    }
  }, [skillName, levelKey, details?.level, details?.required, setSkillState]);

  const currentState = currentStates[skillName]?.[levelKey] || {
    level: details?.level || "unspecified",
    required: details?.required || "preferred",
  };

  const handleLevelChange = (value: string) => {
    console.log('Changing level:', {
      skillName,
      levelKey,
      newLevel: value,
      currentRequired: currentState.required
    });
    setSkillState(skillName, value, levelKey, currentState.required);
  };

  const handleRequirementChange = (value: string) => {
    console.log('Changing requirement:', {
      skillName,
      levelKey,
      currentLevel: currentState.level,
      newRequired: value
    });
    setSkillState(skillName, currentState.level, levelKey, value);
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
          currentRequired={currentState.required}
          currentLevel={currentState.level}
          onRequirementChange={handleRequirementChange}
        />
      </div>
    </TableCell>
  );
};