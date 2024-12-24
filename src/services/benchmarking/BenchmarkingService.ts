import { EmployeeSkillAchievement } from '../../components/employee/types/employeeSkillTypes';
import { RoleSkillRequirement } from '../../components/skills/types/roleSkillTypes';
import { SkillComparison, SkillComparisonResult } from '../../components/skills/types/skillComparison';
import { roleSkills } from '../../components/skills/data/roleSkills';
import { getSkillProfileId } from '../../components/EmployeeTable';

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

  public updateCompetencyState(
    currentStates: any,
    skillName: string,
    level: string,
    levelKey: string,
    required: string,
    defaultState: any
  ) {
    console.log('BenchmarkingService: Updating competency state:', {
      skillName,
      level,
      levelKey,
      required
    });

    return {
      ...currentStates,
      [skillName]: {
        ...(currentStates[skillName] || {}),
        [levelKey]: { level, required }
      }
    };
  }

  public createSkillState(level: string, goalStatus: string) {
    console.log('BenchmarkingService: Creating skill state:', { level, goalStatus });
    return {
      level,
      goalStatus,
      lastUpdated: new Date().toISOString()
    };
  }

  public getDefaultSkillState() {
    return {
      level: 'unspecified',
      goalStatus: 'unknown',
      lastUpdated: new Date().toISOString()
    };
  }

  public enrichSkillData(employeeId: string, skill: any, skillData: any) {
    console.log('BenchmarkingService: Enriching skill data:', {
      employeeId,
      skillTitle: skill.title
    });

    return {
      ...skill,
      id: `${employeeId}-${skill.title}`,
      employeeId,
      subcategory: skillData.subcategory || 'General',
      category: skillData.category,
      businessCategory: skillData.businessCategory,
      weight: skillData.weight,
      growth: skillData.growth,
      salary: skillData.salary,
      confidence: 'medium',
      benchmarks: skillData.benchmarks || {
        B: false,
        R: false,
        M: false,
        O: false
      }
    };
  }

  public initializeEmployeeSkillsData(employeeId: string, skills: any[]) {
    console.log('BenchmarkingService: Initializing employee skills data:', {
      employeeId,
      skillCount: skills.length
    });

    return {
      employeeId,
      skills,
      states: {},
      lastUpdated: new Date().toISOString()
    };
  }

  public matchesInterestFilter(goalStatus: string, selectedInterest: string): boolean {
    console.log('BenchmarkingService: Checking interest filter match:', {
      goalStatus,
      selectedInterest
    });

    if (selectedInterest === 'interested') {
      return goalStatus === 'required' || goalStatus === 'skill_goal';
    }
    if (selectedInterest === 'not_interested') {
      return goalStatus === 'not_interested';
    }
    return true;
  }
}

// Create a singleton instance
export const benchmarkingService = new BenchmarkingService();
