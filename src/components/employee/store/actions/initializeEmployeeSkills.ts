import { 
  EmployeeSkillsData, 
  EmployeeSkillAchievement, 
  SkillLevel, 
  SkillGoalStatus 
} from '../../types/employeeSkillTypes';
import { getUnifiedSkillData } from '../../../skills/data/skillDatabaseService';

export const initializeEmployeeSkillsData = (
  employeeId: string,
  skills: Array<{ name: string, level: SkillLevel }>
): EmployeeSkillsData => {
  console.log('Initializing skills data for employee:', { employeeId, skillCount: skills.length });

  const initializedSkills: EmployeeSkillAchievement[] = skills.map(skill => {
    const skillData = getUnifiedSkillData(skill.name);
    
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
      confidence: 'medium',
      businessCategory: skillData.businessCategory,
      growth: skillData.growth,
      salary: skillData.salary,
      benchmarks: skillData.benchmarks
    };
  });

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