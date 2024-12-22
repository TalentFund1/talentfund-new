import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SkillState, RoleState, EmployeeSkillState } from '../skills/types/SkillTypes';

interface CompetencyState {
  roleStates: Record<string, RoleState>;
  currentStates: Record<string, RoleState>;
  originalStates: Record<string, RoleState>;
  hasChanges: boolean;
  setSkillState: (
    employeeId: string,
    skillName: string,
    level: string,
    levelKey: string,
    required: string
  ) => void;
}

const defaultSkillState: SkillState = {
  level: 'unspecified',
  required: 'preferred'
};

// Separate level arrays for different tracks
const professionalLevels = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6'];
const managerialLevels = ['m3', 'm4', 'm5', 'm6'];

export const useCompetencyStore = create<CompetencyState>()(
  persist(
    (set) => ({
      roleStates: {},
      currentStates: {},
      originalStates: {},
      hasChanges: false,
      setSkillState: (employeeId, skillName, level, levelKey, required) => {
        console.log('Setting skill state:', { employeeId, skillName, level, levelKey, required });
        set((state) => {
          const newRoleStates = { ...state.roleStates };
          
          // Initialize nested structure if it doesn't exist
          if (!newRoleStates[employeeId]) {
            newRoleStates[employeeId] = {};
          }
          if (!newRoleStates[employeeId][skillName]) {
            newRoleStates[employeeId][skillName] = {};
          }
          
          // Set the skill state for this specific employee
          newRoleStates[employeeId][skillName][levelKey] = {
            level,
            required
          };

          return {
            roleStates: newRoleStates,
            currentStates: { ...newRoleStates },
            hasChanges: true
          };
        });
      },
    }),
    {
      name: 'competency-matrix-storage',
      version: 25, // Increment version to ensure clean state
      partialize: (state) => ({
        roleStates: state.roleStates,
        currentStates: state.currentStates,
        originalStates: state.originalStates,
      }),
      merge: (persistedState: any, currentState: CompetencyState) => {
        console.log('Merging persisted state:', persistedState);
        return {
          ...currentState,
          roleStates: persistedState.roleStates || {},
          currentStates: persistedState.currentStates || {},
          originalStates: persistedState.originalStates || {},
        };
      },
    }
  )
);