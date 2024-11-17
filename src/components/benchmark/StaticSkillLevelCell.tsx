import { TableCell } from "@/components/ui/table";
import { Star, Shield, Target, CircleDashed, Check, Heart } from "lucide-react";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";

interface StaticSkillLevelCellProps {
  initialLevel: string;
  skillTitle: string;
}

export const StaticSkillLevelCell = ({ 
  initialLevel, 
  skillTitle,
}: StaticSkillLevelCellProps) => {
  const { currentStates } = useSkillsMatrixStore();
  const currentState = currentStates[skillTitle] || {
    level: initialLevel.toLowerCase(),
    requirement: 'required'
  };

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

  const getBorderColorClass = (level: string) => {
    switch (level.toLowerCase()) {
      case 'advanced':
        return 'border-primary-accent bg-primary-accent/10';
      case 'intermediate':
        return 'border-primary-icon bg-primary-icon/10';
      case 'beginner':
        return 'border-[#008000] bg-[#008000]/10';
      default:
        return 'border-gray-400 bg-gray-100/50';
    }
  };

  const getLowerBorderColorClass = (level: string, requirement: string) => {
    if (requirement.toLowerCase() !== 'required') {
      return 'border-[#e5e7eb]';
    }
    return getBorderColorClass(level).split(' ')[0];
  };

  return (
    <TableCell className="border-r border-blue-200 p-0">
      <div className="flex flex-col h-[74px]">
        <div className={`
          h-[37px] text-sm font-medium w-full capitalize flex items-center justify-center text-[#1f2144]
          border-2 rounded-t-xl ${getBorderColorClass(currentState.level)}
        `}>
          <span className="flex items-center gap-2.5">
            {getLevelIcon(currentState.level)}
            {currentState.level.charAt(0).toUpperCase() + currentState.level.slice(1)}
          </span>
        </div>
        <div className={`
          h-[37px] text-sm font-normal text-[#1f2144] w-full flex items-center justify-center gap-2 
          border-x-2 border-b-2 rounded-b-xl bg-[#F9FAFB]
          ${getLowerBorderColorClass(currentState.level, currentState.requirement)}
        `}>
          <span className="flex items-center gap-2">
            {currentState.requirement === 'required' ? <Check className="w-3.5 h-3.5" /> :
             currentState.requirement === 'not-interested' ? <CircleDashed className="w-3.5 h-3.5" /> :
             currentState.requirement === 'unknown' ? <CircleDashed className="w-3.5 h-3.5" /> :
             <Heart className="w-3.5 h-3.5" />}
            {currentState.requirement === 'required' ? 'Skill Goal' : 
             currentState.requirement === 'not-interested' ? 'Not Interested' : 
             currentState.requirement === 'unknown' ? 'Unknown' : 'Skill Goal'}
          </span>
        </div>
      </div>
    </TableCell>
  );
};