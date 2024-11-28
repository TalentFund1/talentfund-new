import { TableCell } from "@/components/ui/table";
import { Star, Shield, Target, CircleDashed, Check, Heart } from "lucide-react";
import { useEffect } from "react";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";

interface StaticSkillLevelCellProps {
  initialLevel: string;
  skillTitle: string;
}

export const StaticSkillLevelCell = ({ 
  initialLevel,
  skillTitle 
}: StaticSkillLevelCellProps) => {
  const { currentStates, initializeState } = useSkillsMatrixStore();

  useEffect(() => {
    if (!currentStates[skillTitle]) {
      initializeState(skillTitle, initialLevel || 'unspecified', 'required');
    }
  }, [skillTitle, currentStates, initializeState, initialLevel]);

  const currentState = currentStates[skillTitle] || {
    level: initialLevel || 'unspecified',
    requirement: 'required'
  };

  const getLevelIcon = (level: string) => {
    switch (level.toLowerCase()) {
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

  const getLevelStyles = (level: string) => {
    const baseStyles = 'rounded-t-md px-3 py-1.5 text-sm font-medium w-full capitalize flex items-center justify-center min-h-[26px] text-[#1f2144]';

    switch (level.toLowerCase()) {
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

  const getRequirementStyles = (requirement: string, level: string) => {
    const borderColor = level.toLowerCase() === 'advanced' 
      ? 'border-primary-accent'
      : level.toLowerCase() === 'intermediate'
        ? 'border-primary-icon'
        : level.toLowerCase() === 'beginner'
          ? 'border-[#008000]'
          : 'border-gray-400';

    const baseStyles = 'text-xs px-2 py-1.5 font-medium text-[#1f2144] w-full flex items-center justify-center gap-1.5';
    
    switch (requirement.toLowerCase()) {
      case 'required':
        return `${baseStyles} bg-gray-100/90 border-x-2 border-b-2 rounded-b-md ${borderColor}`;
      default:
        return `${baseStyles} bg-gray-50/90 border-x-2 border-b-2 rounded-b-md border-gray-300`;
    }
  };

  return (
    <TableCell className="border-r border-blue-200 p-0">
      <div className="flex flex-col items-center">
        <div className={getLevelStyles(currentState.level)}>
          <span className="flex items-center gap-2 justify-center text-[15px]">
            {getLevelIcon(currentState.level)}
            {currentState.level.charAt(0).toUpperCase() + currentState.level.slice(1)}
          </span>
        </div>
        <div className={getRequirementStyles(currentState.requirement, currentState.level)}>
          <span className="flex items-center gap-2 justify-center">
            {currentState.requirement === 'required' ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Required</span>
              </>
            ) : (
              <>
                <Heart className="w-3.5 h-3.5" />
                <span>Preferred</span>
              </>
            )}
          </span>
        </div>
      </div>
    </TableCell>
  );
};