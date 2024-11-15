import { TableCell } from "@/components/ui/table";
import { Star, Shield, Target, Heart, CircleHelp, Check } from "lucide-react";

interface SkillLevelCellProps {
  initialLevel: string;
  skillTitle: string;
  onLevelChange?: (newLevel: string, requirement: string) => void;
  isReadOnly?: boolean;
}

export const SkillLevelCell = ({ initialLevel, skillTitle, isReadOnly = false }: SkillLevelCellProps) => {
  const getLevelIcon = (level: string) => {
    switch (level.toLowerCase()) {
      case 'advanced':
        return <Star className="w-4 h-4 text-primary-accent" />;
      case 'intermediate':
        return <Shield className="w-4 h-4 text-primary-icon" />;
      case 'beginner':
        return <Target className="w-4 h-4 text-[#008000]" />;
      default:
        return <CircleHelp className="w-4 h-4 text-gray-400" />;
    }
  };

  const getLevelStyles = (level: string) => {
    switch (level.toLowerCase()) {
      case 'advanced':
        return "border-2 border-primary-accent bg-primary-accent/10";
      case 'intermediate':
        return "border-2 border-primary-icon bg-primary-icon/10";
      case 'beginner':
        return "border-2 border-[#008000] bg-[#008000]/10";
      default:
        return "border-2 border-gray-400 bg-gray-100/50";
    }
  };

  const getRequirementStyles = (level: string) => {
    const borderColor = level.toLowerCase() === 'advanced' 
      ? 'border-primary-accent'
      : level.toLowerCase() === 'intermediate'
        ? 'border-primary-icon'
        : level.toLowerCase() === 'beginner'
          ? 'border-[#008000]'
          : 'border-gray-400';

    return `bg-gray-100/90 border-x-2 border-b-2 rounded-b-md ${borderColor}`;
  };

  return (
    <TableCell className="border-r border-blue-200 p-0">
      <div className="flex flex-col items-center">
        <div className={`${getLevelStyles(initialLevel)} rounded-t-md px-3 py-1.5 text-sm font-medium w-full capitalize flex items-center justify-center min-h-[36px] text-[#1f2144]`}>
          <span className="flex items-center gap-2 justify-center text-[15px]">
            {getLevelIcon(initialLevel)}
            {initialLevel.charAt(0).toUpperCase() + initialLevel.slice(1)}
          </span>
        </div>
        <div className={`${getRequirementStyles(initialLevel)} text-xs px-2 py-1 font-normal text-[#1f2144] w-full flex items-center justify-center gap-1.5 min-h-[32px]`}>
          <Check className="w-3.5 h-3.5" />
          <span>Skill Goal</span>
        </div>
      </div>
    </TableCell>
  );
};