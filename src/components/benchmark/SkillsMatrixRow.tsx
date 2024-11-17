import { TableCell, TableRow } from "@/components/ui/table";
import { SkillLevelIcon } from "../skills/SkillLevelIcon";
import { Star, Shield, Target, CircleDashed, Check, Heart } from "lucide-react";
import { useCompetencyStateReader } from "../skills/competency/CompetencyStateReader";

interface SkillsMatrixRowProps {
  skill: {
    title: string;
    subcategory: string;
    level: string;
    growth: string;
    confidence: string;
    requirement?: string;
  };
  showCompanySkill?: boolean;
  isRoleBenchmark?: boolean;
}

export const SkillsMatrixRow = ({ 
  skill, 
  showCompanySkill = true,
  isRoleBenchmark = false
}: SkillsMatrixRowProps) => {
  const { getSkillCompetencyState } = useCompetencyStateReader();

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

  const getLevelBgColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'advanced':
        return 'bg-primary-accent/5';
      case 'intermediate':
        return 'bg-primary-icon/5';
      case 'beginner':
        return 'bg-[#008000]/5';
      default:
        return 'bg-gray-100/50';
    }
  };

  const getRoleSkillState = () => {
    const competencyState = getSkillCompetencyState(skill.title, "advanced");
    if (!competencyState) return null;

    return {
      level: competencyState.level,
      required: competencyState.required
    };
  };

  const roleSkillState = getRoleSkillState();

  const renderSkillCell = (level: string, requirement: string, isRoleSkill: boolean = false) => {
    return (
      <div className={`
        flex flex-col items-center p-2 rounded-lg ${getLevelBgColor(level)}
        ${isRoleSkill ? 'border-l-4' : 'border'} 
        ${level.toLowerCase() === 'advanced' 
          ? 'border-primary-accent' 
          : level.toLowerCase() === 'intermediate'
            ? 'border-primary-icon'
            : level.toLowerCase() === 'beginner'
              ? 'border-[#008000]'
              : 'border-gray-300'
        }
      `}>
        <div className="flex items-center gap-2 mb-1">
          {getLevelIcon(level)}
          <span className="text-sm font-medium capitalize">{level}</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-600">
          {requirement.toLowerCase() === 'required' ? (
            <Check className="w-3.5 h-3.5" />
          ) : (
            <Heart className="w-3.5 h-3.5" />
          )}
          <span className="capitalize">
            {requirement === 'required' ? 'Required' : 'Preferred'}
          </span>
        </div>
      </div>
    );
  };

  return (
    <TableRow className="group border-b border-gray-200">
      <TableCell className="font-medium border-r border-blue-200 py-2">{skill.title}</TableCell>
      <TableCell className="border-r border-blue-200 py-2">{skill.subcategory}</TableCell>
      {showCompanySkill && (
        <TableCell className="text-center border-r border-blue-200 py-2">
          <div className="flex justify-center">
            {skill.requirement === 'required' ? (
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="w-5 h-5 text-green-600 stroke-[2.5]" />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                <Heart className="w-5 h-5 text-red-600 stroke-[2.5]" />
              </div>
            )}
          </div>
        </TableCell>
      )}
      {isRoleBenchmark && roleSkillState && (
        <TableCell className="text-center border-r border-blue-200 py-2">
          {renderSkillCell(roleSkillState.level, roleSkillState.required, true)}
        </TableCell>
      )}
      <TableCell className="text-center border-r border-blue-200 py-2">
        {renderSkillCell(skill.level || 'unspecified', skill.requirement || 'preferred')}
      </TableCell>
      <TableCell className="text-center border-r border-blue-200 py-2">
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-sm ${
          skill.confidence === 'high' ? 'bg-green-100 text-green-800' :
          skill.confidence === 'medium' ? 'bg-orange-100 text-orange-800' :
          'bg-red-100 text-red-800'
        }`}>
          {skill.confidence.charAt(0).toUpperCase() + skill.confidence.slice(1)}
        </span>
      </TableCell>
      <TableCell className="text-center border-r border-blue-200 py-2">
        <span className={`inline-flex items-center justify-center gap-1 px-2.5 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
          skill.growth === "0%" ? 'bg-gray-100 text-gray-800' : 'bg-green-100 text-green-800'
        }`}>
          ↗ {skill.growth}
        </span>
      </TableCell>
      <TableCell className="text-center py-2">
        <div className="flex items-center justify-center space-x-1">
          <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-sm font-medium">R</span>
          <span className="w-6 h-6 rounded-full bg-green-100 text-green-800 flex items-center justify-center text-sm font-medium">E</span>
          <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-800 flex items-center justify-center text-sm font-medium">M</span>
          <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center text-sm font-medium">S</span>
        </div>
      </TableCell>
    </TableRow>
  );
};