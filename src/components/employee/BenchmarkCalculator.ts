import { SkillLevel } from "./types/employeeSkillTypes";
import { UnifiedSkill } from "../skills/types/SkillTypes";
import { CompetencyStateReader } from "../skills/competency/types/competencyTypes";

interface SkillComparison {
  employeeLevel: SkillLevel;
  requiredLevel: SkillLevel;
}

export const calculateBenchmarkPercentage = (
  employeeId: string,
  roleId: string,
  baseRole: string,
  employeeSkills: UnifiedSkill[] | Record<string, any>,
  toggledSkills: Set<string>,
  competencyReader: CompetencyStateReader
): number => {
  console.log('Calculating benchmark percentage:', {
    employeeId,
    roleId,
    baseRole,
    skillsCount: Array.isArray(employeeSkills) ? employeeSkills.length : Object.keys(employeeSkills).length,
    toggledCount: toggledSkills.size
  });

  // Ensure employeeSkills is an array
  const skillsArray = Array.isArray(employeeSkills) 
    ? employeeSkills 
    : Object.values(employeeSkills);

  if (skillsArray.length === 0 || toggledSkills.size === 0) {
    return 0;
  }

  const matchingSkills = skillsArray.filter(skill => 
    toggledSkills.has(skill.title)
  );

  if (matchingSkills.length === 0) {
    return 0;
  }

  const comparisons: SkillComparison[] = matchingSkills.map(skill => {
    const employeeLevel = skill.level as SkillLevel;
    const competencyState = competencyReader.getSkillCompetencyState(skill.title, baseRole, roleId);
    const requiredLevel = (competencyState?.level || 'beginner') as SkillLevel;

    console.log('Comparing skill levels:', {
      skill: skill.title,
      employeeLevel,
      requiredLevel,
      competencyState
    });

    return {
      employeeLevel,
      requiredLevel
    };
  });

  const levelValues: Record<SkillLevel, number> = {
    'advanced': 3,
    'intermediate': 2,
    'beginner': 1,
    'unspecified': 0
  };

  const matchCount = comparisons.reduce((count, comparison) => {
    const employeeLevelValue = levelValues[comparison.employeeLevel] || 0;
    const requiredLevelValue = levelValues[comparison.requiredLevel] || 0;
    return count + (employeeLevelValue >= requiredLevelValue ? 1 : 0);
  }, 0);

  const percentage = (matchCount / toggledSkills.size) * 100;
  
  console.log('Benchmark calculation result:', {
    matchCount,
    totalSkills: toggledSkills.size,
    percentage: Math.round(percentage)
  });
  
  return Math.round(percentage);
};