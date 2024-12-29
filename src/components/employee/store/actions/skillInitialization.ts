import { getUnifiedSkillData } from '../../../skills/data/skillDatabaseService';
import { 
  EmployeeSkillAchievement, 
  SkillLevel, 
  SkillGoalStatus 
} from '../../types/employeeSkillTypes';

export const initializeSkill = (employeeId: string, skillTitle: string): EmployeeSkillAchievement => {
  const unifiedData = getUnifiedSkillData(skillTitle);
  
  return {
    id: `${employeeId}-${skillTitle}`,
    employeeId,
    skillId: `${employeeId}-${skillTitle}`,
    title: skillTitle,
    level: 'unspecified' as SkillLevel,
    goalStatus: 'unknown' as SkillGoalStatus,
    lastUpdated: new Date().toISOString(),
    confidence: 'medium',
    subcategory: unifiedData.subcategory || 'General',
    category: unifiedData.category || 'specialized',
    businessCategory: unifiedData.businessCategory || 'Technical Skills',
    weight: unifiedData.weight || 'technical',
    growth: unifiedData.growth || '0%',
    salary: unifiedData.salary || 'market',
    skillScore: 0,
    inDevelopmentPlan: false,
    benchmarks: {
      B: false,
      R: false,
      M: false,
      O: false
    }
  };
};

export const createInitializationActions = (set: any, get: any) => ({
  initializeEmployeeSkills: (employeeId: string, initialSkills: Array<{ name: string, level: SkillLevel }> = []) => {
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
        category: unifiedData.category || 'specialized',
        businessCategory: unifiedData.businessCategory || 'Technical Skills',
        weight: unifiedData.weight || 'technical',
        growth: unifiedData.growth || '0%',
        salary: unifiedData.salary || 'market',
        confidence: 'medium',
        skillScore: 0,
        inDevelopmentPlan: false,
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
  }
});