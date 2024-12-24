import { getUnifiedSkillData } from '../../../skills/data/skillDatabaseService';
import { EmployeeSkillAchievement, SkillLevel, SkillGoalStatus } from '../../types/employeeSkillTypes';

export const initializeEmployeeSkills = (employeeId: string, initialSkills: Array<{ name: string, level: SkillLevel }> = []): EmployeeSkillAchievement[] => {
  console.log('Initializing skills strictly from employee data:', { 
    employeeId, 
    initialSkillCount: initialSkills.length,
    skills: initialSkills.map(s => ({ name: s.name, level: s.level }))
  });
  
  const processedSkills: EmployeeSkillAchievement[] = initialSkills.map(skill => {
    const unifiedData = getUnifiedSkillData(skill.name);
    return {
      id: `${employeeId}-${skill.name}`,
      employeeId,
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
      benchmarks: unifiedData.benchmarks || {
        B: false,
        R: false,
        M: false,
        O: false
      }
    };
  });

  console.log('Processed employee skills:', {
    employeeId,
    skillCount: processedSkills.length,
    skills: processedSkills.map(s => ({
      title: s.title,
      level: s.level,
      goalStatus: s.goalStatus
    }))
  });

  return processedSkills;
};