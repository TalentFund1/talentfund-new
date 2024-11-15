import { TableCell } from "@/components/ui/table";
import { Star, Shield, Target, CircleDashed, Heart, Check, X, CircleHelp } from "lucide-react";

interface ReadOnlySkillCellProps {
  level: string;
  requirement: string;
}

export const ReadOnlySkillCell = ({ level, requirement }: ReadOnlySkillCellProps) => {
  const getLevelIcon = (level: string) => {
    switch (level.toLowerCase()) {
      case 'advanced':
        return <Star className="w-4 h-4 text-primary-accent" />;
      case 'intermediate':
        return <Shield className="w-4 h-4 text-primary-icon" />;
      case 'beginner':
        return <Target className="w-4 h-4 text-[#008000]" />;
      default:
        return <CircleDashed className="w-4 h-4 text-gray-400" />;
    }
  };

  const getRequirementIcon = (requirement: string) => {
    switch (requirement.toLowerCase()) {
      case 'required':
        return <Heart className="w-3.5 h-3.5" />;
      case 'not-interested':
        return <X className="w-3.5 h-3.5" />;
      case 'unknown':
        return <CircleHelp className="w-3.5 h-3.5" />;
      default:
        return <Heart className="w-3.5 h-3.5" />;
    }
  };

  const getLevelStyles = (level: string) => {
    const baseStyles = 'rounded-t-md px-3 py-1.5 text-sm font-medium w-full capitalize flex items-center justify-center min-h-[28px] text-[#1f2144]';
    
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

    return `text-xs px-2 py-1.5 font-medium text-[#1f2144] w-full flex items-center justify-center gap-1.5 bg-gray-50/90 border-x-2 border-b-2 rounded-b-md ${borderColor}`;
  };

  return (
    <TableCell className="border-r border-blue-200 p-0">
      <div className="flex flex-col items-center">
        <div className={getLevelStyles(level)}>
          <span className="flex items-center gap-2 justify-center text-[15px]">
            {getLevelIcon(level)}
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </span>
        </div>
        <div className={getRequirementStyles(requirement, level)}>
          <span className="flex items-center gap-1.5 justify-center text-xs">
            {getRequirementIcon(requirement)}
            {requirement === 'required' ? 'Skill Goal' : 
             requirement === 'not-interested' ? 'Not Interested' : 
             requirement === 'unknown' ? 'Unknown' : 'Skill Goal'}
          </span>
        </div>
      </div>
    </TableCell>
  );
};