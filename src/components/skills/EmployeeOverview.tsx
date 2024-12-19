import { Card } from "@/components/ui/card";
import { useParams } from "react-router-dom";
import { useSkillsMatrixStore } from "../benchmark/skills-matrix/SkillsMatrixState";
import { useToggledSkills } from "./context/ToggledSkillsContext";
import { calculateBenchmarkPercentage } from "../employee/BenchmarkCalculator";
import { ToggledSkillsProvider } from "./context/ToggledSkillsContext";
import { CompetencyMatchSection } from "../benchmark/CompetencyMatchSection";
import { MissingSkills } from "../benchmark/MissingSkills";
import { SkillGoalSection } from "../benchmark/SkillGoalSection";
import { getEmployeeSkills } from "../benchmark/skills-matrix/initialSkills";
import { roleSkills } from "./data/roleSkills";
import { useRoleStore } from "../benchmark/RoleBenchmark";
import { useCompetencyStateReader } from "./competency/CompetencyStateReader";

const EmployeeOverviewContent = () => {
  const { id } = useParams<{ id: string }>();
  const { currentStates } = useSkillsMatrixStore();
  const { toggledSkills } = useToggledSkills();
  const { selectedRole, selectedLevel } = useRoleStore();
  const { getSkillCompetencyState } = useCompetencyStateReader();

  if (!id || !selectedRole) return null;

  const employeeSkills = getEmployeeSkills(id);
  const currentRoleSkills = roleSkills[selectedRole as keyof typeof roleSkills];

  if (!currentRoleSkills) return null;

  const allSkills = [
    ...currentRoleSkills.specialized,
    ...currentRoleSkills.common,
    ...currentRoleSkills.certifications
  ].filter(skill => toggledSkills.has(skill.title));

  const calculateBenchmark = (roleId: string, level: string) => {
    if (!id) return 0;
    return calculateBenchmarkPercentage(
      id,
      roleId,
      level,
      currentStates
    );
  };

  const getSkillsToImprove = () => {
    return allSkills.filter(skill => {
      const roleSkillState = getSkillCompetencyState(skill.title, selectedLevel.toLowerCase(), selectedRole);
      if (!roleSkillState) return false;

      const employeeSkill = employeeSkills.find(s => s.title === skill.title);
      if (!employeeSkill) return false;

      const employeeLevel = employeeSkill.level || 'unspecified';
      const roleLevel = roleSkillState.level;

      const getLevelPriority = (level: string = 'unspecified') => {
        const priorities: { [key: string]: number } = {
          'advanced': 3,
          'intermediate': 2,
          'beginner': 1,
          'unspecified': 0
        };
        return priorities[level.toLowerCase()] || 0;
      };

      const employeePriority = getLevelPriority(employeeLevel);
      const rolePriority = getLevelPriority(roleLevel);

      return employeePriority < rolePriority;
    });
  };

  const skillsToImprove = getSkillsToImprove();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <CompetencyMatchSection 
        skills={allSkills}
        roleLevel={selectedLevel}
      />
      <MissingSkills 
        roleId={selectedRole}
        employeeId={id}
        selectedLevel={selectedLevel}
      />
      {skillsToImprove.length > 0 && (
        <SkillGoalSection 
          skills={skillsToImprove}
          count={skillsToImprove.length}
          title="Skills to Improve"
        />
      )}
    </div>
  );
};

export const EmployeeOverview = () => {
  return (
    <ToggledSkillsProvider>
      <EmployeeOverviewContent />
    </ToggledSkillsProvider>
  );
};
