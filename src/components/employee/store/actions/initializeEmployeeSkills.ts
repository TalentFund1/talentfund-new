import { 
  EmployeeSkillsData, 
  EmployeeSkillAchievement, 
  SkillLevel, 
  SkillGoalStatus 
} from '../../types/employeeSkillTypes';
import { employees } from '../../EmployeeData';

export const initializeEmployeeSkillsData = (
  employeeId: string,
  skills: Array<{ name: string, level: SkillLevel }>
): EmployeeSkillsData => {
  console.log('Initializing skills data for employee:', { employeeId, skillCount: skills.length });

  const initializedSkills: EmployeeSkillAchievement[] = skills.map(skill => ({
    id: `${employeeId}-${skill.name}`,
    employeeId,
    title: skill.name,
    subcategory: 'general',
    level: skill.level,
    goalStatus: 'unknown' as SkillGoalStatus,
    lastUpdated: new Date().toISOString(),
    category: 'common',
    weight: 'necessary',
    confidence: 'medium',
    businessCategory: 'technical',
    growth: '0',
    salary: '0',
    benchmarks: {
      B: false,
      R: false,
      M: false,
      O: false
    }
  }));

  const states = initializedSkills.reduce((acc, skill) => ({
    ...acc,
    [skill.title]: {
      level: skill.level,
      goalStatus: skill.goalStatus,
      lastUpdated: skill.lastUpdated
    }
  }), {});

  console.log('Initialized employee skills:', {
    employeeId,
    skillCount: initializedSkills.length,
    skills: initializedSkills.map(s => ({ title: s.title, level: s.level }))
  });

  return {
    employeeId,
    skills: initializedSkills,
    states,
    lastUpdated: new Date().toISOString()
  };
};