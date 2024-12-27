import { EmployeeSkillData } from './types/employeeSkillTypes';
import { RoleSkillRequirement } from '../skills/types/roleSkillTypes';
import { skillComparisonService } from '../../services/benchmarking/services/SkillComparisonService';

export const calculateBenchmarkPercentage = (
  employeeId: string,
  roleId: string,
  baseRole: string,
  employeeSkills: EmployeeSkillData[] | undefined,
  toggledSkills: Set<string>,
  getSkillCompetencyState: any
): number => {
  console.log('BenchmarkCalculator: Starting calculation:', {
    employeeId,
    roleId,
    baseRole,
    employeeSkillsCount: employeeSkills?.length || 0,
    toggledSkillsCount: toggledSkills.size
  });

  // Ensure employeeSkills is an array
  if (!Array.isArray(employeeSkills)) {
    console.warn('BenchmarkCalculator: employeeSkills is not an array:', employeeSkills);
    return 0;
  }

  // Filter for toggled skills only
  const relevantSkills = employeeSkills.filter(skill => 
    toggledSkills.has(skill.title)
  );

  console.log('BenchmarkCalculator: Filtered relevant skills:', {
    totalSkills: employeeSkills.length,
    relevantSkillsCount: relevantSkills.length,
    skills: relevantSkills.map(s => s.title)
  });

  if (relevantSkills.length === 0) {
    console.log('BenchmarkCalculator: No relevant skills found');
    return 0;
  }

  // Calculate matches
  const matchingSkills = relevantSkills.filter(skill => {
    const roleSkillState = getSkillCompetencyState(skill.title, baseRole.toLowerCase(), roleId);
    if (!roleSkillState) {
      console.log('BenchmarkCalculator: No role skill state found for:', {
        skill: skill.title,
        baseRole,
        roleId
      });
      return false;
    }

    const employeeSkillLevel = skill.level;
    const roleSkillLevel = roleSkillState.level;

    console.log('BenchmarkCalculator: Comparing skill levels:', {
      skill: skill.title,
      employeeLevel: employeeSkillLevel,
      roleLevel: roleSkillLevel
    });

    const comparison = skillComparisonService.compareSkillLevels(
      { title: skill.title, level: employeeSkillLevel },
      { title: skill.title, minimumLevel: roleSkillLevel }
    );

    return comparison.matchPercentage >= 100;
  });

  const matchPercentage = (matchingSkills.length / toggledSkills.size) * 100;

  console.log('BenchmarkCalculator: Final calculation:', {
    matchingSkillsCount: matchingSkills.length,
    totalSkills: toggledSkills.size,
    matchPercentage
  });

  return Math.round(matchPercentage);
};