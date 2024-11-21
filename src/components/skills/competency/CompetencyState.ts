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
  console.log('Initializing competency states for role:', roleId);
  const states: Record<string, Record<string, SkillState>> = {};
  
  const allSkills = [
    ...aiSkills,
    ...backendSkills,
    ...commonSkills,
    ...certificationSkills
  ];

  // First try to load from localStorage
  const savedStates = localStorage.getItem(`competency-states-${roleId}`);
  if (savedStates) {
    console.log('Found saved states for role:', roleId);
    try {
      return JSON.parse(savedStates);
    } catch (error) {
      console.error('Error parsing saved states:', error);
    }
  }

  // If no saved states, initialize with default values
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
          
          return {
            currentStates: newStates,
            hasChanges,
          };
        });
      },
      saveChanges: () => {
        console.log('Saving competency changes');
        const currentStates = get().currentStates;
        const roleId = localStorage.getItem('currentRoleId') || '123';
        
        // Save to localStorage
        localStorage.setItem(`competency-states-${roleId}`, JSON.stringify(currentStates));
        
        set((state) => ({
          originalStates: { ...currentStates },
          hasChanges: false,
        }));
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
      skipHydration: false,
      partialize: (state) => ({
        originalStates: state.originalStates,
        currentStates: state.currentStates,
      }),
    }
  )
);