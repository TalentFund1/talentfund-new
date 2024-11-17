import { TableCell, TableRow } from "@/components/ui/table";
import { Star, Shield, Target, CircleDashed, Check, X, Heart } from "lucide-react";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";
import { useCompetencyStateReader } from "../skills/competency/CompetencyStateReader";
import { useRoleStore } from "./RoleBenchmark";

interface SkillsMatrixRowProps {
  skill: {
    title: string;
    subcategory: string;
    level: string;
    growth: string;
    confidence: string;
  };
  isEven?: boolean;
  showCompanySkill?: boolean;
  isRoleBenchmark?: boolean;
}

export const SkillsMatrixRow = ({ 
  skill, 
  isEven = false, 
  showCompanySkill = true,
  isRoleBenchmark = false 
}: SkillsMatrixRowProps) => {
  const { currentStates } = useSkillsMatrixStore();
  const { selectedLevel } = useRoleStore();
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
        return 'bg-primary-accent/10 border-primary-accent';
      case 'intermediate':
        return 'bg-primary-icon/10 border-primary-icon';
      case 'beginner':
        return 'bg-[#008000]/10 border-[#008000]';
      default:
        return 'bg-gray-100/50 border-gray-300';
    }
  };

  const getRequirementIcon = (requirement: string) => {
    switch (requirement.toLowerCase()) {
      case 'required':
      case 'skill_goal':
        return <Heart className="w-3.5 h-3.5 text-red-500" />;
      case 'not-interested':
        return <X className="w-3.5 h-3.5" />;
      default:
        return <CircleDashed className="w-3.5 h-3.5" />;
    }
  };

  const competencyState = getSkillCompetencyState(skill.title, selectedLevel.toLowerCase());
  const roleSkillLevel = competencyState?.level || 'unspecified';
  const roleSkillRequired = competencyState?.required || 'preferred';

  const currentState = currentStates[skill.title] || {
    level: skill.level || 'unspecified',
    requirement: 'preferred'
  };

  const isSkillGoal = currentState.requirement === 'required' || 
                      currentState.requirement === 'skill_goal';

  return (
    <TableRow className={`group transition-all duration-200 hover:bg-muted/50 ${isEven ? 'bg-muted/5' : ''}`}>
      <TableCell className="font-medium border-x border-blue-200/60 group-hover:bg-transparent py-4">
        <div className="flex items-center gap-2">
          {skill.title}
          {isSkillGoal && (
            <Heart className="w-4 h-4 text-red-500 animate-pulse" />
          )}
        </div>
      </TableCell>
      <TableCell className="border-r border-blue-200/60 group-hover:bg-transparent py-4 text-muted-foreground">
        {skill.subcategory}
      </TableCell>
      {isRoleBenchmark && (
        <TableCell className="border-r border-blue-200/60 p-2">
          <div className={`rounded-lg border-2 ${getLevelBgColor(roleSkillLevel)} p-3 transition-all duration-200`}>
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-2">
                {getLevelIcon(roleSkillLevel)}
                <span className="text-sm font-medium capitalize">{roleSkillLevel}</span>
              </div>
              <div className="text-xs text-gray-600 flex items-center gap-1">
                {getRequirementIcon(roleSkillRequired)}
                <span className="capitalize">
                  {roleSkillRequired === 'required' ? 'Required' : 'Preferred'}
                </span>
              </div>
            </div>
          </div>
        </TableCell>
      )}
      <TableCell className="border-r border-blue-200/60 p-2">
        <div className={`rounded-lg border-2 ${getLevelBgColor(currentState.level)} p-3 transition-all duration-200 ${
          isSkillGoal ? 'ring-2 ring-red-200 ring-offset-2' : ''
        }`}>
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              {getLevelIcon(currentState.level)}
              <span className="text-sm font-medium capitalize">{currentState.level}</span>
            </div>
            <div className="text-xs text-gray-600 flex items-center gap-1">
              {getRequirementIcon(currentState.requirement)}
              <span className="capitalize">
                {currentState.requirement === 'required' ? 'Skill Goal' : 
                 currentState.requirement === 'not-interested' ? 'Not Interested' : 'Unknown'}
              </span>
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell className="text-center border-r border-blue-200/60 py-4">
        <span className={`inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
          skill.growth === "0%" ? 'bg-gray-100 text-gray-800' : 'bg-green-100 text-green-800'
        }`}>
          ↗ {skill.growth}
        </span>
      </TableCell>
      <TableCell className="text-center py-4">
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