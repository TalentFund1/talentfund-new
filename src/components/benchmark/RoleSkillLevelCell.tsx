import { TableCell } from "@/components/ui/table";
import { Star, Shield, Target, CircleDashed, Check, Heart } from "lucide-react";
import { useCompetencyStore } from "./CompetencyState";
import { useEffect } from "react";

interface RoleSkillLevelCellProps {
  skillTitle: string;
  roleId: string;
  levelKey: string;
}

export const RoleSkillLevelCell = ({ 
  skillTitle,
  roleId,
  levelKey
}: RoleSkillLevelCellProps) => {
  const { currentStates } = useCompetencyStore();

  const skillState = currentStates[skillTitle]?.[levelKey] || {
    level: 'unspecified',
    required: 'preferred'
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

  const getBorderColorClass = (level: string) => {
    switch (level?.toLowerCase()) {
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
    if (requirement?.toLowerCase() !== 'required') {
      return 'border-[#e5e7eb]';
    }
    return getBorderColorClass(level).split(' ')[0];
  };

  console.log('RoleSkillLevelCell rendering:', {
    skillTitle,
    roleId,
    levelKey,
    currentState: skillState
  });

  return (
    <TableCell className="border-r border-blue-200 p-0">
      <div className="flex flex-col items-center">
        <div className={`
          rounded-t-md px-3 py-2 text-sm font-medium w-full capitalize flex items-center justify-center min-h-[36px] text-[#1f2144]
          border-2 ${getBorderColorClass(skillState.level)}
        `}>
          <span className="flex items-center gap-2">
            {getLevelIcon(skillState.level)}
            {(skillState.level || 'unspecified').charAt(0).toUpperCase() + (skillState.level || 'unspecified').slice(1)}
          </span>
        </div>
        <div className={`
          text-xs px-2 py-1.5 font-normal text-[#1f2144] w-full flex items-center justify-center gap-1.5 
          border-x-2 border-b-2 min-h-[32px] rounded-b-md bg-[#F9FAFB]
          ${getLowerBorderColorClass(skillState.level, skillState.required)}
        `}>
          <span className="flex items-center gap-1.5">
            {skillState.required === 'required' ? (
              <Check className="w-3.5 h-3.5" />
            ) : (
              <Heart className="w-3.5 h-3.5" />
            )}
            {skillState.required === 'required' ? 'Skill Goal' : 
             skillState.required === 'not-interested' ? 'Not Interested' : 
             skillState.required === 'unknown' ? 'Unknown' : 'Unknown'}
          </span>
        </div>
      </div>
    </TableCell>
  );
};