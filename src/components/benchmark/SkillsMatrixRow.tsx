import { TableCell, TableRow } from "@/components/ui/table";
import { Check, X } from "lucide-react";
import { useRoleStore } from "./RoleBenchmark";
import { useTrack } from "../skills/context/TrackContext";
import { Badge } from "@/components/ui/badge";
import { Star, Shield, Target, CircleDashed } from "lucide-react";
import { useCompetencyStateReader } from "../skills/competency/CompetencyStateReader";
import { isSpecializedSkill, isCommonSkill, isCertificationSkill } from "../skills/competency/skillCategoryUtils";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";

interface Skill {
  title: string;
  subcategory: string;
  level: string;
  growth: string;
  confidence: string;
  requirement?: string;
}

interface SkillsMatrixRowProps {
  skill: Skill;
  showCompanySkill?: boolean;
  isRoleBenchmark?: boolean;
}

export const SkillsMatrixRow = ({ 
  skill, 
  showCompanySkill = true,
  isRoleBenchmark = false
}: SkillsMatrixRowProps) => {
  const { selectedRole } = useRoleStore();
  const { getTrackForRole } = useTrack();
  const { getSkillCompetencyState } = useCompetencyStateReader();
  const { toggledSkills } = useToggledSkills();

  const track = getTrackForRole(selectedRole);

  const shouldShowCompanyCheck = (skillTitle: string) => {
    return toggledSkills.has(skillTitle);
  };

  const getSkillType = () => {
    if (isSpecializedSkill(skill.title)) {
      return { text: "Specialized", classes: "bg-blue-100 text-blue-800" };
    }
    if (isCommonSkill(skill.title)) {
      return { text: "Common", classes: "bg-green-100 text-green-800" };
    }
    if (isCertificationSkill(skill.title)) {
      return { text: "Certification", classes: "bg-purple-100 text-purple-800" };
    }
    return { text: "Uncategorized", classes: "bg-gray-100 text-gray-800" };
  };

  const skillType = getSkillType();

  return (
    <TableRow className="group border-b border-gray-200">
      <TableCell className="font-medium border-r border-blue-200 py-2">{skill.title}</TableCell>
      <TableCell className="border-r border-blue-200 py-2">{skill.subcategory}</TableCell>
      <TableCell className="border-r border-blue-200 py-2">
        <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-sm font-medium ${skillType.classes}`}>
          {skillType.text}
        </span>
      </TableCell>
      {showCompanySkill && (
        <TableCell className="text-center border-r border-blue-200 py-2">
          <div className="flex justify-center">
            {shouldShowCompanyCheck(skill.title) ? (
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="w-5 h-5 text-green-600 stroke-[2.5]" />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
                <X className="w-4 h-4 text-gray-400" />
              </div>
            )}
          </div>
        </TableCell>
      )}
      {isRoleBenchmark ? (
        <TableCell className="text-center border-r border-blue-200 py-2">
          <div className="flex justify-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              skill.level === 'advanced' ? 'bg-primary-accent/10' :
              skill.level === 'intermediate' ? 'bg-primary-icon/10' :
              skill.level === 'beginner' ? 'bg-[#008000]/10' :
              'bg-gray-100'
            }`}>
              {skill.level === 'advanced' ? <Star className="w-4 h-4 text-primary-accent" /> :
               skill.level === 'intermediate' ? <Shield className="w-4 h-4 text-primary-icon" /> :
               skill.level === 'beginner' ? <Target className="w-4 h-4 text-[#008000]" /> :
               <CircleDashed className="w-4 h-4 text-gray-400" />}
            </div>
          </div>
        </TableCell>
      ) : (
        <TableCell className="text-center border-r border-blue-200 py-2">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-sm ${
            skill.confidence === 'high' ? 'bg-green-100 text-green-800' :
            skill.confidence === 'medium' ? 'bg-orange-100 text-orange-800' :
            'bg-red-100 text-red-800'
          }`}>
            {skill.confidence.charAt(0).toUpperCase() + skill.confidence.slice(1)}
          </span>
        </TableCell>
      )}
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