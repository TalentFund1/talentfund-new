import { TableCell, TableRow } from "@/components/ui/table";
import { Check, X } from "lucide-react";
import { SkillLevelCell } from "./SkillLevelCell";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";
import { useRoleStore } from "./RoleBenchmark";
import { useTrack } from "../skills/context/TrackContext";
import { Star, Shield, Target, CircleDashed } from "lucide-react";
import { useCompetencyStateReader } from "../skills/competency/CompetencyStateReader";
import { getSkillByTitle } from "../skills/data/skills/allSkills";

interface SkillsMatrixRowProps {
  skill: {
    title: string;
    subcategory: string;
    level: string;
    growth: string;
    confidence: string;
    requirement?: string;
    category?: string;
  };
  isRoleBenchmark: boolean;
}

export const SkillsMatrixRow = ({ 
  skill, 
  isRoleBenchmark
}: SkillsMatrixRowProps) => {
  const { currentStates } = useSkillsMatrixStore();
  const { selectedRole } = useRoleStore();
  const { getTrackForRole } = useTrack();
  const { getSkillCompetencyState } = useCompetencyStateReader();
  
  console.log('SkillsMatrixRow rendering:', {
    skillTitle: skill.title,
    category: skill.category,
    isRoleBenchmark
  });

  const isCompanySkill = (skillTitle: string) => {
    const nonCompanySkills = ["MLflow", "Natural Language Understanding", "Kubernetes"];
    return !nonCompanySkills.includes(skillTitle);
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

  return (
    <TableRow className="group border-b border-gray-200">
      <TableCell className="font-medium border-r border-blue-200 py-2">{skill.title}</TableCell>
      <TableCell className="border-r border-blue-200 py-2">{skill.subcategory}</TableCell>
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
      {isRoleBenchmark && (
        <SkillLevelCell 
          initialLevel={skill.level || 'unspecified'}
          skillTitle={skill.title}
          isRoleBenchmark={true}
        />
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