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
    if (skill.professionalTrack) {
      states[skill.title] = {};
      Object.entries(skill.professionalTrack).forEach(([level, state]) => {
        states[skill.title][level.toLowerCase()] = {
          level: state.level,
          required: state.requirement
        };
      });
    }
    
    if (skill.managerialTrack) {
      states[skill.title] = {
        ...states[skill.title],
        ...Object.entries(skill.managerialTrack).reduce((acc, [level, state]) => ({
          ...acc,
          [level.toLowerCase()]: {
            level: state.level,
            required: state.requirement
          }
        }), {})
      };
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
      initializeStates: (roleId: string) => 
        set((state) => {
          const initializedStates = initializeSkillStates(roleId);
          return {
            currentStates: { ...initializedStates },
            originalStates: { ...initializedStates },
            hasChanges: false
          };
        }),
      setSkillState: (skillName, level, levelKey, required) =>
        set((state) => {
          if (!state.originalStates[skillName]?.[levelKey]) {
            return {
              originalStates: {
                ...state.originalStates,
                [skillName]: {
                  ...state.originalStates[skillName],
                  [levelKey]: {
                    level: state.currentStates[skillName]?.[levelKey]?.level || "unspecified",
                    required: state.currentStates[skillName]?.[levelKey]?.required || "preferred",
                  },
                },
              },
              currentStates: {
                ...state.currentStates,
                [skillName]: {
                  ...state.currentStates[skillName],
                  [levelKey]: {
                    level,
                    required,
                  },
                },
              },
              hasChanges: true,
            };
          }
          
          return {
            ...state,
            currentStates: {
              ...state.currentStates,
              [skillName]: {
                ...state.currentStates[skillName],
                [levelKey]: {
                  level,
                  required,
                },
              },
            },
            hasChanges: true,
          };
        }),
      saveChanges: () => 
        set((state) => ({
          hasChanges: false,
          originalStates: { ...state.currentStates },
        })),
      cancelChanges: () =>
        set((state) => ({
          currentStates: { ...state.originalStates },
          hasChanges: false,
        })),
    }),
    {
      name: 'competency-storage',
      skipHydration: false,
    }
  )
);