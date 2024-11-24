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
    (set, get) => ({
      currentStates: {},
      originalStates: {},
      hasChanges: false,
      initializeStates: (roleId: string) => {
        console.log('Initializing states for role:', roleId);
        const initializedStates = initializeSkillStates(roleId);
        set({
          currentStates: initializedStates,
          originalStates: initializedStates,
          hasChanges: false
        });
      },
      resetToDefaults: () => {
        console.log('Resetting to defaults');
        const roleId = localStorage.getItem('currentRoleId') || '123';
        const initializedStates = initializeSkillStates(roleId);
        set({
          currentStates: initializedStates,
          originalStates: initializedStates,
          hasChanges: false
        });
      },
      setSkillState: (skillTitle: string, level: SkillLevel, levelKey: string, requirement: RequirementType) => {
        console.log('Setting skill state:', { skillTitle, level, levelKey, requirement });
        set((state) => {
          const newStates = {
            ...state.currentStates,
            [skillTitle]: {
              ...state.currentStates[skillTitle],
              [levelKey]: { 
                level, 
                required: requirement 
              }
            }
          };
          
          const hasChanges = JSON.stringify(newStates) !== JSON.stringify(state.originalStates);
          console.log('State updated:', { newStates, hasChanges });
          
          return {
            currentStates: newStates,
            hasChanges,
          };
        });
      },
      saveChanges: () => {
        console.log('Saving changes');
        set((state) => {
          const currentStates = { ...state.currentStates };
          return {
            currentStates,
            originalStates: currentStates,
            hasChanges: false,
          };
        });
      },
      cancelChanges: () => {
        console.log('Cancelling changes');
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
          
          console.log('Getting stored value:', { roleId, storageKey, value });
          
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
            console.log('State persisted successfully:', { roleId, storageKey });
          } catch (error) {
            console.error('Error persisting state:', error);
          }
        },
        removeItem: async (name) => {
          const roleId = localStorage.getItem('currentRoleId') || '123';
          const storageKey = getStorageKey(roleId);
          localStorage.removeItem(storageKey);
          console.log('State removed:', { roleId, storageKey });
        },
      },
      partialize: (state) => ({
        currentStates: state.currentStates,
        originalStates: state.originalStates,
      }),
    }
  )
);