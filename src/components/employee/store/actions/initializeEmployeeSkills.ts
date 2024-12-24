import { EmployeeSkillsData, EmployeeSkill, SkillLevel, SkillGoalStatus } from '../../types/employeeSkillTypes';
import { getUnifiedSkillData } from '../../../skills/data/skillDatabaseService';

export const initializeEmployeeSkillsData = (
  employeeId: string,
  skills: Array<{ name: string, level: SkillLevel }>
): EmployeeSkillsData => {
  console.log('Initializing skills data for employee:', { employeeId, skillCount: skills.length });

  const initializedSkills: EmployeeSkill[] = skills.map(skill => {
    const skillData = getUnifiedSkillData(skill.name);
    if (!skillData) {
      console.warn('No unified data found for skill:', skill.name);
      return null;
    }

    return {
      id: `${employeeId}-${skill.name}`,
      employeeId,
      title: skill.name,
      subcategory: skillData.subcategory,
      level: skill.level,
      goalStatus: 'unknown' as SkillGoalStatus,
      lastUpdated: new Date().toISOString(),
      category: skillData.category,
      weight: skillData.weight,
      confidence: skillData.confidence,
      businessCategory: skillData.businessCategory,
      growth: skillData.growth,
      salary: skillData.salary,
      benchmarks: skillData.benchmarks
    };
  }).filter((skill): skill is EmployeeSkill => skill !== null);

  const states = initializedSkills.reduce((acc, skill) => ({
    ...acc,
    [skill.title]: {
      level: skill.level,
      goalStatus: skill.goalStatus,
      lastUpdated: skill.lastUpdated
    }
  }), {});

  return {
    employeeId,
    skills: initializedSkills,
    states,
    lastUpdated: new Date().toISOString()
  };
};