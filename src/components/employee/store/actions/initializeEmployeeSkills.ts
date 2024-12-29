import { getUnifiedSkillData } from '../../../skills/data/skillDatabaseService';
import { 
  EmployeeSkillAchievement, 
  SkillLevel, 
  SkillGoalStatus 
} from '../../types/employeeSkillTypes';

export const initializeEmployeeSkills = (
  employeeId: string, 
  initialSkills: Array<{ name: string, level: SkillLevel }> = []
): EmployeeSkillAchievement[] => {
  console.log('Initializing skills for employee:', { 
    employeeId, 
    initialSkillCount: initialSkills.length 
  });
  
  const processedSkills: EmployeeSkillAchievement[] = initialSkills.map(skill => {
    const unifiedData = getUnifiedSkillData(skill.name);
    const skillId = `${employeeId}-${skill.name}`;
    
    return {
      id: skillId,
      employeeId,
      skillId,
      title: skill.name,
      subcategory: unifiedData.subcategory || 'General',
      level: skill.level,
      goalStatus: 'unknown' as SkillGoalStatus,
      lastUpdated: new Date().toISOString(),
      category: unifiedData.category,
      businessCategory: unifiedData.businessCategory,
      weight: unifiedData.weight,
      growth: unifiedData.growth,
      salary: unifiedData.salary,
      confidence: 'medium',
      skillScore: 0,
      benchmarks: unifiedData.benchmarks || {
        B: false,
        R: false,
        M: false,
        O: false
      }
    };
  });

  console.log('Created initial skills:', {
    employeeId,
    skillCount: processedSkills.length,
    skills: processedSkills.map(s => s.title)
  });

  return processedSkills;
};