import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { aiSkills } from '../data/skills/aiSkills';
import { backendSkills } from '../data/skills/backendSkills';
import { commonSkills } from '../data/skills/commonSkills';
import { certificationSkills } from '../data/skills/certificationSkills';

interface SkillState {
  level: string;
  required: string;
}

interface CompetencyState {
  originalStates: Record<string, Record<string, SkillState>>;
  currentStates: Record<string, Record<string, SkillState>>;
  hasChanges: boolean;
  setSkillState: (skillTitle: string, level: string, levelKey: string, requirement: string) => void;
  saveChanges: () => void;
  cancelChanges: () => void;
  initializeStates: (roleId: string) => void;
}

const getStorageKey = (roleId: string) => `competency-states-${roleId}`;

const initializeSkillStates = (roleId: string) => {
  console.log('Initializing competency states for role:', roleId);
  
  const states: Record<string, Record<string, SkillState>> = {};
  
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
          level: state.level,
          required: state.requirement
        };
      });
    }
    
    if (skill.managerialTrack) {
      Object.entries(skill.managerialTrack).forEach(([level, state]) => {
        states[skill.title][level.toLowerCase()] = {
          level: state.level,
          required: state.requirement
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
        const storageKey = getStorageKey(roleId);
        console.log('Loading stored states for role:', roleId);
        
        try {
          const storedValue = localStorage.getItem(storageKey);
          let initializedStates;
          
          if (storedValue) {
            const parsed = JSON.parse(storedValue);
            initializedStates = parsed.state?.currentStates || initializeSkillStates(roleId);
            console.log('Found stored states:', initializedStates);
          } else {
            initializedStates = initializeSkillStates(roleId);
            console.log('No stored states found, using default:', initializedStates);
          }
          
          set({
            currentStates: initializedStates,
            originalStates: initializedStates,
            hasChanges: false
          });
        } catch (error) {
          console.error('Error initializing states:', error);
          const defaultStates = initializeSkillStates(roleId);
          set({
            currentStates: defaultStates,
            originalStates: defaultStates,
            hasChanges: false
          });
        }
      },
      setSkillState: (skillName, level, levelKey, required) => {
        console.log('Setting skill state:', { skillName, level, levelKey, required });
        
        set((state) => {
          const newStates = {
            ...state.currentStates,
            [skillName]: {
              ...(state.currentStates[skillName] || {}),
              [levelKey]: { level, required },
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
        const roleId = localStorage.getItem('currentRoleId') || '123';
        const storageKey = getStorageKey(roleId);
        
        set((state) => {
          const newState = {
            originalStates: { ...state.currentStates },
            hasChanges: false,
          };
          
          try {
            localStorage.setItem(storageKey, JSON.stringify({
              state: {
                currentStates: state.currentStates,
                originalStates: state.currentStates
              },
              version: 0
            }));
            console.log('Successfully saved states to storage:', storageKey);
          } catch (error) {
            console.error('Error saving states:', error);
          }
          
          return newState;
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
              version: 0
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
            localStorage.setItem(storageKey, JSON.stringify(newValue));
            console.log('Successfully persisted state to:', storageKey);
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
      partialize: (state) => ({
        currentStates: state.currentStates,
        originalStates: state.originalStates,
      }),
    }
  )
);