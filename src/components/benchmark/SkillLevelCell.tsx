import { TableCell } from "@/components/ui/table";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";
import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SkillLevelCellProps {
  initialLevel: string;
  skillTitle: string;
}

export const SkillLevelCell = ({ initialLevel, skillTitle }: SkillLevelCellProps) => {
  const { currentStates, setSkillState, initializeState } = useSkillsMatrixStore();
  const [level, setLevel] = useState(initialLevel);

  useEffect(() => {
    initializeState(skillTitle, initialLevel, 'preferred');
  }, [skillTitle, initialLevel, initializeState]);

  const handleLevelChange = (newLevel: string) => {
    setLevel(newLevel);
    setSkillState(skillTitle, newLevel, currentStates[skillTitle]?.requirement || 'preferred');
  };

  return (
    <TableCell className="text-center border-r border-blue-200/60 py-2">
      <Select value={level} onValueChange={handleLevelChange}>
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder="Select level" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="beginner">Beginner</SelectItem>
          <SelectItem value="intermediate">Intermediate</SelectItem>
          <SelectItem value="advanced">Advanced</SelectItem>
          <SelectItem value="unspecified">Unspecified</SelectItem>
        </SelectContent>
      </Select>
    </TableCell>
  );
};