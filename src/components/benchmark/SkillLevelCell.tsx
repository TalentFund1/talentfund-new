import { TableCell } from "@/components/ui/table";
import { useEffect } from "react";
import { useSkillLevelState } from "./skill-level/SkillLevelState";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";
import { LevelDisplay } from "./skill-level/LevelDisplay";
import { RequirementDisplay } from "./skill-level/RequirementDisplay";

interface SkillLevelCellProps {
  initialLevel: string;
  skillTitle: string;
  onLevelChange?: (newLevel: string, requirement: string) => void;
  isRoleBenchmark?: boolean;
}

export const SkillLevelCell = ({ 
  initialLevel, 
  skillTitle, 
  onLevelChange,
  isRoleBenchmark = false
}: SkillLevelCellProps) => {
  const { getCurrentState } = useSkillLevelState(skillTitle);
  const { currentStates, setSkillState } = useSkillsMatrixStore();
  const currentState = currentStates[skillTitle] || {
    level: initialLevel.toLowerCase(),
    requirement: 'required'
  };

  return (
    <TableCell className="border-r border-blue-200 p-0">
      <div className="flex flex-col items-center">
        <LevelDisplay level={currentState.level} />
        <RequirementDisplay 
          requirement={currentState.requirement} 
          level={currentState.level} 
        />
      </div>
    </TableCell>
  );
};