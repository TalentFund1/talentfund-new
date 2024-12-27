import { UnifiedSkill } from '../../../components/skills/types/SkillTypes';
import { EmployeeSkillData } from '../../../components/employee/types/employeeSkillTypes';
import { benchmarkingService } from '..';

export class UnifiedBenchmarkCalculator {
  calculateMatchingSkills(
    toggledRoleSkills: UnifiedSkill[],
    employeeSkills: UnifiedSkill[],
    comparisonLevel: string,
    selectedRole: string,
  ) {
    console.log('UnifiedBenchmarkCalculator: Calculating matching skills:', {
      toggledSkillsCount: toggledRoleSkills.length,
      employeeSkillsCount: employeeSkills.length,
      level: comparisonLevel,
      roleId: selectedRole
    });

    const matchingSkills = toggledRoleSkills.filter(roleSkill => {
      const employeeSkill = employeeSkills.find(empSkill => empSkill.title === roleSkill.title);
      return employeeSkill !== undefined;
    });

    const competencyMatchingSkills = matchingSkills.filter(skill => {
      const employeeSkill = employeeSkills.find(empSkill => empSkill.title === skill.title);
      if (!employeeSkill) return false;

      const comparison = benchmarkingService.compareSkillLevels(
        { title: skill.title, level: employeeSkill.level },
        { title: skill.title, minimumLevel: comparisonLevel }
      );

      return comparison.matchPercentage >= 100;
    });

    const skillGoalMatchingSkills = matchingSkills.filter(skill => {
      const employeeSkill = employeeSkills.find(empSkill => empSkill.title === skill.title);
      return employeeSkill?.goalStatus === 'required' || employeeSkill?.goalStatus === 'skill_goal';
    });

    console.log('UnifiedBenchmarkCalculator: Matching skills calculated:', {
      totalMatching: matchingSkills.length,
      competencyMatching: competencyMatchingSkills.length,
      skillGoalMatching: skillGoalMatchingSkills.length
    });

    return {
      matchingSkills,
      competencyMatchingSkills,
      skillGoalMatchingSkills,
      totalToggledSkills: toggledRoleSkills.length
    };
  }

  calculateMatchPercentages(
    matchingCount: number,
    competencyCount: number,
    skillGoalCount: number,
    totalCount: number
  ) {
    console.log('UnifiedBenchmarkCalculator: Calculating percentages:', {
      matchingCount,
      competencyCount,
      skillGoalCount,
      totalCount
    });

    const skillMatchPercentage = Math.round((matchingCount / totalCount) * 100);
    const competencyMatchPercentage = Math.round((competencyCount / totalCount) * 100);
    const skillGoalMatchPercentage = Math.round((skillGoalCount / totalCount) * 100);
    const averagePercentage = Math.round(
      (skillMatchPercentage + competencyMatchPercentage + skillGoalMatchPercentage) / 3
    );

    return {
      skillMatchPercentage,
      competencyMatchPercentage,
      skillGoalMatchPercentage,
      averagePercentage
    };
  }

  calculateBenchmarkPercentage(
    employeeSkills: EmployeeSkillData[],
    roleId: string,
    employeeLevel: string,
    toggledSkills: Set<string>
  ): number {
    console.log('UnifiedBenchmarkCalculator: Calculating benchmark percentage:', {
      employeeSkillsCount: employeeSkills.length,
      roleId,
      employeeLevel,
      toggledSkillsCount: toggledSkills.size
    });

    const matchingSkills = employeeSkills.filter(skill => toggledSkills.has(skill.title));
    
    if (matchingSkills.length === 0) {
      console.log('UnifiedBenchmarkCalculator: No matching skills found');
      return 0;
    }

    let totalPercentage = 0;
    matchingSkills.forEach(skill => {
      const comparison = benchmarkingService.compareSkillLevels(
        { title: skill.title, level: skill.level },
        { title: skill.title, minimumLevel: employeeLevel }
      );
      totalPercentage += comparison.matchPercentage;
    });

    const averagePercentage = totalPercentage / matchingSkills.length;

    console.log('UnifiedBenchmarkCalculator: Benchmark calculation complete:', {
      totalPercentage,
      matchingSkillsCount: matchingSkills.length,
      averagePercentage
    });

    return averagePercentage;
  }
}

export const unifiedBenchmarkCalculator = new UnifiedBenchmarkCalculator();