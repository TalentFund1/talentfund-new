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
      
      // Get the role's required level for this skill
      const roleLevel = skill.level || 'unspecified';
      
      console.log('Comparing competency levels:', {
        skill: skill.title,
        employeeLevel,
        roleLevel,
        track
      });

      // Handle unspecified levels
      if (roleLevel === 'unspecified' && employeeLevel === 'unspecified') {
        console.log('Both levels are unspecified, considering it a match');
        return true;
      }

      if (roleLevel === 'unspecified') {
        console.log('Role level is unspecified, considering any employee level as matching');
        return true;
      }

      if (employeeLevel === 'unspecified') {
        console.log('Employee level is unspecified, considering it as not matching');
        return false;
      }

      // Level comparison logic
      const levelValues = {
        'advanced': 3,
        'intermediate': 2,
        'beginner': 1,
        'unspecified': 0
      };

      const employeeValue = levelValues[employeeLevel as keyof typeof levelValues];
      const roleValue = levelValues[roleLevel as keyof typeof levelValues];

      const isMatch = employeeValue >= roleValue;

      console.log('Level comparison result:', {
        skill: skill.title,
        employeeLevel,
        roleLevel,
        employeeValue,
        roleValue,
        isMatch
      });

      return isMatch;
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
      averagePercentage: result.averagePercentage
    });

    return result;
  }
}

export const unifiedBenchmarkCalculator = new UnifiedBenchmarkCalculator();