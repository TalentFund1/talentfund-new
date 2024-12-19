import { roleSkills } from "../skills/data/roleSkills";
import { CompetencyState } from "../skills/competency/state/types";

export const calculateBenchmarkPercentage = (
  employeeId: string,
  roleId: string,
  level: string,
  currentStates: Record<string, CompetencyState>,
  toggledSkills: Set<string>
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
    const skillState = currentStates[roleSkill.title];
    if (!skillState) return false;

    const employeeState = skillState.employeeStates?.[employeeId]?.[roleSkill.title];
    const roleState = skillState.roleStates?.[roleId]?.[roleSkill.title];

    const employeeSkillLevel = employeeState?.level || 'unspecified';
    const roleSkillLevel = roleState?.level || 'unspecified';

    console.log('Comparing skill levels:', {
      skill: roleSkill.title,
      employeeLevel: employeeSkillLevel,
      roleLevel: roleSkillLevel
    });

    // For all tracks, allow higher levels to match
    const getLevelPriority = (level: string): number => {
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