import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Star, Shield, Target, CircleDashed } from "lucide-react";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";
import { useRoleStore } from "./RoleBenchmark";
import { useTrack } from "../skills/context/TrackContext";
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

  const getSkillType = (skillTitle: string): string => {
    const universalSkill = getSkillByTitle(skillTitle);
    console.log('Getting skill type from universal database:', {
      skillTitle,
      foundSkill: universalSkill?.category
    });
    
    if (universalSkill) {
      return universalSkill.category.charAt(0).toUpperCase() + universalSkill.category.slice(1);
    }
    
    return 'Uncategorized';
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

  return (
    <TableRow className="group border-b border-gray-200">
      <TableCell className="font-medium border-r border-blue-200 py-2">{skill.title}</TableCell>
      <TableCell className="border-r border-blue-200 py-2">{skill.subcategory}</TableCell>
      <TableCell className="text-center border-r border-blue-200 py-2">
        <div className="flex justify-center">
          {isCompanySkill(skill.title) ? (
            <Badge variant="success">Company Skill</Badge>
          ) : (
            <Badge variant="secondary">External Skill</Badge>
          )}
        </div>
      </TableCell>
      <TableCell className="text-center border-r border-blue-200 py-2">
        {getSkillType(skill.title)}
      </TableCell>
      <TableCell className="text-center border-r border-blue-200 py-2">
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${getBorderColorClass(skill.level)}`}>
          {getLevelIcon(skill.level)}
          <span className="text-sm font-medium">
            {skill.level || 'Unspecified'}
          </span>
        </div>
      </TableCell>
      <TableCell className="text-center border-r border-blue-200 py-2">
        {skill.confidence === 'n/a' ? (
          <span className="text-gray-500 text-sm">n/a</span>
        ) : (
          <Badge variant={
            skill.confidence === 'high' ? 'success' :
            skill.confidence === 'medium' ? 'warning' :
            'destructive'
          }>
            {skill.confidence.charAt(0).toUpperCase() + skill.confidence.slice(1)}
          </Badge>
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
          <Badge variant="outline">R</Badge>
          <Badge variant="outline">E</Badge>
          <Badge variant="outline">M</Badge>
          <Badge variant="outline">S</Badge>
        </div>
      </TableCell>
    </TableRow>
  );
};