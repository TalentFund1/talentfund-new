import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { aiSkills } from '../data/skills/aiSkills';
import { backendSkills } from '../data/skills/backendSkills';
import { commonSkills } from '../data/skills/commonSkills';
import { certificationSkills } from '../data/skills/certificationSkills';
import { CompetencyState, SkillLevel, RequirementType, RoleCompetencyState } from '../types/CompetencyTypes';

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

  // Initialize states with default values
  allSkills.forEach(skill => {
    states[skill.title] = {};
    
    if (skill.professionalTrack) {
      Object.entries(skill.professionalTrack).forEach(([level, state]) => {
        states[skill.title][level.toLowerCase()] = {
          level: "unspecified",
          required: "preferred"
        };
      });
    }
    
    if (skill.managerialTrack) {
      Object.entries(skill.managerialTrack).forEach(([level, state]) => {
        states[skill.title][level.toLowerCase()] = {
          level: "unspecified",
          required: "preferred"
        };
      });
    }
  });

  console.log('Initialized states:', states);
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
        console.log('States initialized:', initializedStates);
      },
      resetToDefaults: () => {
        console.log('Resetting all states to defaults');
        const roleId = localStorage.getItem('currentRoleId') || '123';
        const initializedStates = initializeSkillStates(roleId);
        set({
          currentStates: initializedStates,
          originalStates: initializedStates,
          hasChanges: false
        });
        console.log('States reset to defaults:', initializedStates);
      },
      setSkillState: (skillTitle: string, level: SkillLevel, levelKey: string, requirement: RequirementType) => {
        console.log('Setting skill state:', { skillTitle, level, levelKey, requirement });
        
        set((state) => {
          const newStates = {
            ...state.currentStates,
            [skillTitle]: {
              ...(state.currentStates[skillTitle] || {}),
              [levelKey]: { level, required: requirement },
            },
          };
          
          const hasChanges = JSON.stringify(newStates) !== JSON.stringify(state.originalStates);
          console.log('New states:', newStates);
          console.log('Has changes:', hasChanges);
          
          return {
            currentStates: newStates,
            hasChanges,
          };
        });
      },
      saveChanges: () => {
        console.log('Saving changes');
        set((state) => {
          const newState = {
            originalStates: { ...state.currentStates },
            hasChanges: false,
          };
          console.log('Saved state:', newState);
          return newState;
        });
      },
      cancelChanges: () => {
        console.log('Cancelling changes');
        set((state) => {
          const newState = {
            currentStates: { ...state.originalStates },
            hasChanges: false,
          };
          console.log('Reverted to original state:', newState);
          return newState;
        });
      },
    }),
    {
      name: 'competency-storage',
      storage: {
        getItem: async (name): Promise<any> => {
          const roleId = localStorage.getItem('currentRoleId') || '123';
          const storageKey = getStorageKey(roleId);
          const value = localStorage.getItem(storageKey);
          console.log('Loading stored competency states:', { roleId, storageKey, value });
          
          if (!value) {
            console.log('No stored value found');
            return null;
          }
          
          try {
            const parsed = JSON.parse(value);
            console.log('Successfully parsed stored value:', parsed);
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
          console.log('Persisting competency states:', { roleId, storageKey, newValue });
          
          try {
            const serialized = JSON.stringify(newValue);
            localStorage.setItem(storageKey, serialized);
            console.log('Successfully persisted state');
          } catch (error) {
            console.error('Error persisting state:', error);
          }
        },
        removeItem: async (name) => {
          const roleId = localStorage.getItem('currentRoleId') || '123';
          const storageKey = getStorageKey(roleId);
          localStorage.removeItem(storageKey);
          console.log('Removed stored state for role:', roleId);
        },
      },
    }
  )
);