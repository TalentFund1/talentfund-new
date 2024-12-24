import { EmployeeSkillAchievement } from '../../../components/employee/types/employeeSkillTypes';
import { roleSkills } from '../../../components/skills/data/roleSkills';
import { levelComparisonService } from './LevelComparisonService';

export class BenchmarkCalculationService {
  public calculateBenchmarkPercentage(
    employeeSkills: EmployeeSkillAchievement[],
    roleId: string,
    level: string,
    currentStates: any,
    toggledSkills: Set<string>
  ): number {
    console.log('BenchmarkCalculationService: Calculating benchmark for:', {
      roleId,
      level,
      toggledSkillsCount: toggledSkills.size
    });

    if (!roleId || !roleSkills[roleId as keyof typeof roleSkills]) {
      console.warn('BenchmarkCalculationService: Invalid role ID:', roleId);
      return 0;
    }

    const roleData = roleSkills[roleId as keyof typeof roleSkills];
    const allRoleSkills = [
      ...roleData.specialized,
      ...roleData.common,
      ...roleData.certifications
    ].filter(skill => toggledSkills.has(skill.title));

    if (allRoleSkills.length === 0) {
      console.log('BenchmarkCalculationService: No toggled skills found for role');
      return 0;
    }

    const matchingSkills = allRoleSkills.filter(roleSkill => {
      const employeeSkill = employeeSkills.find(empSkill => empSkill.title === roleSkill.title);
      if (!employeeSkill) return false;

      const employeeSkillLevel = currentStates[roleSkill.title]?.level || employeeSkill.level || 'unspecified';
      const roleSkillLevel = roleSkill.level || 'unspecified';

      console.log('BenchmarkCalculationService: Comparing skill levels:', {
        skill: roleSkill.title,
        employeeLevel: employeeSkillLevel,
        roleLevel: roleSkillLevel
      });

      const employeePriority = levelComparisonService['getLevelPriority'](employeeSkillLevel);
      const rolePriority = levelComparisonService['getLevelPriority'](roleSkillLevel);

      return employeePriority >= rolePriority;
    });

    const percentage = (matchingSkills.length / allRoleSkills.length) * 100;

    console.log('BenchmarkCalculationService: Benchmark calculation result:', {
      matchingSkills: matchingSkills.length,
      totalSkills: allRoleSkills.length,
      percentage
    });

    return Math.round(percentage);
  }
}

export const benchmarkCalculationService = new BenchmarkCalculationService();