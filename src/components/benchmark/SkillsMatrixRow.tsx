import { TableRow, TableCell } from "@/components/ui/table";
import { SkillCell } from "./SkillCell";
import { SkillLevelCell } from "./SkillLevelCell";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";
import { useCompetencyStateReader } from "../skills/competency/CompetencyStateReader";
import { getSkillCategory } from "../skills/data/skills/categories/skillCategories";

interface SkillsMatrixRowProps {
  skill: {
    title: string;
    level?: string;
    requirement?: string;
  };
  isRoleBenchmark: boolean;
}

export const SkillsMatrixRow = ({ skill, isRoleBenchmark }: SkillsMatrixRowProps) => {
  const { currentStates } = useSkillsMatrixStore();
  const { getSkillCompetencyState } = useCompetencyStateReader();
  const category = getSkillCategory(skill.title);

  console.log('SkillsMatrixRow rendering:', {
    skillTitle: skill.title,
    category,
    isRoleBenchmark
  });

  // Only get role skill state if this is a role benchmark
  const getRoleSkillState = () => {
    if (!isRoleBenchmark) return null;
    return getSkillCompetencyState(skill.title);
  };

  const skillState = currentStates[skill.title] || {
    level: skill.level || 'unspecified',
    requirement: skill.requirement || 'unknown'
  };

  const roleSkillState = getRoleSkillState();

  return (
    <TableRow className="group">
      <SkillCell 
        title={skill.title}
        category={category}
      />
      <TableCell className="w-[200px] text-sm text-muted-foreground">
        {category}
      </TableCell>
      <SkillLevelCell
        skillTitle={skill.title}
        currentLevel={skillState.level}
        roleLevel={isRoleBenchmark ? roleSkillState?.level : undefined}
        isRoleBenchmark={isRoleBenchmark}
      />
    </TableRow>
  );
};