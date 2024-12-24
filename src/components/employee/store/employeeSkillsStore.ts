import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { EmployeeSkillsStore } from './types/skillStoreTypes';
import { createSkillActions } from './actions/skillActions';
import { createSkillSelectors } from './selectors/skillSelectors';

export const useEmployeeSkillsStore = create<EmployeeSkillsStore>()(
  persist(
    (set, get) => ({
      employeeSkills: {},
      ...createSkillActions(set, get),
      ...createSkillSelectors(get)
    }),
    {
      name: 'employee-skills-storage',
      version: 5,
      partialize: (state) => ({
        employeeSkills: state.employeeSkills
      })
    }
  )
);