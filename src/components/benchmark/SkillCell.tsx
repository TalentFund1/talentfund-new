import { TableCell } from "@/components/ui/table";
import { useCompetencyStore } from "./CompetencyState";
import { useEffect, useRef } from "react";
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
  const { setSkillState } = useCompetencyStore();
  const initRef = useRef(false);
  const { id: employeeId } = useParams<{ id: string }>();

  // Initialize state only once when component mounts
  useEffect(() => {
    if (!initRef.current && employeeId) {
      console.log('Initializing skill state:', {
        employeeId,
        skillName,
        levelKey,
        initialLevel: details.level || "unspecified",
        initialRequired: details.required || "preferred"
      });
      
      setSkillState(
        employeeId,
        skillName,
        details.level || "unspecified",
        levelKey,
        details.required || "preferred"
      );
      initRef.current = true;
    }
  }, [skillName, levelKey, details.level, details.required, setSkillState, employeeId]);

  const handleLevelChange = (value: string) => {
    if (!employeeId) return;
    
    console.log('Changing level:', {
      employeeId,
      skillName,
      levelKey,
      newLevel: value,
      currentRequired: details.required
    });
    setSkillState(employeeId, skillName, value, levelKey, details.required);
  };

  const handleRequirementChange = (value: string) => {
    if (!employeeId) return;

    console.log('Changing requirement:', {
      employeeId,
      skillName,
      levelKey,
      currentLevel: details.level,
      newRequired: value
    });
    setSkillState(employeeId, skillName, details.level, levelKey, value);
  };

  return (
    <TableCell 
      className={`text-center p-2 align-middle ${!isLastColumn ? 'border-r' : ''} border-border`}
    >
      <div className="flex flex-col items-center gap-0">
        <LevelSelector
          currentLevel={details.level}
          onLevelChange={handleLevelChange}
        />
        <RequirementSelector
          currentRequired={details.required}
          currentLevel={details.level}
          onRequirementChange={handleRequirementChange}
        />
      </div>
    </TableCell>
  );
};