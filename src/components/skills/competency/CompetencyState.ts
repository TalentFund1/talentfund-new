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
    try {
      const parsedStates = JSON.parse(savedStates);
      if (parsedStates && typeof parsedStates === 'object' && parsedStates.currentStates) {
        console.log('Successfully loaded saved states:', parsedStates);
        return parsedStates.currentStates;
      }
    } catch (error) {
      console.error('Error parsing saved states:', error);
    }
  }

  // Initialize with default values if no saved states
  console.log('Initializing with default states');
  const states: Record<string, Record<string, SkillState>> = {};
  
  const allSkills = [
    ...aiSkills,
    ...backendSkills,
    ...commonSkills,
    ...certificationSkills
  ];

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
        set({
          currentStates: initializedStates,
          originalStates: initializedStates,
          hasChanges: false
        });
      },
      setSkillState: (skillName, level, levelKey, required) => {
        console.log('Setting competency state:', { skillName, level, levelKey, required });
        const roleId = localStorage.getItem('currentRoleId') || '123';
        const storageKey = getStorageKey(roleId);
        
        set((state) => {
          const newStates = {
            ...state.currentStates,
            [skillName]: {
              ...(state.currentStates[skillName] || {}),
              [levelKey]: { level, required },
            },
          };
          
          const hasChanges = JSON.stringify(newStates) !== JSON.stringify(state.originalStates);
          
          // Save to localStorage immediately
          const stateToSave = { currentStates: newStates, originalStates: state.originalStates };
          localStorage.setItem(storageKey, JSON.stringify(stateToSave));
          console.log('Saved states to localStorage:', stateToSave);
          
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
          const stateToSave = {
            currentStates: state.currentStates,
            originalStates: state.currentStates // Update originalStates to match currentStates
          };
          
          localStorage.setItem(storageKey, JSON.stringify(stateToSave));
          console.log('Saved changes to localStorage:', stateToSave);
          
          return {
            originalStates: { ...state.currentStates },
            hasChanges: false,
          };
        });
      },
      cancelChanges: () => {
        const roleId = localStorage.getItem('currentRoleId') || '123';
        const storageKey = getStorageKey(roleId);
        
        set((state) => {
          const stateToSave = {
            currentStates: state.originalStates,
            originalStates: state.originalStates
          };
          
          localStorage.setItem(storageKey, JSON.stringify(stateToSave));
          console.log('Cancelled changes, restored from originalStates:', stateToSave);
          
          return {
            currentStates: { ...state.originalStates },
            hasChanges: false,
          };
        });
      },
    }),
    {
      name: 'competency-storage',
      storage: {
        getItem: (name) => {
          const roleId = localStorage.getItem('currentRoleId') || '123';
          const storageKey = getStorageKey(roleId);
          const value = localStorage.getItem(storageKey);
          console.log('Loading stored competency states:', { roleId, storageKey, value });
          return Promise.resolve(value);
        },
        setItem: (name, value) => {
          const roleId = localStorage.getItem('currentRoleId') || '123';
          const storageKey = getStorageKey(roleId);
          console.log('Persisting competency states:', { roleId, storageKey, value });
          localStorage.setItem(storageKey, value);
          return Promise.resolve();
        },
        removeItem: (name) => {
          const roleId = localStorage.getItem('currentRoleId') || '123';
          const storageKey = getStorageKey(roleId);
          localStorage.removeItem(storageKey);
          return Promise.resolve();
        },
      },
    }
  )
);