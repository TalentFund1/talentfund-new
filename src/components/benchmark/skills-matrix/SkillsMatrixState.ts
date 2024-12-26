import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useEmployeeSkillsStore } from '../../employee/store/employeeSkillsStore';
import { EmployeeSkillData } from '../../employee/types/employeeSkillTypes';

export interface SkillsMatrixState {
  hasChanges: boolean;
  getSkillState: (skillTitle: string, employeeId: string) => EmployeeSkillData;
  saveChanges: () => void;
  cancelChanges: () => void;
  initializeState: (skillTitle: string, employeeId: string) => void;
}

const mapSkillState = (state: any) => {
  // Map requirement/goalStatus
  let goalStatus = state.goalStatus || state.requirement || 'unknown';
  
  // Normalize the goalStatus mapping
  switch (goalStatus.toLowerCase()) {
    case 'required':
    case 'preferred':
      goalStatus = 'skill_goal';
      break;
    case 'not_interested':
      goalStatus = 'not_interested';
      break;
    default:
      goalStatus = 'unknown';
  }

  // Map level
  const level = state.level || 'unspecified';

  console.log('Mapping skill state:', {
    originalState: state,
    mappedGoalStatus: goalStatus,
    mappedLevel: level
  });

  return {
    ...state,
    level,
    goalStatus
  };
};

export const useSkillsMatrixStore = create<SkillsMatrixState>()(
  persist(
    (set, get) => ({
      hasChanges: false,

      getSkillState: (skillTitle: string, employeeId: string) => {
        console.log('Matrix getting skill state:', {
          employeeId,
          skillTitle
        });
        
        const employeeStore = useEmployeeSkillsStore.getState();
        const skillState = employeeStore.getSkillState(employeeId, skillTitle);
        
        return mapSkillState(skillState);
      },

      initializeState: (skillTitle: string, employeeId: string) => {
        console.log('Matrix initialized skill state:', {
          employeeId,
          skillTitle
        });
        
        const employeeStore = useEmployeeSkillsStore.getState();
        employeeStore.initializeEmployeeSkills(employeeId);
      },

      saveChanges: () => {
        console.log('Matrix saving changes');
        set({ hasChanges: false });
      },

      cancelChanges: () => {
        console.log('Matrix canceling changes');
        set({ hasChanges: false });
      }
    }),
    {
      name: 'skills-matrix-storage',
      version: 2,
      partialize: (state) => ({
        hasChanges: state.hasChanges
      })
    }
  )
);

// Export the hook for accessing the store
export const useSkillsMatrixState = useSkillsMatrixStore;