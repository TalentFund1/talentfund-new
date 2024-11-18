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

const initializeSkillStates = (roleId: string) => {
  console.log('Initializing skill states for role:', roleId);
  const states: Record<string, Record<string, SkillState>> = {};
  
  const allSkills = [
    ...aiSkills,
    ...backendSkills,
    ...commonSkills,
    ...certificationSkills
  ];

  allSkills.forEach(skill => {
    states[skill.title] = {};
    
    // Initialize professional track states
    if (skill.professionalTrack) {
      Object.entries(skill.professionalTrack).forEach(([level, state]) => {
        if (!states[skill.title]) {
          states[skill.title] = {};
        }
        states[skill.title][level.toLowerCase()] = {
          level: state.level || 'unspecified',
          required: state.requirement || 'preferred'
        };
      });
    }
    
    // Initialize managerial track states
    if (skill.managerialTrack) {
      Object.entries(skill.managerialTrack).forEach(([level, state]) => {
        if (!states[skill.title]) {
          states[skill.title] = {};
        }
        states[skill.title][level.toLowerCase()] = {
          level: state.level || 'unspecified',
          required: state.requirement || 'preferred'
        };
      });
    }
  });

  console.log('Initialized states:', states);
  return states;
};

const getStorageKey = (roleId: string) => `competency-states-${roleId}-v1`;

export const useCompetencyStore = create<CompetencyState>()(
  persist(
    (set, get) => ({
      currentStates: {},
      originalStates: {},
      hasChanges: false,
      initializeStates: (roleId: string) => {
        console.log('Initializing states for role:', roleId);
        const storageKey = getStorageKey(roleId);
        
        // Try to load from localStorage first
        const storedStatesJson = localStorage.getItem(storageKey);
        console.log('Stored states found:', storedStatesJson ? 'yes' : 'no');
        
        if (storedStatesJson) {
          try {
            const storedStates = JSON.parse(storedStatesJson);
            console.log('Successfully loaded stored states');
            set({
              currentStates: storedStates,
              originalStates: storedStates,
              hasChanges: false
            });
          } catch (error) {
            console.error('Error parsing stored states:', error);
            const initialStates = initializeSkillStates(roleId);
            set({
              currentStates: initialStates,
              originalStates: initialStates,
              hasChanges: false
            });
          }
        } else {
          console.log('No stored states found, initializing new states');
          const initialStates = initializeSkillStates(roleId);
          set({
              currentStates: initialStates,
              originalStates: initialStates,
              hasChanges: false
          });
        }
      },
      setSkillState: (skillName, level, levelKey, required) => {
        console.log('Setting skill state:', { skillName, level, levelKey, required });
        set((state) => {
          const newCurrentStates = { ...state.currentStates };
          
          // Ensure the skill object exists
          if (!newCurrentStates[skillName]) {
            newCurrentStates[skillName] = {};
          }
          
          // Update the specific level state
          newCurrentStates[skillName][levelKey] = {
            level,
            required
          };

          const hasChanges = JSON.stringify(newCurrentStates) !== JSON.stringify(state.originalStates);
          
          // Save to localStorage immediately
          const roleId = window.location.pathname.split('/')[2] || '123';
          const storageKey = getStorageKey(roleId);
          localStorage.setItem(storageKey, JSON.stringify(newCurrentStates));
          console.log('Saved state to localStorage:', storageKey);

          return {
            currentStates: newCurrentStates,
            hasChanges
          };
        });
      },
      saveChanges: () => {
        const state = get();
        const roleId = window.location.pathname.split('/')[2] || '123';
        const storageKey = getStorageKey(roleId);
        
        localStorage.setItem(storageKey, JSON.stringify(state.currentStates));
        console.log('Saved changes to localStorage:', storageKey);
        
        set({
          originalStates: { ...state.currentStates },
          hasChanges: false
        });
      },
      cancelChanges: () => {
        console.log('Cancelling changes');
        set((state) => ({
          currentStates: { ...state.originalStates },
          hasChanges: false
        }));
      }
    }),
    {
      name: 'competency-storage',
      storage: {
        getItem: (name) => {
          const roleId = window.location.pathname.split('/')[2] || '123';
          const storageKey = getStorageKey(roleId);
          const value = localStorage.getItem(storageKey);
          console.log('Loading from storage:', storageKey, value ? 'found' : 'not found');
          return value;
        },
        setItem: (name, value) => {
          const roleId = window.location.pathname.split('/')[2] || '123';
          const storageKey = getStorageKey(roleId);
          console.log('Saving to storage:', storageKey);
          localStorage.setItem(storageKey, value);
        },
        removeItem: (name) => {
          const roleId = window.location.pathname.split('/')[2] || '123';
          const storageKey = getStorageKey(roleId);
          localStorage.removeItem(storageKey);
        }
      },
      partialize: (state) => ({
        currentStates: state.currentStates,
        originalStates: state.originalStates
      }),
      version: 1
    }
  )
);