import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  EmployeeSkillsStore, 
  EmployeeSkillState, 
  EmployeeSkillsData,
  SkillLevel, 
  SkillGoalStatus,
  EmployeeSkill
} from '../types/employeeSkillTypes';
import { initializeEmployeeSkillsData } from './actions/initializeEmployeeSkills';
import { employees } from '../EmployeeData';
import { getUnifiedSkillData } from '../../skills/data/skillDatabaseService';
import { createSkillState, updateSkillState } from './actions/skillStateManagement';

// Split store into smaller functions for better maintainability
const createSkillsStore = (set: any, get: any) => ({
  employeeSkills: {},

  initializeEmployeeSkills: (employeeId: string) => {
    console.log('Initializing skills for employee:', employeeId);
    
    const currentSkills = get().employeeSkills[employeeId];
    if (!currentSkills) {
      const employee = employees.find(emp => emp.id === employeeId);
      if (!employee) {
        console.warn('Employee not found:', employeeId);
        return;
      }

      const initializedData = initializeEmployeeSkillsData(employeeId, employee.skills);
      
      set((state) => ({
        employeeSkills: {
          ...state.employeeSkills,
          [employeeId]: initializedData
        }
      }));
      
      console.log('Initialized skills for employee:', {
        employeeId,
        skillCount: initializedData.skills.length
      });
    }
  },

  getEmployeeSkills: (employeeId: string): EmployeeSkill[] => {
    console.log('Getting skills for employee:', employeeId);
    return get().employeeSkills[employeeId]?.skills || [];
  },

  getSkillState: (employeeId: string, skillTitle: string): EmployeeSkillState => {
    const state = get().employeeSkills[employeeId]?.states[skillTitle];
    
    if (!state) {
      console.log('No existing skill state found:', {
        employeeId,
        skillTitle,
        usingDefault: true
      });
      
      return createSkillState();
    }

    console.log('Retrieved skill state:', {
      employeeId,
      skillTitle,
      state
    });
    
    return state;
  },

  batchUpdateSkills: (employeeId: string, updates: Record<string, EmployeeSkillState>) => {
    console.log('Processing batch update:', { employeeId, updateCount: Object.keys(updates).length });

    set((state) => {
      const currentData = state.employeeSkills[employeeId] || {
        employeeId,
        skills: [],
        states: {},
        lastUpdated: new Date().toISOString()
      };

      // Update skills array with new states
      const updatedSkills = currentData.skills.map(skill => {
        const update = updates[skill.title];
        if (update) {
          return {
            ...skill,
            level: update.level,
            goalStatus: update.goalStatus,
            lastUpdated: update.lastUpdated
          };
        }
        return skill;
      });

      return {
        employeeSkills: {
          ...state.employeeSkills,
          [employeeId]: {
            ...currentData,
            skills: updatedSkills,
            states: {
              ...currentData.states,
              ...updates
            },
            lastUpdated: new Date().toISOString()
          }
        }
      };
    });
  }
});

export const useEmployeeSkillsStore = create<EmployeeSkillsStore>()(
  persist(
    createSkillsStore,
    {
      name: 'employee-skills-storage',
      version: 13,
      partialize: (state) => ({
        employeeSkills: state.employeeSkills
      })
    }
  )
);