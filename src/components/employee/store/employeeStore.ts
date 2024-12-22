import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { EmployeeSkillState, EmployeeSkillRequirement, UnifiedSkill } from '../../../types/skillTypes';

interface EmployeeStore {
  employees: any[];
  skillStates: Record<string, Record<string, EmployeeSkillState>>;
  getEmployeeById: (id: string) => any;
  getEmployeeSkills: (id: string) => UnifiedSkill[];
  setSkillState: (
    employeeId: string,
    skillId: string,
    skillName: string,
    level: string,
    requirement: EmployeeSkillRequirement
  ) => void;
  getSkillState: (employeeId: string, skillName: string) => EmployeeSkillState;
}

export const useEmployeeStore = create<EmployeeStore>()(
  persist(
    (set, get) => ({
      employees: [],
      skillStates: {},

      getEmployeeById: (id) => {
        return get().employees.find(emp => emp.id === id);
      },

      getEmployeeSkills: (id) => {
        console.log('Getting skills for employee:', id);
        const employee = get().getEmployeeById(id);
        if (!employee) return [];
        return employee.skills || [];
      },

      setSkillState: (employeeId, skillId, skillName, level, requirement) => {
        console.log('Setting skill state:', {
          employeeId,
          skillId,
          skillName,
          level,
          requirement
        });

        set((state) => ({
          skillStates: {
            ...state.skillStates,
            [employeeId]: {
              ...state.skillStates[employeeId],
              [skillName]: {
                skillId,
                level,
                requirement
              }
            }
          }
        }));
      },

      getSkillState: (employeeId, skillName) => {
        const states = get().skillStates[employeeId] || {};
        const defaultState: EmployeeSkillState = {
          skillId: skillName,
          level: 'unspecified',
          requirement: 'unknown'
        };
        return states[skillName] || defaultState;
      }
    }),
    {
      name: 'employee-storage',
      version: 1,
      partialize: (state) => ({
        skillStates: state.skillStates
      })
    }
  )
);