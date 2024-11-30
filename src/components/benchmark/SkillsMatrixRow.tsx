import { TableCell, TableRow } from "@/components/ui/table";
import { Check, X, Star, Shield, Target, CircleDashed } from "lucide-react";
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
  
  const isCompanySkill = (skillTitle: string) => {
    const nonCompanySkills = ["MLflow", "Natural Language Understanding", "Kubernetes"];
    return !nonCompanySkills.includes(skillTitle);
  };

  const getBorderColorClass = (level?: string) => {
    if (!level) return 'border-gray-400 bg-gray-100/50';
    
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

  const getLowerBorderColorClass = (level?: string, required?: string) => {
    if (!required || required.toLowerCase() !== 'required') {
      return 'border-[#e5e7eb]';
    }
    return getBorderColorClass(level).split(' ')[0];
  };

  const getRoleSkillState = () => {
    const competencyState = getSkillCompetencyState(skill.title, selectedLevel.toLowerCase());
    if (!competencyState) return null;

    return {
      level: competencyState.level || 'unspecified',
      required: competencyState.required || 'preferred'
    };
  };

  const roleSkillState = getRoleSkillState();
  const currentSkillState = currentStates[skill.title];

  const getRequirementText = (requirement?: string) => {
    if (!requirement) return 'Unknown';
    
    const requirementMap: { [key: string]: string } = {
      'required': 'Required',
      'preferred': 'Preferred',
      'not_interested': 'Not Interested',
      'unknown': 'Unknown',
      'skill_goal': 'Skill Goal'
    };

    return requirementMap[requirement.toLowerCase()] || 'Unknown';
  };

  if (!roleSkillState) {
    console.warn(`No role skill state found for ${skill.title}`);
    return null;
  }

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
      {isRoleBenchmark && (
        <TableCell className="text-center border-r border-blue-200 py-2 p-0">
          <div className="flex flex-col items-center">
            <div className={`
              rounded-t-md px-3 py-2 text-sm font-medium w-full capitalize flex items-center justify-center min-h-[36px] text-[#1f2144]
              border-2 ${getBorderColorClass(roleSkillState.level)}
            `}>
              <span className="flex items-center gap-2">
                {roleSkillState.level === 'advanced' ? <Star className="w-3.5 h-3.5 text-primary-accent" /> :
                 roleSkillState.level === 'intermediate' ? <Shield className="w-3.5 h-3.5 text-primary-icon" /> :
                 roleSkillState.level === 'beginner' ? <Target className="w-3.5 h-3.5 text-[#008000]" /> :
                 <CircleDashed className="w-3.5 h-3.5 text-gray-400" />}
                {roleSkillState.level.charAt(0).toUpperCase() + roleSkillState.level.slice(1)}
              </span>
            </div>
            <div className={`
              text-xs px-2 py-1.5 font-normal text-[#1f2144] w-full flex items-center justify-center gap-1.5 
              border-x-2 border-b-2 min-h-[32px] rounded-b-md bg-[#F9FAFB]
              ${getLowerBorderColorClass(roleSkillState.level, roleSkillState.required)}
            `}>
              <span className="flex items-center gap-1.5">
                {roleSkillState.required === 'required' ? <Check className="w-3.5 h-3.5" /> :
                 roleSkillState.required === 'preferred' ? <CircleDashed className="w-3.5 h-3.5" /> :
                 <CircleDashed className="w-3.5 h-3.5" />}
                {getRequirementText(roleSkillState.required)}
              </span>
            </div>
          </div>
        </TableCell>
      )}
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