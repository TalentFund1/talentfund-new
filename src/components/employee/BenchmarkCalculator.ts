import { getEmployeeSkills } from "../benchmark/skills-matrix/initialSkills";
import { roleSkills } from "../skills/data/roleSkills";

export const calculateBenchmarkPercentage = (
  employeeId: string,
  roleId: string | null,
  level: string,
  currentStates: any,
  toggledSkills: Set<string>,
  getSkillCompetencyState: any
): number => {
  console.log('Calculating benchmark percentage:', {
    employeeId,
    roleId,
    level,
    hasCurrentStates: !!currentStates,
    toggledSkillsCount: toggledSkills.size
  });

  if (!roleId || !currentStates || !toggledSkills || !getSkillCompetencyState) {
    console.warn('Missing required dependencies for benchmark calculation');
    return 0;
  }

  const employeeSkills = getEmployeeSkills(employeeId);
  const profileSkills = roleSkills[roleId as keyof typeof roleSkills];

  if (!profileSkills) {
    console.warn('No role skills found for profile:', roleId);
    return 0;
  }

  // Get all skills for the role
  const allRoleSkills = [
    ...profileSkills.specialized,
    ...profileSkills.common,
    ...profileSkills.certifications
  ].filter(skill => toggledSkills.has(skill.title));

  if (allRoleSkills.length === 0) {
    console.log('No toggled skills found for role');
    return 0;
  }

  // Calculate matches
  let matchCount = 0;
  allRoleSkills.forEach(roleSkill => {
    const employeeSkill = employeeSkills.find(s => s.title === roleSkill.title);
    if (!employeeSkill) return;

    const roleSkillState = getSkillCompetencyState(roleSkill.title, level);
    if (!roleSkillState) return;

    const employeeSkillLevel = currentStates[roleSkill.title]?.level || employeeSkill.level;
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

    if (employeePriority >= rolePriority) {
      matchCount++;
    }
  });

  const percentage = (matchCount / allRoleSkills.length) * 100;
  
  console.log('Benchmark calculation result:', {
    matchCount,
    totalSkills: allRoleSkills.length,
    percentage
  });

  return Math.round(percentage);
};