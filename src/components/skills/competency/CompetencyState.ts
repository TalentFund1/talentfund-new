import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CompetencyState, RoleCompetencies } from './state/types';

export const useCompetencyStore = create<CompetencyState>()(
  persist(
    (set, get) => ({
      roleCompetencies: {},

      setCompetencyRequirement: (roleId, skillName, levelKey, level, required) => {
        console.log('Setting competency requirement:', {
          roleId,
          skillName,
          levelKey,
          level,
          required
        });

        set((state) => ({
          roleCompetencies: {
            ...state.roleCompetencies,
            [roleId]: {
              ...state.roleCompetencies[roleId],
              [skillName]: {
                ...state.roleCompetencies[roleId]?.[skillName],
                [levelKey]: { level, required }
              }
            }
          }
        }));
      },

      getRoleCompetencies: (roleId) => {
        return get().roleCompetencies[roleId] || {};
      }
    }),
    {
      name: 'competency-storage',
      version: 1,
      partialize: (state) => ({
        roleCompetencies: state.roleCompetencies
      })
    }
  )
);