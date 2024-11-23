import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
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
  
  const allSkills = [
    ...aiSkills,
    ...backendSkills,
    ...commonSkills,
    ...certificationSkills
  ];

  const states: Record<string, Record<string, SkillState>> = {};

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
        const initialStates = initializeSkillStates(roleId);
        console.log('Setting initial states:', initialStates);
        set({
          currentStates: initialStates,
          originalStates: initialStates,
          hasChanges: false
        });
      },
      setSkillState: (skillName, level, levelKey, required) => {
        console.log('Setting skill state:', { skillName, level, levelKey, required });
        set((state) => {
          const newStates = {
            ...state.currentStates,
            [skillName]: {
              ...(state.currentStates[skillName] || {}),
              [levelKey]: { level, required }
            }
          };
          
          const hasChanges = JSON.stringify(newStates) !== JSON.stringify(state.originalStates);
          
          return {
            currentStates: newStates,
            hasChanges
          };
        });
      },
      saveChanges: () => {
        console.log('Saving changes');
        const currentStates = get().currentStates;
        set({
          originalStates: { ...currentStates },
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
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        currentStates: state.currentStates,
        originalStates: state.originalStates
      })
    }
  )
);