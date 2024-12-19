import { TableCell } from "@/components/ui/table";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";
import { useParams } from "react-router-dom";
import { Star, Shield, Target, CircleDashed, Check } from "lucide-react";

interface StaticSkillLevelCellProps {
  initialLevel: string;
  skillTitle: string;
}

export const StaticSkillLevelCell = ({ 
  initialLevel,
  skillTitle 
}: StaticSkillLevelCellProps) => {
  const { currentStates } = useSkillsMatrixStore();
  const { id: employeeId } = useParams<{ id: string }>();

  const currentState = currentStates[employeeId || ""]?.[skillTitle] || {
    level: initialLevel || "unspecified",
    requirement: "preferred"
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

  const getLowerBorderColorClass = (level: string, required: string) => {
    if (required.toLowerCase() !== 'required') {
      return 'border-[#e5e7eb]';
    }
    return getBorderColorClass(level).split(' ')[0];
  };

  return (
    <TableCell className="text-center border-r border-blue-200 py-2 p-0">
      <div className="flex flex-col items-center">
        <div className={`
          rounded-t-md px-3 py-2 text-sm font-medium w-full capitalize flex items-center justify-center min-h-[36px] text-[#1f2144]
          border-2 ${getBorderColorClass(currentState.level)}
        `}>
          <span className="flex items-center gap-2">
            {currentState.level === 'advanced' ? <Star className="w-3.5 h-3.5 text-primary-accent" /> :
             currentState.level === 'intermediate' ? <Shield className="w-3.5 h-3.5 text-primary-icon" /> :
             currentState.level === 'beginner' ? <Target className="w-3.5 h-3.5 text-[#008000]" /> :
             <CircleDashed className="w-3.5 h-3.5 text-gray-400" />}
            {currentState.level.charAt(0).toUpperCase() + currentState.level.slice(1)}
          </span>
        </div>
        <div className={`
          text-xs px-2 py-1.5 font-normal text-[#1f2144] w-full flex items-center justify-center gap-1.5 
          border-x-2 border-b-2 min-h-[32px] rounded-b-md bg-[#F9FAFB]
          ${getLowerBorderColorClass(currentState.level, currentState.requirement)}
        `}>
          <span className="flex items-center gap-1.5">
            {currentState.requirement === 'required' ? <Check className="w-3.5 h-3.5" /> :
             <CircleDashed className="w-3.5 h-3.5" />}
            {currentState.requirement === 'required' ? 'Required' : 'Preferred'}
          </span>
        </div>
      </div>
    </TableCell>
  );
};