import { getEmployeeSkills } from "../benchmark/skills-matrix/initialSkills";
import { roleSkills } from "../skills/data/roleSkills";

export const calculateBenchmarkPercentage = (
  employeeId: string,
  roleId: string,
  level: string,
  getSkillState: (skillTitle: string, employeeId: string) => any,
  toggledSkills: Set<string>,
  getSkillCompetencyState: any
): number => {
  console.log('Calculating benchmark for:', {
    employeeId,
    roleId,
    level,
    toggledSkillsCount: toggledSkills.size
  });

  if (!roleId || !roleSkills[roleId as keyof typeof roleSkills]) {
    console.warn('Invalid role ID:', roleId);
    return 0;
  }

  const employeeSkills = getEmployeeSkills(employeeId);
  const roleData = roleSkills[roleId as keyof typeof roleSkills];

  // Get all skills for the role
  const allRoleSkills = [
    ...roleData.specialized,
    ...roleData.common,
    ...roleData.certifications
  ].filter(skill => toggledSkills.has(skill.title));

  if (allRoleSkills.length === 0) {
    console.log('No toggled skills found for role');
    return 0;
  }

  // Count matching skills with correct competency level
  const matchingSkills = allRoleSkills.filter(roleSkill => {
    const employeeSkill = employeeSkills.find(empSkill => empSkill.title === roleSkill.title);
    if (!employeeSkill) return false;

    const roleSkillState = getSkillCompetencyState(roleSkill.title, level.toLowerCase(), roleId);
    if (!roleSkillState) return false;

    const employeeSkillState = getSkillState(roleSkill.title, employeeId);
    const employeeSkillLevel = employeeSkillState?.level || employeeSkill.level || 'unspecified';
    const roleSkillLevel = roleSkillState.level;

    console.log('Comparing skill levels:', {
      skill: roleSkill.title,
      employeeLevel: employeeSkillLevel,
      roleLevel: roleSkillLevel
    });

    // For all tracks, allow higher levels to match
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

    return employeePriority >= rolePriority;
  });

  const percentage = (matchingSkills.length / allRoleSkills.length) * 100;

  console.log('Benchmark calculation result:', {
    matchingSkills: matchingSkills.length,
    totalSkills: allRoleSkills.length,
    percentage
  });

  return Math.round(percentage);
};