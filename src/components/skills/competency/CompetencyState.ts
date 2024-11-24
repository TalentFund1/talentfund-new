import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { aiSkills } from '../data/skills/aiSkills';
import { backendSkills } from '../data/skills/backendSkills';
import { commonSkills } from '../data/skills/commonSkills';
import { certificationSkills } from '../data/skills/certificationSkills';
import { CompetencyState, SkillLevel, RequirementType, RoleCompetencyState, SkillLevelState } from '../types/CompetencyTypes';

const getStorageKey = (roleId: string) => `competency-states-${roleId}`;

const initializeSkillStates = (roleId: string): RoleCompetencyState => {
  console.log('Initializing competency states for role:', roleId);
  
  const states: RoleCompetencyState = {};
  
  const allSkills = [
    ...aiSkills,
    ...backendSkills,
    ...commonSkills,
    ...certificationSkills
  ];

  allSkills.forEach(skill => {
    states[skill.title] = {};
    
    if (skill.professionalTrack) {
      Object.entries(skill.professionalTrack).forEach(([level]) => {
        states[skill.title][level.toLowerCase()] = {
          level: "unspecified" as SkillLevel,
          required: "preferred" as RequirementType
        };
      });
    }
    
    if (skill.managerialTrack) {
      Object.entries(skill.managerialTrack).forEach(([level]) => {
        states[skill.title][level.toLowerCase()] = {
          level: "unspecified" as SkillLevel,
          required: "preferred" as RequirementType
        };
      });
    }
  });

  return states;
};

export const useCompetencyStore = create<CompetencyState>()(
  persist(
    (set) => ({
      currentStates: {},
      originalStates: {},
      hasChanges: false,
      initializeStates: (roleId: string) => {
        const initializedStates = initializeSkillStates(roleId);
        set({
          currentStates: initializedStates,
          originalStates: initializedStates,
          hasChanges: false
        });
      },
      resetToDefaults: () => {
        const roleId = localStorage.getItem('currentRoleId') || '123';
        const initializedStates = initializeSkillStates(roleId);
        set({
          currentStates: initializedStates,
          originalStates: initializedStates,
          hasChanges: false
        });
      },
      setSkillState: (skillTitle: string, level: SkillLevel, levelKey: string, requirement: RequirementType) => {
        set((state) => {
          const newStates = {
            ...state.currentStates,
            [skillTitle]: {
              ...(state.currentStates[skillTitle] || {}),
              [levelKey]: { level, required: requirement } as SkillLevelState,
            },
          };
          
          const hasChanges = JSON.stringify(newStates) !== JSON.stringify(state.originalStates);
          
          return {
            currentStates: newStates,
            hasChanges,
          };
        });
      },
      saveChanges: () => {
        set((state) => ({
          originalStates: { ...state.currentStates },
          hasChanges: false,
        }));
      },
      cancelChanges: () => {
        set((state) => ({
          currentStates: { ...state.originalStates },
          hasChanges: false,
        }));
      },
    }),
    {
      name: 'competency-storage',
      storage: {
        getItem: async (name): Promise<any> => {
          const roleId = localStorage.getItem('currentRoleId') || '123';
          const storageKey = getStorageKey(roleId);
          const value = localStorage.getItem(storageKey);
          
          if (!value) return null;
          
          try {
            const parsed = JSON.parse(value);
            return {
              state: {
                currentStates: parsed.state?.currentStates || {},
                originalStates: parsed.state?.originalStates || {},
                hasChanges: false
              },
              version: parsed.version
            };
          } catch (error) {
            console.error('Error parsing stored value:', error);
            return null;
          }
        },
        setItem: async (name, newValue: any) => {
          const roleId = localStorage.getItem('currentRoleId') || '123';
          const storageKey = getStorageKey(roleId);
          
          try {
            const serialized = JSON.stringify(newValue);
            localStorage.setItem(storageKey, serialized);
          } catch (error) {
            console.error('Error persisting state:', error);
          }
        },
        removeItem: async (name) => {
          const roleId = localStorage.getItem('currentRoleId') || '123';
          const storageKey = getStorageKey(roleId);
          localStorage.removeItem(storageKey);
        },
      },
    }
  )
);