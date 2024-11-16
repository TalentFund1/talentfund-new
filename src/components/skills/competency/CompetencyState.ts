import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useToggledSkills } from '../context/ToggledSkillsContext';
import { roleSkills } from '../data/roleSkills';

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
  
  // Get role skills from roleSkills data
  const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills] || roleSkills["123"];
  
  // Combine all skills for the role
  const allSkills = [
    ...(currentRoleSkills.specialized || []),
    ...(currentRoleSkills.common || []),
    ...(currentRoleSkills.certifications || [])
  ];

  // Initialize states only for toggled skills
  allSkills.forEach(skill => {
    states[skill.title] = {};
    
    // Initialize professional track levels (P1-P6)
    ['p1', 'p2', 'p3', 'p4', 'p5', 'p6'].forEach(level => {
      states[skill.title][level] = {
        level: skill.level?.toLowerCase() || 'unspecified',
        required: skill.requirement || 'preferred'
      };
    });

    // Initialize managerial track levels (M3-M6)
    ['m3', 'm4', 'm5', 'm6'].forEach(level => {
      states[skill.title][level] = {
        level: skill.level?.toLowerCase() || 'unspecified',
        required: skill.requirement || 'preferred'
      };
    });
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
          const newState = {
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

          // If this is a new skill state, also update original states
          if (!state.originalStates[skillName]?.[levelKey]) {
            newState.originalStates = {
              ...state.originalStates,
              [skillName]: {
                ...state.originalStates[skillName],
                [levelKey]: {
                  level: "unspecified",
                  required: "preferred",
                },
              },
            };
          }

          return newState;
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