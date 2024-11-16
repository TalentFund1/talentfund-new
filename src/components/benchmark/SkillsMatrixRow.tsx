import { TableCell, TableRow } from "@/components/ui/table";
import { Check, X, Star, Shield, Target, CircleDashed } from "lucide-react";
import { SkillLevelCell } from "./SkillLevelCell";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";
import { useRoleStore } from "./RoleBenchmark";
import { useTrack } from "../skills/context/TrackContext";
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
  const { currentStates } = useSkillsMatrixStore();
  const { selectedLevel } = useRoleStore();
  const { getTrackForRole } = useTrack();
  const { getSkillCompetencyState } = useCompetencyStateReader();
  const track = getTrackForRole("123")?.toLowerCase() as 'professional' | 'managerial';
  
  const isCompanySkill = (skillTitle: string) => {
    const nonCompanySkills = ["MLflow", "Natural Language Understanding", "Kubernetes"];
    return !nonCompanySkills.includes(skillTitle);
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

  const getRoleSkillState = () => {
    const competencyState = getSkillCompetencyState(skill.title, selectedLevel.toLowerCase());
    if (!competencyState) return null;

    return {
      level: competencyState.level,
      required: competencyState.required
    };
  };

  const roleSkillState = getRoleSkillState();

  const getLevelStyles = (level: string) => {
    const baseStyles = 'rounded-md px-3 py-1.5 text-sm font-medium w-full capitalize flex items-center justify-center min-h-[36px] text-[#1f2144]';
    
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

  const getRequirementStyles = (requirement: string) => {
    return 'text-xs px-2 py-1 font-normal text-[#1f2144] w-full flex items-center justify-center gap-1.5 bg-gray-50 rounded-md mt-1';
  };

  return (
    <TableRow className="group border-b border-gray-200">
      <TableCell className="font-medium border-r border-blue-200 py-2">{skill.title}</TableCell>
      <TableCell className="border-r border-blue-200 py-2">{skill.subcategory}</TableCell>
      {showCompanySkill && (
        <TableCell className="text-center border-r border-blue-200 py-2">
          <div className="flex justify-center">
            {isCompanySkill(skill.title) ? (
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="w-5 h-5 text-green-600 stroke-[2.5]" />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                <X className="w-5 h-5 text-red-600 stroke-[2.5]" />
              </div>
            )}
          </div>
        </TableCell>
      )}
      {isRoleBenchmark && roleSkillState && (
        <TableCell className="text-center border-r border-blue-200 py-2">
          <div className="flex flex-col items-center">
            <div className={getLevelStyles(roleSkillState.level)}>
              <span className="flex items-center gap-2">
                {getLevelIcon(roleSkillState.level)}
                {roleSkillState.level}
              </span>
            </div>
            <div className={getRequirementStyles(roleSkillState.required)}>
              <Check className="w-3.5 h-3.5" />
              <span>Skill Goal</span>
            </div>
          </div>
        </TableCell>
      )}
      <SkillLevelCell 
        initialLevel={skill.level || 'unspecified'}
        skillTitle={skill.title}
      />
      <TableCell className="text-center border-r border-blue-200 py-2">
        {skill.confidence === 'n/a' ? (
          <span className="text-gray-500 text-sm">n/a</span>
        ) : (
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-sm ${
            skill.confidence === 'high' ? 'bg-green-100 text-green-800' :
            skill.confidence === 'medium' ? 'bg-orange-100 text-orange-800' :
            'bg-red-100 text-red-800'
          }`}>
            {skill.confidence.charAt(0).toUpperCase() + skill.confidence.slice(1)}
          </span>
        )}
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