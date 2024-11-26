import { useSkillsMatrixStore } from "../../benchmark/skills-matrix/SkillsMatrixState";
import { useCompetencyStateReader } from "../../skills/competency/CompetencyStateReader";
import { useToggledSkills } from "../../skills/context/ToggledSkillsContext";
import { roleSkills } from "../../skills/data/roleSkills";
import { getEmployeeSkills } from "../../benchmark/skills-matrix/initialSkills";

interface BenchmarkResult {
  skillMatch: { current: number; total: number };
  competencyMatch: { current: number; total: number };
  skillGoals: { current: number; total: number };
  averagePercentage: number;
}

export const useTableBenchmark = (employeeId: string, roleId: string, roleLevel: string) => {
  const { currentStates } = useSkillsMatrixStore();
  const { getSkillCompetencyState } = useCompetencyStateReader();
  const { toggledSkills } = useToggledSkills();

  const calculateBenchmark = (): BenchmarkResult => {
    console.log('Calculating table benchmark:', { employeeId, roleId, roleLevel });
    
    const employeeSkills = getEmployeeSkills(employeeId);
    const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills];
    
    if (!currentRoleSkills) {
      console.warn('No role skills found for role:', roleId);
      return {
        skillMatch: { current: 0, total: 0 },
        competencyMatch: { current: 0, total: 0 },
        skillGoals: { current: 0, total: 0 },
        averagePercentage: 0
      };
    }

    const toggledRoleSkills = [
      ...currentRoleSkills.specialized,
      ...currentRoleSkills.common,
      ...currentRoleSkills.certifications
    ].filter(skill => toggledSkills.has(skill.title));

    const totalSkills = toggledRoleSkills.length;

    // Skill Match
    const matchingSkills = toggledRoleSkills.filter(roleSkill => 
      employeeSkills.some(empSkill => empSkill.title === roleSkill.title)
    );

    // Competency Match
    const competencyMatchingSkills = matchingSkills.filter(skill => {
      const roleSkillState = getSkillCompetencyState(skill.title, roleLevel.toLowerCase());
      if (!roleSkillState) return false;

      const employeeSkillLevel = currentStates[skill.title]?.level || skill.level || 'unspecified';
      const roleSkillLevel = roleSkillState.level;

      const getLevelPriority = (level: string = 'unspecified') => {
        const priorities: { [key: string]: number } = {
          'advanced': 3,
          'intermediate': 2,
          'beginner': 1,
          'unspecified': 0
        };
        return priorities[level.toLowerCase()] ?? 0;
      };

      const employeePriority = getLevelPriority(employeeSkillLevel);
      const rolePriority = getLevelPriority(roleSkillLevel);

      return employeePriority === rolePriority || employeePriority > rolePriority;
    });

    // Skill Goals Match
    const skillGoalMatchingSkills = matchingSkills.filter(skill => {
      const skillState = currentStates[skill.title];
      if (!skillState) return false;
      return skillState.requirement === 'required' || skillState.requirement === 'skill_goal';
    });

    const result = {
      skillMatch: { current: matchingSkills.length, total: totalSkills },
      competencyMatch: { current: competencyMatchingSkills.length, total: totalSkills },
      skillGoals: { current: skillGoalMatchingSkills.length, total: totalSkills },
      averagePercentage: Math.round(
        ((matchingSkills.length + competencyMatchingSkills.length + skillGoalMatchingSkills.length) / (totalSkills * 3)) * 100
      )
    };

    console.log('Table benchmark result:', result);
    return result;
  };

  return calculateBenchmark();
};