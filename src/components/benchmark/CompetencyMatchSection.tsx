import { SkillBadge } from "../skills/SkillBadge";
import { Card } from "../ui/card";
import { useCompetencyStateReader } from "../skills/competency/CompetencyStateReader";
import { useRoleStore } from "./RoleBenchmark";

interface CompetencyMatchSectionProps {
  skills: Array<{
    title: string;
    subcategory: string;
    level: string;
  }>;
}

const getLevelPriority = (level: string): number => {
  const priorities: { [key: string]: number } = {
    'advanced': 3,
    'intermediate': 2,
    'beginner': 1,
    'unspecified': 0
  };
  return priorities[level.toLowerCase()] ?? 0;
};

export const CompetencyMatchSection = ({ skills }: CompetencyMatchSectionProps) => {
  const { selectedLevel } = useRoleStore();
  const { getSkillCompetencyState } = useCompetencyStateReader();

  const matchingSkills = skills.filter(skill => {
    const competencyState = getSkillCompetencyState(skill.title, selectedLevel.toLowerCase());
    if (!competencyState) return false;

    const roleSkillPriority = getLevelPriority(skill.level);
    const experiencePriority = getLevelPriority(competencyState.level);

    return experiencePriority >= roleSkillPriority && roleSkillPriority > 0;
  });

  if (matchingSkills.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium">Competency Match</h3>
          <span className="bg-[#8073ec]/10 text-[#1F2144] rounded-full px-2 py-0.5 text-xs font-medium">
            {matchingSkills.length}
          </span>
        </div>
      </div>

      <Card className="p-4 bg-white border-border">
        <div className="flex flex-wrap gap-2">
          {matchingSkills.map((skill) => (
            <SkillBadge
              key={skill.title}
              skill={{
                name: skill.title,
                level: skill.level,
                isSkillGoal: false
              }}
              showLevel={false}
            />
          ))}
        </div>
      </Card>
    </div>
  );
};