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
  currentStates: Record<string, Record<string, Record<string, SkillState>>>;
  originalStates: Record<string, Record<string, Record<string, SkillState>>>;
  hasChanges: boolean;
  initializeStates: (roleId: string) => void;
  setSkillState: (skillName: string, level: string, levelKey: string, required: string, roleId: string) => void;
  setSkillProgression: (skillName: string, progression: Record<string, SkillState>) => void;
  saveChanges: () => void;
  cancelChanges: () => void;
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

  const storageKey = getStorageKey(roleId);
  const savedStates = localStorage.getItem(storageKey);
  
  if (savedStates) {
    console.log('Found saved states for role:', roleId);
    try {
      const parsedStates = JSON.parse(savedStates);
      if (parsedStates && typeof parsedStates === 'object') {
        console.log('Successfully loaded saved states for role:', roleId, parsedStates);
        return parsedStates;
      }
    } catch (error) {
      console.error('Error parsing saved states for role:', roleId, error);
    }
  }

  console.log('Initializing with default states for role:', roleId);
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

  localStorage.setItem(storageKey, JSON.stringify(states));
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
        console.log('Setting initial competency states for role:', roleId, initializedStates);
        
        // Force a re-render by creating new object references
        set((state) => ({
          currentStates: {
            ...state.currentStates,
            [roleId]: { ...initializedStates }
          },
          originalStates: {
            ...state.originalStates,
            [roleId]: { ...initializedStates }
          },
          hasChanges: false
        }));
      },
      setSkillState: (skillName, level, levelKey, required, roleId) => {
        console.log('Setting competency state:', { skillName, level, levelKey, required, roleId });
        
        set((state) => {
          // Create new object references to ensure React detects the changes
          const newStates = {
            ...state.currentStates,
            [roleId]: {
              ...(state.currentStates[roleId] || {}),
              [skillName]: {
                ...(state.currentStates[roleId]?.[skillName] || {}),
                [levelKey]: {
                  level,
                  required,
                },
              },
            },
          };
          
          const hasChanges = JSON.stringify(newStates[roleId]) !== JSON.stringify(state.originalStates[roleId]);
          
          // Save to localStorage immediately
          localStorage.setItem(getStorageKey(roleId), JSON.stringify(newStates[roleId]));
          
          return {
            currentStates: newStates,
            hasChanges,
          };
        });
      },
      setSkillProgression: (skillName, progression) => {
        console.log('Setting skill progression:', { skillName, progression });
        set((state) => {
          const roleId = Object.keys(state.currentStates)[0];
          if (!roleId) return state;

          const newStates = {
            ...state.currentStates,
            [roleId]: {
              ...state.currentStates[roleId],
              [skillName]: { ...progression },
            },
          };

          // Save to localStorage immediately
          localStorage.setItem(getStorageKey(roleId), JSON.stringify(newStates[roleId]));

          return {
            currentStates: newStates,
            hasChanges: true,
          };
        });
      },
      saveChanges: () => {
        console.log('Saving competency changes');
        const currentStates = get().currentStates;
        
        // Save all role states to localStorage
        Object.entries(currentStates).forEach(([roleId, roleStates]) => {
          const storageKey = getStorageKey(roleId);
          localStorage.setItem(storageKey, JSON.stringify(roleStates));
          console.log('Saved states to localStorage for role:', roleId);
        });
        
        // Update originalStates with new references
        set((state) => ({
          originalStates: JSON.parse(JSON.stringify(state.currentStates)),
          hasChanges: false,
        }));
      },
      cancelChanges: () => {
        console.log('Cancelling competency changes');
        set((state) => ({
          currentStates: JSON.parse(JSON.stringify(state.originalStates)),
          hasChanges: false,
        }));
      },
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