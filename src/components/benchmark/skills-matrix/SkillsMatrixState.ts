import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getEmployeeSkills } from './initialSkills';

export interface SkillState {
  level: string;
  required: string;
}

interface EmployeeSkillState {
  [skillName: string]: SkillState;
}

interface SkillsMatrixState {
  currentStates: {
    [employeeId: string]: EmployeeSkillState;
  };
  setSkillState: (employeeId: string, skillName: string, level: string, required: string) => void;
  initializeEmployeeSkills: (employeeId: string) => void;
  getSkillState: (employeeId: string, skillName: string) => SkillState;
}

export const useSkillsMatrixStore = create<SkillsMatrixState>()(
  persist(
    (set, get) => ({
      currentStates: {},
      
      setSkillState: (employeeId, skillName, level, required) => {
        console.log('Setting skill state:', { employeeId, skillName, level, required });
        
        set((state) => ({
          currentStates: {
            ...state.currentStates,
            [employeeId]: {
              ...state.currentStates[employeeId],
              [skillName]: {
                level,
                required
              }
            }
          }
        }));
      },

      initializeEmployeeSkills: (employeeId) => {
        console.log('Initializing skills for employee:', employeeId);
        
        const currentState = get().currentStates[employeeId];
        if (!currentState) {
          const initialSkills = getEmployeeSkills(employeeId);
          const initialState: EmployeeSkillState = {};
          
          initialSkills.forEach(skill => {
            initialState[skill.title] = {
              level: skill.level || 'unspecified',
              required: skill.requirement || 'preferred'
            };
          });
          
          set((state) => ({
            currentStates: {
              ...state.currentStates,
              [employeeId]: initialState
            }
          }));
        }
      },

      getSkillState: (employeeId, skillName) => {
        const employeeState = get().currentStates[employeeId];
        if (!employeeState || !employeeState[skillName]) {
          return {
            level: 'unspecified',
            required: 'preferred'
          };
        }
        return employeeState[skillName];
      }
    }),
    {
      name: 'skills-matrix-storage',
      version: 1,
      partialize: (state) => ({
        currentStates: state.currentStates
      })
    }
  )
);