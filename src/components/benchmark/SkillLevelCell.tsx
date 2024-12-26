import { TableCell } from "@/components/ui/table";
import { useCompetencyStore } from "./CompetencyState";
import { useEffect, useRef } from "react";
import { LevelSelector } from "./LevelSelector";
import { RequirementSelector } from "./RequirementSelector";

interface SkillLevelCellProps {
  initialLevel: string;
  skillTitle: string;
}

export const SkillLevelCell = ({ 
  initialLevel,
  skillTitle
}: SkillLevelCellProps) => {
  const { currentStates, setSkillState } = useCompetencyStore();
  const initRef = useRef(false);

  // Initialize state only once when component mounts
  useEffect(() => {
    if (!initRef.current) {
      console.log('Initializing skill level:', {
        skillTitle,
        initialLevel
      });
      
      setSkillState(
        skillTitle,
        initialLevel || "unspecified",
        "p4",
        "unknown"
      );
      initRef.current = true;
    }
  }, [skillTitle, initialLevel, setSkillState]);

  const currentState = currentStates[skillTitle]?.p4 || {
    level: initialLevel || "unspecified",
    required: "unknown"
  };

  const handleLevelChange = (value: string) => {
    console.log('Changing level:', {
      skillTitle,
      newLevel: value,
      currentRequired: currentState.required
    });
    setSkillState(skillTitle, value, "p4", currentState.required);
  };

  const handleRequirementChange = (value: string) => {
    console.log('Changing requirement:', {
      skillTitle,
      currentLevel: currentState.level,
      newRequired: value
    });
    setSkillState(skillTitle, currentState.level, "p4", value);
  };

  return (
    <TableCell className="text-center border-r border-blue-200 p-0">
      <div className="flex flex-col items-center">
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