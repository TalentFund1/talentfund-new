import { TableCell } from "@/components/ui/table";
import { Star, Shield, Target, CircleDashed, X, Heart } from "lucide-react";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";

interface StaticSkillLevelCellProps {
  initialLevel: string;
  skillTitle: string;
  employeeId: string;
}

export const StaticSkillLevelCell = ({ 
  initialLevel, 
  skillTitle,
  employeeId
}: StaticSkillLevelCellProps) => {
  const { getSkillState } = useSkillsMatrixStore();

  console.log('Rendering StaticSkillLevelCell:', {
    skillTitle,
    initialLevel,
    employeeId
  });

  const skillState = getSkillState(skillTitle, employeeId);

  const getLevelIcon = (level: string = 'unspecified') => {
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

  const getRequirementIcon = (goalStatus: string = 'unknown') => {
    switch (goalStatus?.toLowerCase()) {
      case 'required':
        return <Heart className="w-3.5 h-3.5" />;
      case 'not_interested':
        return <X className="w-3.5 h-3.5" />;
      default:
        return <CircleDashed className="w-3.5 h-3.5" />;
    }
  };

  const getLevelStyles = (level: string = 'unspecified') => {
    const baseStyles = 'rounded-t-md px-3 py-2 text-sm font-medium w-full capitalize flex items-center justify-center min-h-[36px] text-[#1f2144]';
    
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

  const getRequirementStyles = (goalStatus: string = 'unknown', level: string = 'unspecified') => {
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

  return (
    <TableCell className="border-r border-blue-200 p-0">
      <div className="flex flex-col items-center">
        <div className={getLevelStyles(skillState?.level)}>
          <span className="flex items-center gap-2">
            {getLevelIcon(skillState?.level)}
            {(skillState?.level || 'unspecified').charAt(0).toUpperCase() + (skillState?.level || 'unspecified').slice(1)}
          </span>
        </div>
        <div className={getRequirementStyles(skillState?.goalStatus, skillState?.level)}>
          <span className="flex items-center gap-1.5">
            {getRequirementIcon(skillState?.goalStatus)}
            {skillState?.goalStatus === 'required' ? 'Skill Goal' : 
             skillState?.goalStatus === 'not_interested' ? 'Not Interested' : 
             'Unknown'}
          </span>
        </div>
      </div>
    </TableCell>
  );
};