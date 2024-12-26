import { SkillLevel } from "./types/employeeSkillTypes";
import { useCompetencyStateReader } from "../skills/competency/CompetencyStateReader";

export const calculateBenchmarkPercentage = (
  employeeId: string,
  roleId: string,
  baseRole: string,
  employeeSkills: any,
  toggledSkills: Set<string>,
  competencyReader: ReturnType<typeof useCompetencyStateReader>
): number => {
  // Ensure employeeSkills is an array
  const skillsArray = Array.isArray(employeeSkills) ? employeeSkills : [];

  console.log('Calculating benchmark percentage:', {
    employeeId,
    roleId,
    baseRole,
    skillCount: skillsArray.length,
    toggledSkillsCount: toggledSkills.size
  });

  if (skillsArray.length === 0) {
    console.log('No employee skills found');
    return 0;
  }

  const matchingSkills = skillsArray.filter(skill => 
    toggledSkills.has(skill.title)
  );

  if (matchingSkills.length === 0) {
    console.log('No matching skills found');
    return 0;
  }

  const totalMatches = matchingSkills.reduce((acc, skill) => {
    const employeeLevel = skill.level;
    const requiredLevel = competencyReader.getSkillCompetencyState(skill.title, baseRole, roleId)?.level || 'beginner';

    const levelValues: Record<SkillLevel, number> = {
      'unspecified': 0,
      'beginner': 1,
      'intermediate': 2,
      'advanced': 3
    };

    const employeeLevelValue = levelValues[employeeLevel as SkillLevel] || 0;
    const requiredLevelValue = levelValues[requiredLevel as SkillLevel] || 0;

    console.log('Comparing skill levels:', {
      skill: skill.title,
      employeeLevel,
      requiredLevel,
      employeeLevelValue,
      requiredLevelValue
    });

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