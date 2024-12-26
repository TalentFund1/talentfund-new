import { SkillLevel } from "./types/employeeSkillTypes";
import { useEmployeeSkillsStore } from "./store/employeeSkillsStore";

export const calculateBenchmarkPercentage = (
  employeeId: string,
  roleId: string,
  baseRole: string,
  getSkillCompetencyState: any,
  toggledSkills: Set<string>,
  getSkillState: any
): number => {
  const employeeStore = useEmployeeSkillsStore.getState();
  const employeeSkills = employeeStore.getEmployeeSkills(employeeId);

  console.log('Calculating benchmark percentage:', {
    employeeId,
    roleId,
    baseRole,
    skillCount: employeeSkills.length,
    toggledSkillsCount: toggledSkills.size
  });

  if (!employeeSkills || employeeSkills.length === 0) {
    console.log('No employee skills found for benchmark calculation');
    return 0;
  }

  const matchingSkills = employeeSkills.filter(skill => 
    toggledSkills.has(skill.title)
  );

  if (matchingSkills.length === 0) {
    console.log('No matching skills found for benchmark calculation');
    return 0;
  }

  const totalMatches = matchingSkills.reduce((acc, skill) => {
    const employeeLevel = skill.level;
    const requiredLevel = getSkillCompetencyState(skill.title, baseRole, roleId)?.level || 'beginner';

    const levelValues: Record<SkillLevel, number> = {
      'unspecified': 0,
      'beginner': 1,
      'intermediate': 2,
      'advanced': 3
    };

    const employeeLevelValue = levelValues[employeeLevel as SkillLevel] || 0;
    const requiredLevelValue = levelValues[requiredLevel as SkillLevel] || 0;

    return acc + (employeeLevelValue >= requiredLevelValue ? 1 : 0);
  }, 0);

  const percentage = (totalMatches / matchingSkills.length) * 100;

  console.log('Benchmark calculation result:', {
    employeeId,
    totalMatches,
    matchingSkillsCount: matchingSkills.length,
    percentage
  });

  return Math.round(percentage);
};