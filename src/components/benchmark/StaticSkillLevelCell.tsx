import { TableCell } from "@/components/ui/table";
import { Star, Shield, Target, CircleDashed, Check, Heart } from "lucide-react";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";
import { useCompetencyStateReader } from "../skills/competency/CompetencyStateReader";

interface StaticSkillLevelCellProps {
  initialLevel: string;
  skillTitle: string;
  isRoleSkill?: boolean;
  roleLevel?: string;
}

export const StaticSkillLevelCell = ({ 
  initialLevel, 
  skillTitle,
  isRoleSkill = false,
  roleLevel = ''
}: StaticSkillLevelCellProps) => {
  const { currentStates } = useSkillsMatrixStore();
  const { getSkillCompetencyState } = useCompetencyStateReader();
  
  const currentState = currentStates[skillTitle] || {
    level: initialLevel.toLowerCase(),
    requirement: 'required'
  };

  const competencyState = getSkillCompetencyState(skillTitle, roleLevel.toLowerCase());
  const roleSkillLevel = competencyState?.level || 'unspecified';
  const roleSkillRequired = competencyState?.required || false;

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

  const getRequirementIcon = (requirement: string) => {
    switch (requirement.toLowerCase()) {
      case 'required':
        return <Check className="w-3.5 h-3.5" />;
      case 'not-interested':
        return <CircleDashed className="w-3.5 h-3.5" />;
      case 'unknown':
        return <CircleDashed className="w-3.5 h-3.5" />;
      default:
        return <Heart className="w-3.5 h-3.5" />;
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

  const level = isRoleSkill ? roleSkillLevel : currentState.level;
  const requirement = isRoleSkill ? (roleSkillRequired ? 'required' : 'preferred') : currentState.requirement;

  return (
    <TableCell className="border-r border-blue-200 p-0">
      <div className="flex flex-col items-center">
        <div className={`
          rounded-t-md px-3 py-2 text-sm font-medium w-full capitalize flex items-center justify-center min-h-[36px] text-[#1f2144]
          border-2 ${getBorderColorClass(level)}
        `}>
          <span className="flex items-center gap-2">
            {getLevelIcon(level)}
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </span>
        </div>
        <div className={`
          text-xs px-2 py-1.5 font-normal text-[#1f2144] w-full flex items-center justify-center gap-1.5 
          border-x-2 border-b-2 min-h-[32px] rounded-b-md bg-[#F9FAFB]
          ${getLowerBorderColorClass(level, requirement)}
        `}>
          <span className="flex items-center gap-1.5">
            {getRequirementIcon(requirement)}
            {requirement === 'required' ? 'Required' : 
             requirement === 'not-interested' ? 'Not Interested' : 
             requirement === 'unknown' ? 'Unknown' : 'Preferred'}
          </span>
        </div>
      </div>
    </TableCell>
  );
};