import { SkillBadge } from "../skills/SkillBadge";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";
import { getEmployeeSkills } from "./skills-matrix/initialSkills";

interface SkillGoalSectionProps {
  employeeId: string;
}

export const SkillGoalSection = ({ employeeId }: SkillGoalSectionProps) => {
  const { currentStates } = useSkillsMatrixStore();
  const employeeSkills = getEmployeeSkills(employeeId);

  const skillGoals = employeeSkills.filter(skill => {
    const skillState = currentStates[skill.title];
    return skillState?.requirement === 'skill_goal';
  });

  if (skillGoals.length === 0) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-border bg-white p-6 w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Skill Goals</span>
          <span className="bg-[#8073ec]/10 text-[#1F2144] rounded-full px-2 py-0.5 text-xs font-medium">
            {skillGoals.length}
          </span>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {skillGoals.map((skill) => (
          <SkillBadge
            key={skill.title}
            skill={{ name: skill.title }}
            showLevel={true}
            level={currentStates[skill.title]?.level || skill.level}
            isSkillGoal={true}
          />
        ))}
      </div>
    </div>
  );
};