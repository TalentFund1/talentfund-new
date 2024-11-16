import { TableCell } from "@/components/ui/table";
import { Star, Shield, Target, Heart, CircleDashed, Check, X } from "lucide-react";
import { useSkillLevelState } from "./skill-level/SkillLevelState";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";

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
  const { currentStates } = useSkillsMatrixStore();
  const currentState = currentStates[skillTitle] || {
    level: initialLevel.toLowerCase(),
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
    const baseStyles = 'rounded-t-md px-3 py-2 text-sm font-medium w-full capitalize flex items-center justify-center min-h-[36px] text-[#1f2144]';
    
    switch (level.toLowerCase()) {
      case 'advanced':
        return `${baseStyles} bg-primary-accent/10 border-2 border-primary-accent`;
      case 'intermediate':
        return `${baseStyles} bg-primary-icon/10 border-2 border-primary-icon`;
      case 'beginner':
        return `${baseStyles} bg-[#008000]/10 border-2 border-[#008000]`;
      default:
        return `${baseStyles} bg-gray-100/50 border-2 border-gray-400`;
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

    return `text-xs px-2 py-1.5 font-normal text-[#1f2144] w-full flex items-center justify-center gap-1.5 border-x-2 border-b-2 min-h-[32px] rounded-b-md ${borderColor} bg-gray-100/90`;
  };

  return (
    <TableCell className="border-r border-blue-200 p-0">
      <div className="flex flex-col items-center">
        <div className={getLevelStyles(currentState.level)}>
          <span className="flex items-center gap-2">
            {getLevelIcon(currentState.level)}
            {currentState.level.charAt(0).toUpperCase() + currentState.level.slice(1)}
          </span>
        </div>

        <div className={getRequirementStyles(currentState.requirement, currentState.level)}>
          <span className="flex items-center gap-2 justify-center">
            {currentState.requirement === 'required' ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Skill Goal</span>
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