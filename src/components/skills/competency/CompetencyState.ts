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

  return states;
};

const getStorageKey = (roleId: string) => `competency-storage-${roleId}`;

export const useCompetencyStore = create<CompetencyState>()(
  persist(
    (set, get) => ({
      currentStates: {},
      originalStates: {},
      hasChanges: false,
      initializeStates: (roleId: string) => {
        const storedKey = getStorageKey(roleId);
        let storedStates;
        
        try {
          const stored = localStorage.getItem(storedKey);
          storedStates = stored ? JSON.parse(stored) : null;
        } catch (error) {
          console.error('Error loading stored states:', error);
          storedStates = null;
        }
        
        if (storedStates) {
          console.log('Loading stored states for role:', roleId, storedStates);
          set({
            currentStates: storedStates,
            originalStates: storedStates,
            hasChanges: false
          });
        } else {
          const initializedStates = initializeSkillStates(roleId);
          console.log('Initializing new states for role:', roleId, initializedStates);
          set({
            currentStates: initializedStates,
            originalStates: initializedStates,
            hasChanges: false
          });
        }
      },
      setSkillState: (skillName, level, levelKey, required) => {
        const roleId = window.location.pathname.split('/')[2] || '123';
        const currentState = get().currentStates;
        
        const newCurrentStates = {
          ...currentState,
          [skillName]: {
            ...(currentState[skillName] || {}),
            [levelKey]: {
              level,
              required,
            },
          },
        };

        const hasChanges = JSON.stringify(newCurrentStates) !== JSON.stringify(get().originalStates);
        
        // Store the updated state immediately
        try {
          const storedKey = getStorageKey(roleId);
          localStorage.setItem(storedKey, JSON.stringify(newCurrentStates));
          console.log('Saving state for role:', roleId, newCurrentStates);
        } catch (error) {
          console.error('Error saving state:', error);
        }

        set({
          currentStates: newCurrentStates,
          hasChanges,
        });
      },
      saveChanges: () => {
        const state = get();
        const roleId = window.location.pathname.split('/')[2] || '123';
        
        try {
          const storedKey = getStorageKey(roleId);
          localStorage.setItem(storedKey, JSON.stringify(state.currentStates));
          console.log('Saving changes for role:', roleId, state.currentStates);
          
          set({
            originalStates: { ...state.currentStates },
            hasChanges: false,
          });
        } catch (error) {
          console.error('Error saving changes:', error);
        }
      },
      cancelChanges: () =>
        set((state) => ({
          currentStates: { ...state.originalStates },
          hasChanges: false,
        })),
    }),
    {
      name: 'skills-matrix-storage',
      skipHydration: false,
      partialize: (state) => ({
        originalStates: state.originalStates,
        currentStates: state.currentStates,
      }),
    }
  )
);