import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { EmployeeSkill, EmployeeSkillState, EmployeeSkillsData } from '../types/employeeSkillTypes';

interface EmployeeSkillsStore {
  employeeSkills: Record<string, EmployeeSkillsData>;
  setEmployeeSkills: (employeeId: string, skills: EmployeeSkill[]) => void;
  getEmployeeSkills: (employeeId: string) => EmployeeSkill[];
  setSkillState: (employeeId: string, skillTitle: string, level: string, requirement: string) => void;
  getSkillState: (employeeId: string, skillTitle: string) => EmployeeSkillState;
  initializeEmployeeSkills: (employeeId: string) => void;
}

export const useEmployeeSkillsStore = create<EmployeeSkillsStore>()(
  persist(
    (set, get) => ({
      employeeSkills: {},

      setEmployeeSkills: (employeeId, skills) => {
        console.log('Setting skills for employee:', { employeeId, skillCount: skills.length });
        set((state) => ({
          employeeSkills: {
            ...state.employeeSkills,
            [employeeId]: {
              skills,
              states: state.employeeSkills[employeeId]?.states || {}
            }
          }
        }));
      },

      getEmployeeSkills: (employeeId) => {
        const employeeData = get().employeeSkills[employeeId];
        console.log('Getting skills for employee:', { 
          employeeId, 
          skillCount: employeeData?.skills.length || 0 
        });
        return employeeData?.skills || [];
      },

      setSkillState: (employeeId, skillTitle, level, requirement) => {
        console.log('Setting skill state:', { employeeId, skillTitle, level, requirement });
        set((state) => ({
          employeeSkills: {
            ...state.employeeSkills,
            [employeeId]: {
              skills: state.employeeSkills[employeeId]?.skills || [],
              states: {
                ...state.employeeSkills[employeeId]?.states,
                [skillTitle]: { level, requirement }
              }
            }
          }
        }));
      },

      getSkillState: (employeeId, skillTitle) => {
        const state = get().employeeSkills[employeeId]?.states[skillTitle];
        return state || { level: 'beginner', requirement: 'unknown' };
      },

      initializeEmployeeSkills: (employeeId) => {
        const currentSkills = get().employeeSkills[employeeId];
        if (!currentSkills) {
          console.log('Initializing skills for employee:', employeeId);
          set((state) => ({
            employeeSkills: {
              ...state.employeeSkills,
              [employeeId]: {
                skills: [],
                states: {}
              }
            }
          }));
        }
      }
    }),
    {
      name: 'employee-skills-storage',
      version: 1,
      partialize: (state) => ({
        employeeSkills: state.employeeSkills
      })
    }
  )
);