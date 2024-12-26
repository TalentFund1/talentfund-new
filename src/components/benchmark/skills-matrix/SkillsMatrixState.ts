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
        return employeeStore.getSkillState(employeeId, skillTitle);
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