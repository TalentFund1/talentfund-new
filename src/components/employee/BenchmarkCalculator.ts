import { getEmployeeSkills } from "../benchmark/skills-matrix/initialSkills";
import { roleSkills } from "../skills/data/roleSkills";
import { getBaseRole } from "../EmployeeTable";

export const calculateBenchmarkPercentage = (
  employeeId: string, 
  roleId: string, 
  level: string,
  currentStates: any,
  toggledSkills: Set<string>,
  getSkillCompetencyState: any
) => {
  const employeeSkills = getEmployeeSkills(employeeId);
  const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills] || roleSkills["123"];
  
  const allRoleSkills = [
    ...currentRoleSkills.specialized,
    ...currentRoleSkills.common,
    ...currentRoleSkills.certifications
  ];

  const toggledRoleSkills = allRoleSkills.filter(skill => toggledSkills.has(skill.title));
  const totalToggledSkills = toggledRoleSkills.length;

  if (totalToggledSkills === 0) return 100;

  // Find matching skills
  const matchingSkills = toggledRoleSkills.filter(roleSkill => {
    const employeeSkill = employeeSkills.find(empSkill => empSkill.title === roleSkill.title);
    return employeeSkill !== undefined;
  });

  // Competency match calculation
  const competencyMatchingSkills = matchingSkills.filter(skill => {
    const roleSkillState = getSkillCompetencyState(skill.title, level.toLowerCase());
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

    return employeePriority >= rolePriority;
  });

  // Skill goal match calculation
  const skillGoalMatchingSkills = matchingSkills.filter(skill => {
    const skillState = currentStates[skill.title];
    if (!skillState) return false;
    return skillState.requirement === 'required' || skillState.requirement === 'skill_goal';
  });

  // Calculate percentages
  const skillMatchPercentage = (matchingSkills.length / totalToggledSkills) * 100;
  const competencyMatchPercentage = (competencyMatchingSkills.length / totalToggledSkills) * 100;
  const skillGoalMatchPercentage = (skillGoalMatchingSkills.length / totalToggledSkills) * 100;

  console.log('Benchmark calculation:', {
    skillMatch: { count: matchingSkills.length, total: totalToggledSkills, percentage: skillMatchPercentage },
    competencyMatch: { count: competencyMatchingSkills.length, total: totalToggledSkills, percentage: competencyMatchPercentage },
    skillGoalMatch: { count: skillGoalMatchingSkills.length, total: totalToggledSkills, percentage: skillGoalMatchPercentage }
  });

  // Calculate final benchmark
  const averagePercentage = Math.round(
    (skillMatchPercentage + competencyMatchPercentage + skillGoalMatchPercentage) / 3
  );

  return averagePercentage;
};