import { TableCell, TableRow } from "@/components/ui/table";
import { Check, X } from "lucide-react";
import { SkillLevelCell } from "./SkillLevelCell";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";

interface SkillsMatrixRowProps {
  skill: {
    title: string;
    subcategory: string;
    level: string;
    growth: string;
    confidence: string;
  };
  showCompanySkill?: boolean;
  isRoleBenchmark?: boolean;
}

export const SkillsMatrixRow = ({ skill, showCompanySkill = true, isRoleBenchmark = false }: SkillsMatrixRowProps) => {
  const { currentStates, setSkillState } = useSkillsMatrixStore();
  const currentState = currentStates[skill.title] || {
    level: skill.level,
    requirement: 'required'
  };

  const getConfidenceStyles = (confidence: string) => {
    switch (confidence) {
      case 'high':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-orange-100 text-orange-800';
      case 'low':
        return 'bg-red-100 text-red-800';
      default:
        return 'text-gray-500 text-sm';
    }
  };

  const isCompanySkill = (skillTitle: string) => {
    const nonCompanySkills = ["MLflow", "Natural Language Understanding", "Kubernetes"];
    return !nonCompanySkills.includes(skillTitle);
  };

  const handleLevelChange = (newLevel: string, requirement: string) => {
    setSkillState(skill.title, newLevel, requirement);
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
      <SkillLevelCell 
        initialLevel={currentState.level} 
        skillTitle={skill.title}
        onLevelChange={handleLevelChange}
        isRoleBenchmark={isRoleBenchmark}
      />
      <TableCell className="text-center border-r border-blue-200 py-2">
        {skill.confidence === 'n/a' ? (
          <span className="text-gray-500 text-sm">n/a</span>
        ) : (
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-sm ${getConfidenceStyles(skill.confidence)}`}>
            {skill.confidence.charAt(0).toUpperCase() + skill.confidence.slice(1)}
          </span>
        )}
      </TableCell>
      <TableCell className="text-center border-r border-blue-200 py-2">
        <span className={`inline-flex items-center justify-center gap-1 px-2.5 py-1 rounded-full text-sm ${
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