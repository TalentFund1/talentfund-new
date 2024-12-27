import { EmployeeSkillData } from './types/employeeSkillTypes';
import { RoleSkillRequirement } from '../skills/types/roleSkillTypes';
import { skillComparisonService } from '../../services/benchmarking';
import { CompetencyStateReader } from '../skills/competency/types/competencyTypes';

export const calculateBenchmarkPercentage = (
  employeeId: string,
  roleId: string,
  baseRole: string,
  employeeSkills: EmployeeSkillData[],
  toggledSkills: Set<string>,
  competencyReader: CompetencyStateReader
): number => {
  console.log('BenchmarkCalculator: Starting calculation:', {
    employeeId,
    roleId,
    baseRole,
    skillsCount: employeeSkills.length,
    toggledCount: toggledSkills.size
  });

  if (employeeSkills.length === 0 || toggledSkills.size === 0) {
    return 0;
  }

  // Filter for toggled skills only
  const relevantSkills = employeeSkills.filter(skill => 
    toggledSkills.has(skill.title)
  );

  const totalSkills = toggledSkills.size;

  // Calculate skill match percentage (basic presence)
  const skillMatchCount = relevantSkills.length;
  const skillMatchPercentage = (skillMatchCount / totalSkills) * 100;

  console.log('Skill match calculation:', {
    matchingSkills: skillMatchCount,
    totalSkills,
    percentage: skillMatchPercentage
  });

  // Calculate competency match percentage
  const competencyMatchCount = relevantSkills.filter(skill => {
    const roleSkillState = competencyReader.getSkillCompetencyState(skill.title, baseRole, roleId);
    if (!roleSkillState) return false;

    const employeeSkillLevel = skill.level;
    const roleSkillLevel = roleSkillState.level;

    return employeeSkillLevel === roleSkillLevel || 
           (employeeSkillLevel === 'advanced' && roleSkillLevel === 'intermediate') ||
           (employeeSkillLevel === 'advanced' && roleSkillLevel === 'beginner') ||
           (employeeSkillLevel === 'intermediate' && roleSkillLevel === 'beginner');
  }).length;

  const competencyMatchPercentage = (competencyMatchCount / totalSkills) * 100;

  console.log('Competency match calculation:', {
    matchingCompetencies: competencyMatchCount,
    totalSkills,
    percentage: competencyMatchPercentage
  });

  // Calculate skill goal match percentage
  const skillGoalMatchCount = relevantSkills.filter(skill => 
    skill.goalStatus === 'required' || skill.goalStatus === 'skill_goal'
  ).length;

  const skillGoalMatchPercentage = (skillGoalMatchCount / totalSkills) * 100;

  console.log('Skill goal match calculation:', {
    matchingGoals: skillGoalMatchCount,
    totalSkills,
    percentage: skillGoalMatchPercentage
  });

  // Calculate average percentage
  const averagePercentage = Math.round(
    (skillMatchPercentage + competencyMatchPercentage + skillGoalMatchPercentage) / 3
  );

  console.log('Final benchmark calculation:', {
    skillMatch: skillMatchPercentage,
    competencyMatch: competencyMatchPercentage,
    goalMatch: skillGoalMatchPercentage,
    average: averagePercentage
  });

  return averagePercentage;
};