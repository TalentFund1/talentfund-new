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

    // Create a complete EmployeeSkillData object for comparison
    const employeeSkillData: EmployeeSkillData = {
      id: `${employeeId}-${skill.title}`,
      employeeId,
      skillId: `${employeeId}-${skill.title}`,
      title: skill.title,
      subcategory: skill.subcategory || 'General',
      level: skill.level,
      goalStatus: skill.goalStatus || 'unknown',
      lastUpdated: new Date().toISOString(),
      category: skill.category || 'specialized',
      weight: skill.weight || 'technical',
      businessCategory: skill.businessCategory || 'Technical Skills',
      growth: skill.growth || '0%',
      salary: skill.salary || 'market',
      confidence: skill.confidence || 'medium',
      benchmarks: skill.benchmarks || {
        B: false,
        R: false,
        M: false,
        O: false
      }
    };

    const comparison = skillComparisonService.compareSkillLevels(
      employeeSkillData,
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