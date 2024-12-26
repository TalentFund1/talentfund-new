import { TableCell } from "@/components/ui/table";
import { Star, Shield, Target, CircleDashed, X, Heart } from "lucide-react";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";
import { useEffect } from "react";
import { SkillLevel, SkillGoalStatus } from "../employee/types/employeeSkillTypes";
import { SkillState } from "./skills-matrix/SkillsMatrixState";

interface StaticSkillLevelCellProps {
  initialLevel: string;
  skillTitle: string;
}

export const StaticSkillLevelCell = ({ 
  initialLevel, 
  skillTitle,
}: StaticSkillLevelCellProps) => {
  const { currentStates, initializeState } = useSkillsMatrixStore();

  useEffect(() => {
    console.log('Initializing static skill cell:', {
      skillTitle,
      initialLevel,
      currentState: currentStates[skillTitle]
    });
    
    if (!currentStates[skillTitle]) {
      initializeState(skillTitle, {
        level: 'unspecified' as SkillLevel,
        goalStatus: 'unknown' as SkillGoalStatus
      });
    }
  }, [skillTitle, initialLevel, currentStates, initializeState]);

  const currentState = currentStates[skillTitle] || {
    level: 'unspecified',
    goalStatus: 'unknown'
  };

  const getLevelIcon = (level: string) => {
    switch (level?.toLowerCase()) {
      case 'advanced':
        return <Star className="w-3.5 h-3.5 text-primary-accent" />;
      case 'intermediate':
        return <Shield className="w-3.5 h-3.5 text-primary-icon" />;
      case 'beginner':
        return <Target className="w-3.5 h-3.5 text-[#008000]" />;
      default:
        return <CircleDashed className="w-3.5 h-3.5 text-gray-400" />;
    }
  };

  const getRequirementIcon = (goalStatus: string) => {
    switch (goalStatus?.toLowerCase()) {
      case 'required':
        return <Heart className="w-3.5 h-3.5" />;
      case 'not_interested':
        return <X className="w-3.5 h-3.5" />;
      default:
        return <CircleDashed className="w-3.5 h-3.5" />;
    }
  };

  const getLevelStyles = (level: string) => {
    const baseStyles = "rounded-t-md px-3 py-1.5 text-sm font-medium w-full capitalize flex items-center justify-center min-h-[26px] text-[#1f2144]";
    
    switch (level?.toLowerCase()) {
      case 'advanced':
        return `${baseStyles} border-2 border-primary-accent bg-primary-accent/10`;
      case 'intermediate':
        return `${baseStyles} border-2 border-primary-icon bg-primary-icon/10`;
      case 'beginner':
        return `${baseStyles} border-2 border-[#008000] bg-[#008000]/10`;
      default:
        return `${baseStyles} border-2 border-gray-400 bg-gray-100/50`;
    }
  };

  const getRequirementStyles = (goalStatus: string, level: string) => {
    const baseStyles = 'text-xs px-2 py-1.5 font-normal text-[#1f2144] w-full flex items-center justify-center gap-1.5 border-x-2 border-b-2 min-h-[32px] rounded-b-md bg-[#F9FAFB]';
    
    switch (goalStatus?.toLowerCase()) {
      case 'required':
        return `${baseStyles} ${
          level.toLowerCase() === 'advanced' 
            ? 'border-primary-accent' 
            : level.toLowerCase() === 'intermediate'
              ? 'border-primary-icon'
              : level.toLowerCase() === 'beginner'
                ? 'border-[#008000]'
                : 'border-gray-300'
        }`;
      case 'not_interested':
      case 'unknown':
      default:
        return `${baseStyles} border-gray-300`;
    }
  };

  const levelValue = typeof currentState.level === 'string' ? currentState.level : currentState.level.level;
  const goalStatusValue = typeof currentState.goalStatus === 'string' ? currentState.goalStatus : currentState.goalStatus.goalStatus;

  return (
    <TableCell className="border-r border-blue-200 p-0">
      <div className="flex flex-col items-center">
        <div className={getLevelStyles(levelValue)}>
          <span className="flex items-center gap-2">
            {getLevelIcon(levelValue)}
            {levelValue.charAt(0).toUpperCase() + levelValue.slice(1)}
          </span>
        </div>
        <div className={getRequirementStyles(goalStatusValue, levelValue)}>
          <span className="flex items-center gap-1.5">
            {getRequirementIcon(goalStatusValue)}
            {goalStatusValue === 'required' ? 'Skill Goal' : 
             goalStatusValue === 'not_interested' ? 'Not Interested' : 
             'Unknown'}
          </span>
        </div>
      </div>
    </TableCell>
  );
};