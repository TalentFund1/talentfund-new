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
  resetToDefaults: () => void;
}

const getDefaultState = () => {
  const states: Record<string, Record<string, SkillState>> = {};
  
  const allSkills = [
    ...aiSkills,
    ...backendSkills,
    ...commonSkills,
    ...certificationSkills
  ];

  allSkills.forEach(skill => {
    states[skill.title] = {};
    
    // Initialize all levels with default values
    if (skill.professionalTrack) {
      Object.keys(skill.professionalTrack).forEach(level => {
        states[skill.title][level.toLowerCase()] = {
          level: 'unspecified',
          required: 'preferred'
        };
      });
    }
    
    if (skill.managerialTrack) {
      Object.keys(skill.managerialTrack).forEach(level => {
        states[skill.title][level.toLowerCase()] = {
          level: 'unspecified',
          required: 'preferred'
        };
      });
    }
  });

  return states;
};

const initializeSkillStates = (roleId: string) => {
  console.log('Initializing competency states for role:', roleId);
  return getDefaultState();
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
        set((state) => ({
          originalStates: { ...state.currentStates },
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
      resetToDefaults: () => {
        console.log('Resetting to default states');
        const defaultStates = getDefaultState();
        set({
          currentStates: defaultStates,
          originalStates: defaultStates,
          hasChanges: false
        });
      }
    }),
    {
      name: 'competency-storage',
      skipHydration: true,
      partialize: (state) => ({
        originalStates: state.originalStates,
        currentStates: state.currentStates,
      }),
    }
  )
);