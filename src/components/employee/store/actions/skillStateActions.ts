import { StateCreator } from 'zustand';
import { EmployeeSkillData, EmployeeSkillUpdate } from '../../types/employeeSkillTypes';
import { employees } from '../../EmployeeData';
import { getUnifiedSkillData } from '../../../skills/data/skillDatabaseService';

export const createSkillStateActions = (set: any, get: any) => ({
  setSkillLevel: (employeeId: string, skillTitle: string, level: string) => {
    console.log('Setting skill level:', { employeeId, skillTitle, level });
    get().updateSkillState(employeeId, skillTitle, { level });
  },

  setSkillGoalStatus: (employeeId: string, skillTitle: string, status: string) => {
    console.log('Setting skill goal status:', { employeeId, skillTitle, status });
    get().updateSkillState(employeeId, skillTitle, { goalStatus: status });
  },

  updateSkillState: (employeeId: string, skillTitle: string, updates: EmployeeSkillUpdate) => {
    console.log('Updating skill state:', { employeeId, skillTitle, updates });
    
    set((state: any) => {
      const currentState = state.skillStates[employeeId] || { 
        skills: {},
        lastUpdated: new Date().toISOString()
      };

      const currentSkill = currentState.skills[skillTitle] || {
        id: `${employeeId}-${skillTitle}`,
        employeeId,
        skillId: `${employeeId}-${skillTitle}`,
        title: skillTitle,
        level: 'unspecified',
        goalStatus: 'unknown',
        lastUpdated: new Date().toISOString(),
        confidence: 'medium',
        subcategory: 'General',
        category: 'specialized',
        businessCategory: 'Technical Skills',
        weight: 'technical',
        growth: '0%',
        salary: 'market',
        benchmarks: {
          B: false,
          R: false,
          M: false,
          O: false
        }
      };

      const updatedSkill = {
        ...currentSkill,
        ...updates,
        lastUpdated: new Date().toISOString()
      };

      return {
        skillStates: {
          ...state.skillStates,
          [employeeId]: {
            ...currentState,
            skills: {
              ...currentState.skills,
              [skillTitle]: updatedSkill
            },
            lastUpdated: new Date().toISOString()
          }
        }
      };
    });
  },

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

    const store = get();
    employee.skills.forEach(skill => {
      const skillData = getUnifiedSkillData(skill.title);
      store.updateSkillState(employeeId, skill.title, {
        level: skill.level,
        goalStatus: 'unknown'
      });
    });
  }
});