import React from 'react';
import { TableCell } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SkillLevel, SkillGoalStatus } from "../employee/types/employeeSkillTypes";
import { getLevelIcon, getRequirementIcon } from "./skill-level/SkillLevelIcons";
import { getLevelStyles, getGoalStatusStyles } from "./skill-level/SkillLevelStyles";

interface StaticSkillLevelCellProps {
  initialLevel: string;
  skillTitle: string;
  onLevelChange?: (newLevel: string, goalStatus: string) => void;
  isRoleBenchmark?: boolean;
}

const normalizeLevel = (level: string | undefined): SkillLevel => {
  const normalizedLevel = (level || 'unspecified').toLowerCase();
  return normalizedLevel as SkillLevel;
};

const normalizeGoalStatus = (status: string | undefined): SkillGoalStatus => {
  const normalizedStatus = (status || 'unknown').toLowerCase();
  return normalizedStatus as SkillGoalStatus;
};

export const StaticSkillLevelCell = ({ 
  initialLevel, 
  skillTitle,
  onLevelChange,
  isRoleBenchmark = false
}: StaticSkillLevelCellProps) => {
  const currentLevel = normalizeLevel(initialLevel);
  const currentGoalStatus = normalizeGoalStatus('unknown');

  console.log('StaticSkillLevelCell rendering:', {
    skillTitle,
    initialLevel,
    currentLevel,
    currentGoalStatus,
    isRoleBenchmark
  });

  return (
    <TableCell className="border-r border-blue-200 p-0">
      <div className="flex flex-col items-center">
        <Select 
          value={currentLevel} 
          onValueChange={(value) => {
            onLevelChange?.(value, currentGoalStatus);
          }}
        >
          <SelectTrigger className={getLevelStyles(currentLevel)}>
            <SelectValue>
              <span className="flex items-center gap-2">
                {getLevelIcon(currentLevel)}
                {currentLevel.charAt(0).toUpperCase() + currentLevel.slice(1)}
              </span>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="unspecified">
              <span className="flex items-center gap-2">
                {getLevelIcon('unspecified')}
                Unspecified
              </span>
            </SelectItem>
            <SelectItem value="beginner">
              <span className="flex items-center gap-2">
                {getLevelIcon('beginner')}
                Beginner
              </span>
            </SelectItem>
            <SelectItem value="intermediate">
              <span className="flex items-center gap-2">
                {getLevelIcon('intermediate')}
                Intermediate
              </span>
            </SelectItem>
            <SelectItem value="advanced">
              <span className="flex items-center gap-2">
                {getLevelIcon('advanced')}
                Advanced
              </span>
            </SelectItem>
          </SelectContent>
        </Select>

        <div className={getGoalStatusStyles(currentGoalStatus, currentLevel)}>
          <span className="flex items-center gap-1.5">
            {getRequirementIcon(currentGoalStatus)}
            {currentGoalStatus === 'skill_goal' ? 'Skill Goal' : 
             currentGoalStatus === 'not_interested' ? 'Not Interested' : 
             'Unknown'}
          </span>
        </div>
      </div>
    </TableCell>
  );
};