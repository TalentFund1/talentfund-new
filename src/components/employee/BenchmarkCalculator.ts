import { SkillLevel } from "./types/employeeSkillTypes";
import { UnifiedSkill } from "../skills/types/SkillTypes";
import { CompetencyStateReader } from "../skills/competency/types/competencyTypes";

export const calculateBenchmarkPercentage = (
  employeeId: string,
  roleId: string,
  baseRole: string,
  employeeSkills: UnifiedSkill[],
  toggledSkills: Set<string>,
  competencyReader: CompetencyStateReader
): number => {
  console.log('Calculating benchmark percentage:', {
    employeeId,
    roleId,
    baseRole,
    skillsCount: employeeSkills.length,
    toggledCount: toggledSkills.size
  });

  const matchingSkills = employeeSkills.filter(skill => 
    toggledSkills.has(skill.title)
  );

  if (matchingSkills.length === 0) {
    console.log('No matching skills found for benchmark calculation');
    return 0;
  }

  console.log('Found matching skills:', {
    count: matchingSkills.length,
    skills: matchingSkills.map(s => s.title)
  });

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
    totalMatches,
    totalSkills: matchingSkills.length,
    percentage
  });

  return Math.round(percentage);
};