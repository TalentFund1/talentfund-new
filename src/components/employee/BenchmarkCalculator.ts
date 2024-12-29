import { EmployeeSkillData, SkillLevel } from "./types/employeeSkillTypes";
import { roleSkills } from "../skills/data/roleSkills";
import { getUnifiedSkillData } from "../skills/data/skillDatabaseService";
import { useCompetencyStateReader } from "../skills/competency/CompetencyStateReader";
import { RoleSkillRequirement } from "../skills/types/roleSkillTypes";
import { benchmarkingService } from "../../services/benchmarking";

const getLevelValue = (level: string): number => {
  const values: { [key: string]: number } = {
    'advanced': 4,
    'intermediate': 3,
    'beginner': 2,
    'unspecified': 1
  };
  return values[level.toLowerCase()] || 1;
};

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

  // Basic skill match - employee has the skill
  const matchingSkills = employeeSkills.filter(empSkill => 
    allRoleSkills.some(roleSkill => roleSkill.title === empSkill.title)
  );

  // Competency match - employee has the skill at required level or higher
  const competencyMatchingSkills = matchingSkills.filter(skill => {
    const employeeSkillLevel = skill.level;
    const roleSkillLevel = competencyReader.getSkillCompetencyState(
      skill.title,
      employeeLevel,
      roleId
    )?.level?.toLowerCase() as SkillLevel || 'unspecified';

    return employeeSkillLevel !== 'unspecified';
  });

  // Skill goal match - employee has set this as a goal
  const skillGoalMatchingSkills = matchingSkills.filter(skill => 
    skill.goalStatus === 'skill_goal'
  );

  const totalSkills = Math.max(allRoleSkills.length, 1); // Prevent division by zero

  // Calculate individual percentages with proper normalization
  const skillMatchPercentage = Math.min(
    (matchingSkills.length / totalSkills) * 100,
    100
  );

  const competencyMatchPercentage = Math.min(
    (competencyMatchingSkills.length / totalSkills) * 100,
    100
  );

  const skillGoalMatchPercentage = Math.min(
    (skillGoalMatchingSkills.length / totalSkills) * 100,
    100
  );

  // Calculate average percentage, ensuring it doesn't exceed 100%
  const averagePercentage = Math.min(
    (skillMatchPercentage + competencyMatchPercentage + skillGoalMatchPercentage) / 3,
    100
  );

  console.log('Final benchmark calculation:', {
    totalSkills,
    matchingSkills: matchingSkills.length,
    competencyMatches: competencyMatchingSkills.length,
    goalMatches: skillGoalMatchingSkills.length,
    skillMatchPercentage,
    competencyMatchPercentage,
    skillGoalMatchPercentage,
    averagePercentage
  });

  return averagePercentage;
};