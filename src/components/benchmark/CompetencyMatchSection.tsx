import { Card } from "@/components/ui/card";
import { useCompetencyStateReader } from "../skills/competency/CompetencyStateReader";
import { useRoleStore } from "./RoleBenchmark";
import { roleSkills } from "../skills/data/roleSkills";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";

export const CompetencyMatchSection = () => {
  const { selectedRole, selectedLevel } = useRoleStore();
  const { getSkillCompetencyState } = useCompetencyStateReader();
  const { toggledSkills } = useToggledSkills();

  const currentRoleSkills = roleSkills[selectedRole as keyof typeof roleSkills] || roleSkills["123"];
  
  const getLevelPriority = (level: string) => {
    const priorities: { [key: string]: number } = {
      'advanced': 3,
      'intermediate': 2,
      'beginner': 1,
      'unspecified': 0
    };
    return priorities[level.toLowerCase()] ?? 0;
  };

  const matchingSkills = [
    ...currentRoleSkills.specialized,
    ...currentRoleSkills.common,
    ...currentRoleSkills.certifications
  ].filter(skill => {
    if (!toggledSkills.has(skill.title)) {
      return false;
    }

    const competencyState = getSkillCompetencyState(skill.title, selectedLevel.toLowerCase());
    if (!competencyState) {
      return false;
    }

    const employeeLevel = competencyState.level.toLowerCase();
    const roleLevel = skill.level.toLowerCase();

    return getLevelPriority(employeeLevel) >= getLevelPriority(roleLevel);
  });

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-foreground">Competency Match</h3>
          <span className="bg-[#8073ec]/10 text-[#1F2144] rounded-full px-2 py-0.5 text-xs font-medium">
            {matchingSkills.length}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {matchingSkills.map((skill) => (
          <div
            key={skill.title}
            className="flex items-center gap-2 px-3 py-1.5 bg-white border border-[#CCDBFF] rounded-full text-sm"
          >
            <span>{skill.title}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};