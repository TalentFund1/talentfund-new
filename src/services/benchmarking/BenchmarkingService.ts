import { EmployeeSkillAchievement } from '../../components/employee/types/employeeSkillTypes';
import { RoleSkillRequirement } from '../../components/skills/types/roleSkillTypes';
import { SkillComparison, SkillComparisonResult } from '../../components/skills/types/skillComparison';
import { roleSkills } from '../../components/skills/data/roleSkills';
import { getSkillProfileId, getLevel } from '../../components/EmployeeTable';

class BenchmarkingService {
  private getLevelPriority(level: string = 'unspecified'): number {
    const priorities: { [key: string]: number } = {
      'advanced': 3,
      'intermediate': 2,
      'beginner': 1,
      'unspecified': 0
    };
    return priorities[level.toLowerCase()] ?? 0;
  }

  public compareSkillLevels(
    employeeSkill: EmployeeSkillAchievement,
    roleRequirement: RoleSkillRequirement
  ): SkillComparison {
    console.log('BenchmarkingService: Comparing skill levels:', {
      skill: employeeSkill.title,
      employeeLevel: employeeSkill.level,
      requiredLevel: roleRequirement.minimumLevel
    });

    const employeePriority = this.getLevelPriority(employeeSkill.level);
    const requiredPriority = this.getLevelPriority(roleRequirement.minimumLevel);
    const matchPercentage = (employeePriority / Math.max(requiredPriority, 1)) * 100;

    return {
      employeeSkill,
      roleRequirement,
      matchPercentage,
      gapLevel: employeePriority - requiredPriority
    };
  }

  public calculateBenchmarkPercentage(
    employeeSkills: EmployeeSkillAchievement[],
    roleId: string,
    level: string,
    currentStates: any,
    toggledSkills: Set<string>
  ): number {
    console.log('BenchmarkingService: Calculating benchmark for:', {
      roleId,
      level,
      toggledSkillsCount: toggledSkills.size
    });

    if (!roleId || !roleSkills[roleId as keyof typeof roleSkills]) {
      console.warn('BenchmarkingService: Invalid role ID:', roleId);
      return 0;
    }

    const roleData = roleSkills[roleId as keyof typeof roleSkills];
    const allRoleSkills = [
      ...roleData.specialized,
      ...roleData.common,
      ...roleData.certifications
    ].filter(skill => toggledSkills.has(skill.title));

    if (allRoleSkills.length === 0) {
      console.log('BenchmarkingService: No toggled skills found for role');
      return 0;
    }

    const matchingSkills = allRoleSkills.filter(roleSkill => {
      const employeeSkill = employeeSkills.find(empSkill => empSkill.title === roleSkill.title);
      if (!employeeSkill) return false;

      const employeeSkillLevel = currentStates[roleSkill.title]?.level || employeeSkill.level || 'unspecified';
      const roleSkillLevel = roleSkill.level || 'unspecified';

      console.log('BenchmarkingService: Comparing skill levels:', {
        skill: roleSkill.title,
        employeeLevel: employeeSkillLevel,
        roleLevel: roleSkillLevel
      });

      const employeePriority = this.getLevelPriority(employeeSkillLevel);
      const rolePriority = this.getLevelPriority(roleSkillLevel);

      return employeePriority >= rolePriority;
    });

    const percentage = (matchingSkills.length / allRoleSkills.length) * 100;

    console.log('BenchmarkingService: Benchmark calculation result:', {
      matchingSkills: matchingSkills.length,
      totalSkills: allRoleSkills.length,
      percentage
    });

    return Math.round(percentage);
  }

  public calculateSkillComparison(
    employeeSkills: EmployeeSkillAchievement[],
    roleRequirements: RoleSkillRequirement[]
  ): SkillComparisonResult {
    console.log('BenchmarkingService: Calculating skill comparison:', {
      employeeSkillCount: employeeSkills.length,
      roleRequirementCount: roleRequirements.length
    });

    const matches: SkillComparison[] = [];
    const missingSkills: RoleSkillRequirement[] = [];
    const exceedingSkills: EmployeeSkillAchievement[] = [];

    roleRequirements.forEach(requirement => {
      const employeeSkill = employeeSkills.find(skill => skill.title === requirement.title);
      if (employeeSkill) {
        matches.push(this.compareSkillLevels(employeeSkill, requirement));
      } else {
        missingSkills.push(requirement);
      }
    });

    employeeSkills.forEach(skill => {
      if (!roleRequirements.some(req => req.title === skill.title)) {
        exceedingSkills.push(skill);
      }
    });

    const totalMatchPercentage = matches.reduce((acc, match) => acc + match.matchPercentage, 0) / 
      (roleRequirements.length || 1);

    console.log('BenchmarkingService: Calculated skill comparison result:', {
      totalMatches: matches.length,
      missingSkills: missingSkills.length,
      exceedingSkills: exceedingSkills.length,
      totalMatchPercentage
    });

    return {
      matches,
      totalMatchPercentage,
      missingSkills,
      exceedingSkills
    };
  }
}

// Create a singleton instance
export const benchmarkingService = new BenchmarkingService();