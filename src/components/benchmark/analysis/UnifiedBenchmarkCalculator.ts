import { UnifiedSkill } from "../../skills/types/SkillTypes";
import { skillComparisonService } from "../../../services/benchmarking/services/SkillComparisonService";
import { SkillLevel } from "../../skills/types/sharedSkillTypes";
import { RoleSkillRequirement } from "../../skills/types/roleSkillTypes";
import { EmployeeSkillData } from "../../employee/types/employeeSkillTypes";

export interface BenchmarkResult {
  matchingSkills: UnifiedSkill[];
  competencyMatchingSkills: UnifiedSkill[];
  skillGoalMatchingSkills: UnifiedSkill[];
  totalToggledSkills: number;
  skillMatchPercentage: number;
  competencyMatchPercentage: number;
  skillGoalMatchPercentage: number;
  averagePercentage: number;
}

export class UnifiedBenchmarkCalculator {
  calculateBenchmark(
    toggledRoleSkills: UnifiedSkill[],
    employeeSkills: UnifiedSkill[],
    comparisonLevel: string,
    selectedRole: string,
    track: string,
    getSkillState: (skillTitle: string, employeeId: string) => EmployeeSkillData,
    employeeId: string
  ): BenchmarkResult {
    console.log('UnifiedBenchmarkCalculator: Starting benchmark calculation', {
      toggledSkillsCount: toggledRoleSkills.length,
      employeeSkillsCount: employeeSkills.length,
      level: comparisonLevel,
      role: selectedRole,
      track
    });

    const matchingSkills = toggledRoleSkills.filter(roleSkill =>
      employeeSkills.some(empSkill => empSkill.title === roleSkill.title)
    );

    const competencyMatchingSkills = matchingSkills.filter(skill => {
      const employeeSkill = getSkillState(skill.title, employeeId);
      const employeeLevel = employeeSkill?.level || 'unspecified';
      
      // Create role requirement object
      const roleRequirement: RoleSkillRequirement = {
        id: `${selectedRole}-${skill.title}`,
        title: skill.title,
        minimumLevel: skill.level as SkillLevel,
        requirementLevel: 'required',
        subcategory: skill.subcategory,
        category: skill.category,
        businessCategory: skill.businessCategory,
        weight: skill.weight,
        benchmarks: skill.benchmarks,
        metrics: {
          growth: skill.growth,
          salary: skill.salary,
          confidence: 'medium'
        }
      };

      // Use skillComparisonService for consistent level comparison
      const comparison = skillComparisonService.compareSkillLevels(
        {
          ...employeeSkill,
          level: employeeLevel as SkillLevel
        },
        roleRequirement
      );

      console.log('Competency comparison result:', {
        skill: skill.title,
        employeeLevel,
        roleLevel: skill.level,
        matchPercentage: comparison.matchPercentage
      });

      return comparison.matchPercentage === 100;
    });

    const skillGoalMatchingSkills = matchingSkills.filter(skill => {
      const skillState = getSkillState(skill.title, employeeId);
      return skillState?.goalStatus === 'required' || skillState?.goalStatus === 'skill_goal';
    });

    const totalToggledSkills = toggledRoleSkills.length;

    const calculatePercentage = (count: number) => 
      totalToggledSkills > 0 ? Math.round((count / totalToggledSkills) * 100) : 0;

    const result = {
      matchingSkills,
      competencyMatchingSkills,
      skillGoalMatchingSkills,
      totalToggledSkills,
      skillMatchPercentage: calculatePercentage(matchingSkills.length),
      competencyMatchPercentage: calculatePercentage(competencyMatchingSkills.length),
      skillGoalMatchPercentage: calculatePercentage(skillGoalMatchingSkills.length),
      averagePercentage: 0
    };

    result.averagePercentage = Math.round(
      (result.skillMatchPercentage + result.competencyMatchPercentage + result.skillGoalMatchPercentage) / 3
    );

    console.log('UnifiedBenchmarkCalculator: Calculation complete', {
      matchingSkillsCount: matchingSkills.length,
      competencyMatchCount: competencyMatchingSkills.length,
      skillGoalMatchCount: skillGoalMatchingSkills.length,
      averagePercentage: result.averagePercentage,
      competencyMatches: competencyMatchingSkills.map(s => ({
        title: s.title,
        level: getSkillState(s.title, employeeId)?.level
      }))
    });

    return result;
  }
}

export const unifiedBenchmarkCalculator = new UnifiedBenchmarkCalculator();