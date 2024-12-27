import { EmployeeSkillData, SkillLevel } from "./types/employeeSkillTypes";
import { roleSkills } from "../skills/data/roleSkills";
import { getUnifiedSkillData } from "../skills/data/skillDatabaseService";
import { useCompetencyStateReader } from "../skills/competency/CompetencyStateReader";
import { RoleSkillRequirement } from "../skills/types/roleSkillTypes";
import { benchmarkingService } from "../../services/benchmarking";

export const calculateBenchmarkPercentage = (
  employeeId: string,
  roleId: string,
  employeeLevel: string,
  employeeSkills: EmployeeSkillData[] | undefined,
  toggledSkills: Set<string>,
  competencyReader: ReturnType<typeof useCompetencyStateReader>
): number => {
  console.log('Calculating benchmark percentage:', {
    employeeId,
    roleId,
    employeeLevel,
    employeeSkillsCount: employeeSkills?.length,
    toggledSkillsCount: toggledSkills.size
  });

  if (!employeeSkills || !Array.isArray(employeeSkills)) {
    console.warn('No employee skills found or invalid skills data');
    return 0;
  }

  const roleData = roleSkills[roleId as keyof typeof roleSkills];
  if (!roleData) {
    console.warn('No role data found for:', roleId);
    return 0;
  }

  const allRoleSkills = [
    ...roleData.specialized,
    ...roleData.common,
    ...roleData.certifications
  ].filter(skill => toggledSkills.has(skill.title));

  if (allRoleSkills.length === 0) {
    console.log('No toggled role skills found');
    return 0;
  }

  const matchingSkills = employeeSkills.filter(empSkill => 
    allRoleSkills.some(roleSkill => roleSkill.title === empSkill.title)
  );

  console.log('Matching skills found:', {
    count: matchingSkills.length,
    skills: matchingSkills.map(s => s.title)
  });

  let totalPercentage = 0;

  matchingSkills.forEach(skill => {
    const employeeSkillLevel = skill.level;
    const roleSkillLevel = competencyReader.getSkillCompetencyState(
      skill.title,
      employeeLevel,
      roleId
    )?.level?.toLowerCase() as SkillLevel || 'unspecified';

    console.log('Processing skill levels:', {
      skill: skill.title,
      employeeLevel: employeeSkillLevel,
      roleLevel: roleSkillLevel
    });

    // Create a complete RoleSkillRequirement object for comparison
    const roleSkillRequirement: RoleSkillRequirement = {
      id: `${roleId}-${skill.title}`,
      title: skill.title,
      minimumLevel: roleSkillLevel,
      requirementLevel: 'required',
      subcategory: skill.subcategory,
      category: skill.category,
      businessCategory: skill.businessCategory,
      weight: skill.weight,
      benchmarks: {
        B: false,
        R: false,
        M: false,
        O: false
      },
      metrics: {
        growth: skill.growth,
        salary: skill.salary,
        confidence: skill.confidence
      }
    };

    const comparison = benchmarkingService.compareSkillLevels(
      skill,
      roleSkillRequirement
    );

    totalPercentage += comparison.matchPercentage;
  });

  const averagePercentage = matchingSkills.length > 0
    ? totalPercentage / matchingSkills.length
    : 0;

  console.log('Final benchmark calculation:', {
    totalPercentage,
    matchingSkillsCount: matchingSkills.length,
    averagePercentage
  });

  return averagePercentage;
};