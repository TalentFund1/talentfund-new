import { Card } from "@/components/ui/card";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";
import { useCompetencyStateReader } from "../skills/competency/CompetencyStateReader";
import { useRoleStore } from "./RoleBenchmark";

const getLevelPriority = (level: string) => {
  const priorities: { [key: string]: number } = {
    'advanced': 3,
    'intermediate': 2,
    'beginner': 1,
    'unspecified': 0
  };
  return priorities[level.toLowerCase()] ?? 0;
};

export const CompetencyMatchSection = () => {
  const { currentStates } = useSkillsMatrixStore();
  const { getSkillCompetencyState } = useCompetencyStateReader();
  const { selectedLevel } = useRoleStore();

  const getMatchingSkills = () => {
    const matches: string[] = [];

    Object.entries(currentStates).forEach(([skillTitle, skillState]) => {
      const roleSkillState = getSkillCompetencyState(skillTitle, selectedLevel.toLowerCase());
      if (!roleSkillState) return;

      const employeeLevel = skillState.level.toLowerCase();
      const roleLevel = roleSkillState.level.toLowerCase();

      if (getLevelPriority(employeeLevel) >= getLevelPriority(roleLevel)) {
        matches.push(skillTitle);
      }
    });

    return matches;
  };

  const matchingSkills = getMatchingSkills();

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-foreground">Competency Match</h3>
          <p className="text-sm text-muted-foreground">
            {matchingSkills.length} skills match or exceed role requirements
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {matchingSkills.map((skill) => (
          <div
            key={skill}
            className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary-accent/10 text-primary-accent"
          >
            {skill}
          </div>
        ))}
      </div>
    </Card>
  );
};