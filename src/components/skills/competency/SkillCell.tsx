import { TableCell } from "@/components/ui/table";
import { useCompetencyStore } from "./CompetencyState";
import { useEffect, useCallback, useRef } from "react";
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
  const isInitialized = useRef(false);

  // Initialize state only once when component mounts
  useEffect(() => {
    if (!isInitialized.current && !currentStates[roleId]?.[skillName]?.[levelKey]) {
      console.log('Initializing skill state:', {
        roleId,
        skillName,
        levelKey,
        details
      });
      
      setSkillState(
        skillName,
        details?.level || "unspecified",
        levelKey,
        details?.required || "preferred"
      );
      
      isInitialized.current = true;
    }
  }, []); // Empty dependency array since we only want this to run once

  const currentState = currentStates[roleId]?.[skillName]?.[levelKey] || {
    level: details?.level || "unspecified",
    required: details?.required || "preferred",
  };

  const handleLevelChange = useCallback((value: string) => {
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
      currentState.required
    );
  }, [skillName, levelKey, currentState.required, setSkillState]);

  const handleRequirementChange = useCallback((value: string) => {
    console.log('Changing requirement:', {
      skillName,
      levelKey,
      currentLevel: currentState.level,
      newRequired: value
    });
    
    setSkillState(
      skillName,
      currentState.level,
      levelKey,
      value
    );
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