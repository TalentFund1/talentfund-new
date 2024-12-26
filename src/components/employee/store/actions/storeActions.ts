import { StateCreator } from 'zustand';
import { EmployeeSkillsStore, EmployeeSkillsStoreState } from '../types/storeTypes';
import { employees } from '../../EmployeeData';
import { EmployeeSkillUpdate, EmployeeSkillData } from '../../types/employeeSkillTypes';
import { benchmarkingService } from '../../../../services/benchmarking';

export const createStoreActions = (
  set: any,
  get: () => EmployeeSkillsStore
) => ({
  updateSkillState: (employeeId: string, skillTitle: string, updates: EmployeeSkillUpdate) => {
    console.log('Updating skill state:', { employeeId, skillTitle, updates });
    
    set((state: EmployeeSkillsStore) => {
      const currentState = state.skillStates[employeeId] || { 
        skills: {},
        lastUpdated: new Date().toISOString()
      };

      const employee = employees.find(emp => emp.id === employeeId);
      const hasSkill = employee?.skills.some(s => s.title === skillTitle);

      if (!hasSkill) {
        console.log('Skill not found in employee profile:', skillTitle);
        return state;
      }

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

      const updatedSkillStates = {
        ...state.skillStates,
        [employeeId]: {
          ...currentState,
          skills: {
            ...currentState.skills,
            [skillTitle]: {
              ...currentSkill,
              ...updates,
              lastUpdated: new Date().toISOString()
            }
          },
          lastUpdated: new Date().toISOString()
        }
      };

      console.log('Updated skill state:', updatedSkillStates[employeeId].skills[skillTitle]);
      return {
        ...state,
        skillStates: updatedSkillStates
      };
    });
  },

  batchUpdateSkills: (employeeId: string, updates: Record<string, EmployeeSkillUpdate>) => {
    console.log('Processing batch update:', { 
      employeeId, 
      updateCount: Object.keys(updates).length 
    });

    set((state: EmployeeSkillsStore) => {
      const currentState = state.skillStates[employeeId] || {
        skills: {},
        lastUpdated: new Date().toISOString()
      };

      const employee = employees.find(emp => emp.id === employeeId);
      if (!employee) {
        console.warn('Employee not found:', employeeId);
        return state;
      }

      const updatedSkills = { ...currentState.skills };

      Object.entries(updates).forEach(([skillTitle, skillUpdates]) => {
        if (employee.skills.some(s => s.title === skillTitle)) {
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
          
          updatedSkills[skillTitle] = {
            ...currentSkill,
            ...skillUpdates,
            lastUpdated: new Date().toISOString()
          };
        }
      });

      const updatedSkillStates = {
        ...state.skillStates,
        [employeeId]: {
          skills: updatedSkills,
          lastUpdated: new Date().toISOString()
        }
      };

      console.log('Batch update complete:', {
        employeeId,
        skillCount: Object.keys(updatedSkills).length,
        skills: Object.keys(updatedSkills)
      });

      return {
        ...state,
        skillStates: updatedSkillStates
      };
    });
  }
});