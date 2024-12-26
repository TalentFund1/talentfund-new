import { TableCell } from "@/components/ui/table";
import { useCompetencyStore } from "./CompetencyState";
import { useEffect, useRef } from "react";
import { LevelSelector } from "./LevelSelector";
import { RequirementSelector } from "./RequirementSelector";
import { useEmployeeSkillsStore } from "../employee/store/employeeSkillsStore";
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
  const { id: employeeId } = useParams();
  const { setSkillLevel, setSkillGoalStatus } = useEmployeeSkillsStore();
  const initRef = useRef(false);

  // Initialize state only once when component mounts
  useEffect(() => {
    if (!initRef.current && employeeId) {
      console.log('Initializing skill state:', {
        skillName,
        levelKey,
        initialLevel: details.level || "unspecified",
        initialRequired: details.required || "unknown"
      });
      
      initRef.current = true;
    }
  }, [skillName, levelKey, details.level, details.required, employeeId]);

  const handleLevelChange = (value: string) => {
    if (!employeeId) return;

    console.log('Changing level:', {
      employeeId,
      skillName,
      newLevel: value
    });

    setSkillLevel(employeeId, skillName, value);
  };

  const handleRequirementChange = (value: string) => {
    if (!employeeId) return;

    console.log('Changing requirement:', {
      employeeId,
      skillName,
      newRequired: value
    });

    // Map 'required' to 'skill_goal' for compatibility
    const goalStatus = value === 'required' ? 'skill_goal' : value;
    setSkillGoalStatus(employeeId, skillName, goalStatus);
  };

  return (
    <TableCell 
      className={`text-center p-2 align-middle ${!isLastColumn ? 'border-r' : ''} border-border`}
    >
      <div className="flex flex-col items-center gap-0">
        <LevelSelector
          currentLevel={details.level || "unspecified"}
          onLevelChange={handleLevelChange}
        />
        <RequirementSelector
          currentRequired={details.required || "unknown"}
          currentLevel={details.level || "unspecified"}
          onRequirementChange={handleRequirementChange}
        />
      </div>
    </TableCell>
  );
};