import { EmployeeSkillAchievement } from '../../types/employeeSkillTypes';
import { employees } from '../../EmployeeData';
import { getUnifiedSkillData } from '../../../skills/data/skillDatabaseService';

export const createInitializationActions = (set: any, get: any) => ({
  initializeEmployeeSkills: (employeeId: string) => {
    console.log('Initializing skills for employee:', employeeId);
    
    const employee = employees.find(emp => emp.id === employeeId);
    if (!employee) {
      console.warn('No employee found for initialization:', employeeId);
      return;
    }

    console.log('Found employee data for initialization:', {
      employeeId,
      skillCount: employee.skills.length,
      skills: employee.skills.map(s => s.title)
    });

    const initializedSkills = employee.skills.map(skill => {
      const skillData = getUnifiedSkillData(skill.title);
      const skillId = `${employeeId}-${skill.title}`;
      
      return {
        id: skillId,
        employeeId,
        skillId,
        title: skill.title,
        level: skill.level,
        goalStatus: 'unknown',
        lastUpdated: new Date().toISOString(),
        subcategory: skillData?.subcategory || 'General',
        category: skillData?.category || 'specialized',
        businessCategory: skillData?.businessCategory || 'Technical Skills',
        weight: skillData?.weight || 'technical',
        growth: skillData?.growth || 'stable',
        salary: skillData?.salary || 'market',
        confidence: 'medium',
        benchmarks: skillData?.benchmarks || {
          B: false,
          R: false,
          M: false,
          O: false
        }
      } as EmployeeSkillAchievement;
    });

    set(state => ({
      skillStates: {
        ...state.skillStates,
        [employeeId]: {
          skills: initializedSkills.reduce((acc, skill) => ({
            ...acc,
            [skill.title]: {
              level: skill.level,
              goalStatus: skill.goalStatus,
              lastUpdated: skill.lastUpdated,
              confidence: skill.confidence
            }
          }), {}),
          lastUpdated: new Date().toISOString()
        }
      }
    }));
  }
});