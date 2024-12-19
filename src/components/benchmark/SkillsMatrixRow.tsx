import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
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
}

export const SkillsMatrixRow = ({ skill }: SkillsMatrixRowProps) => {
  const { currentStates } = useSkillsMatrixStore();
  
  console.log('SkillsMatrixRow rendering:', {
    skillTitle: skill.title,
    category: skill.category
  });

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

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "specialized":
        return "bg-blue-100 text-blue-800";
      case "common":
        return "bg-green-100 text-green-800";
      case "certification":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <TableRow className="group border-b border-gray-200">
      <TableCell className="font-medium border-r border-blue-200 py-2">{skill.title}</TableCell>
      <TableCell className="border-r border-blue-200 py-2">{skill.subcategory}</TableCell>
      <TableCell className="text-center border-r border-blue-200 py-2">
        <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-sm font-medium ${
          getTypeColor(getSkillType(skill.title))
        }`}>
          {getSkillType(skill.title)}
        </span>
      </TableCell>
      <SkillLevelCell 
        initialLevel={skill.level || 'unspecified'}
        skillTitle={skill.title}
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
    </TableRow>
  );
};