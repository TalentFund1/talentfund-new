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
  currentStates: Record<string, Record<string, SkillState>>;
  originalStates: Record<string, Record<string, SkillState>>;
  hasChanges: boolean;
  initializeStates: (roleId: string) => void;
  setSkillState: (skillName: string, level: string, levelKey: string, required: string) => void;
  saveChanges: () => void;
  cancelChanges: () => void;
}

const getStorageKey = (roleId: string) => `competency-states-${roleId}`;

const initializeSkillStates = (roleId: string) => {
  console.log('Initializing competency states for role:', roleId);
  
  const storageKey = getStorageKey(roleId);
  const savedStates = localStorage.getItem(storageKey);
  
  if (savedStates) {
    console.log('Found saved states for role:', roleId);
    try {
      const parsedStates = JSON.parse(savedStates);
      if (parsedStates && typeof parsedStates === 'object') {
        console.log('Successfully loaded saved states:', parsedStates);
        return parsedStates;
      }
    } catch (error) {
      console.error('Error parsing saved states:', error);
    }
  }

  console.log('Initializing with default states');
  const states: Record<string, Record<string, SkillState>> = {};
  
  const allSkills = [
    ...aiSkills,
    ...backendSkills,
    ...commonSkills,
    ...certificationSkills
  ];

  allSkills.forEach(skill => {
    states[skill.title] = states[skill.title] || {};
    
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

  // Save initial states to localStorage
  try {
    localStorage.setItem(storageKey, JSON.stringify(states));
    console.log('Saved initial states to localStorage:', states);
  } catch (error) {
    console.error('Error saving initial states:', error);
  }

  return states;
};

export const useCompetencyStore = create<CompetencyState>()(
  persist(
    (set, get) => ({
      currentStates: {},
      originalStates: {},
      hasChanges: false,
      initializeStates: (roleId: string) => {
        const initializedStates = initializeSkillStates(roleId);
        console.log('Setting initial competency states:', initializedStates);
        set({
          currentStates: initializedStates,
          originalStates: initializedStates,
          hasChanges: false
        });
      },
      setSkillState: (skillName, level, levelKey, required) => {
        console.log('Setting competency state:', { skillName, level, levelKey, required });
        set((state) => {
          const newStates = {
            ...state.currentStates,
            [skillName]: {
              ...(state.currentStates[skillName] || {}),
              [levelKey]: {
                level,
                required,
              },
            },
          };
          
          const hasChanges = JSON.stringify(newStates) !== JSON.stringify(state.originalStates);
          
          // Save to localStorage immediately
          const roleId = localStorage.getItem('currentRoleId') || '123';
          const storageKey = getStorageKey(roleId);
          try {
            localStorage.setItem(storageKey, JSON.stringify(newStates));
            console.log('Saved updated states to localStorage:', newStates);
          } catch (error) {
            console.error('Error saving states:', error);
          }
          
          return { 
            currentStates: newStates,
            hasChanges
          };
        });
      },
      saveChanges: () => {
        console.log('Saving competency changes');
        const currentStates = get().currentStates;
        const roleId = localStorage.getItem('currentRoleId') || '123';
        const storageKey = getStorageKey(roleId);
        
        try {
          localStorage.setItem(storageKey, JSON.stringify(currentStates));
          console.log('Saved states to localStorage with key:', storageKey);
          
          set({
            originalStates: { ...currentStates },
            hasChanges: false,
          });
        } catch (error) {
          console.error('Error saving changes:', error);
        }
      },
      cancelChanges: () => {
        console.log('Cancelling competency changes');
        set((state) => ({
          currentStates: { ...state.originalStates },
          hasChanges: false,
        }));
      },
    }),
    {
      name: 'competency-storage',
      storage: {
        getItem: (name) => {
          const roleId = localStorage.getItem('currentRoleId') || '123';
          const storageKey = getStorageKey(roleId);
          try {
            const value = localStorage.getItem(storageKey);
            console.log('Retrieved from storage:', { key: storageKey, value });
            return value;
          } catch (error) {
            console.error('Error retrieving from storage:', error);
            return null;
          }
        },
        setItem: (name, value) => {
          const roleId = localStorage.getItem('currentRoleId') || '123';
          const storageKey = getStorageKey(roleId);
          try {
            localStorage.setItem(storageKey, JSON.stringify(value));
            console.log('Saved to storage:', { key: storageKey, value });
          } catch (error) {
            console.error('Error saving to storage:', error);
          }
        },
        removeItem: (name) => {
          const roleId = localStorage.getItem('currentRoleId') || '123';
          const storageKey = getStorageKey(roleId);
          try {
            localStorage.removeItem(storageKey);
            console.log('Removed from storage:', storageKey);
          } catch (error) {
            console.error('Error removing from storage:', error);
          }
        }
      }
    }
  )
);