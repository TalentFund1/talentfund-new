import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import { SkillLevelCell } from "./SkillLevelCell";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";
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

  const getConfidenceBadgeVariant = (confidence: string) => {
    switch (confidence.toLowerCase()) {
      case 'high':
        return 'outline';
      case 'medium':
        return 'secondary';
      case 'low':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getGrowthBadgeVariant = (growth: string) => {
    if (growth === "0%") return "outline";
    return "secondary";
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
      <TableCell className="text-center border-r border-blue-200 py-2">
        {getSkillType(skill.title)}
      </TableCell>
      <SkillLevelCell 
        initialLevel={skill.level || 'unspecified'}
        skillTitle={skill.title}
        isRoleBenchmark={isRoleBenchmark}
      />
      <TableCell className="text-center border-r border-blue-200 py-2">
        {skill.confidence === 'n/a' ? (
          <span className="text-gray-500 text-sm">n/a</span>
        ) : (
          <Badge variant={getConfidenceBadgeVariant(skill.confidence)} className="capitalize">
            {skill.confidence}
          </Badge>
        )}
      </TableCell>
      <TableCell className="text-center border-r border-blue-200 py-2">
        <Badge variant={getGrowthBadgeVariant(skill.growth)}>
          ↗ {skill.growth}
        </Badge>
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