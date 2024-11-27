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
  setSkillProgression: (skillName: string, progression: Record<string, SkillState>, roleId?: string) => void;
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
    try {
      const parsedStates = JSON.parse(savedStates);
      if (parsedStates && typeof parsedStates === 'object') {
        console.log('Successfully loaded saved states for role:', roleId);
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
          level: state.level || 'unspecified',
          required: state.requirement || 'preferred'
        };
      });
    }
    
    if (skill.managerialTrack) {
      Object.entries(skill.managerialTrack).forEach(([level, state]) => {
        states[skill.title][level.toLowerCase()] = {
          level: state.level || 'unspecified',
          required: state.requirement || 'preferred'
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
        console.log('Setting initial competency states for role:', roleId);
        
        set((state) => {
          const newState = {
            currentStates: {
              ...state.currentStates,
              [roleId]: JSON.parse(JSON.stringify(initializedStates))
            },
            originalStates: {
              ...state.originalStates,
              [roleId]: JSON.parse(JSON.stringify(initializedStates))
            },
            hasChanges: false
          };
          
          localStorage.setItem(getStorageKey(roleId), JSON.stringify(initializedStates));
          
          return newState;
        });
      },
      setSkillState: (skillName, level, levelKey, required, roleId) => {
        console.log('Setting competency state:', { skillName, level, levelKey, required, roleId });
        
        set((state) => {
          const newStates = JSON.parse(JSON.stringify(state.currentStates));
          
          if (!newStates[roleId]) {
            newStates[roleId] = {};
          }
          if (!newStates[roleId][skillName]) {
            newStates[roleId][skillName] = {};
          }
          
          newStates[roleId][skillName][levelKey] = {
            level,
            required,
          };
          
          const hasChanges = JSON.stringify(newStates[roleId]) !== JSON.stringify(state.originalStates[roleId]);
          
          localStorage.setItem(getStorageKey(roleId), JSON.stringify(newStates[roleId]));
          
          return { 
            currentStates: newStates,
            hasChanges
          };
        });
      },
      setSkillProgression: (skillName, progression, roleId) => {
        console.log('Setting skill progression:', { skillName, progression, roleId });
        
        set((state) => {
          const currentRoleId = roleId || Object.keys(state.currentStates)[0];
          if (!currentRoleId) return state;

          const newStates = JSON.parse(JSON.stringify(state.currentStates));
          
          if (!newStates[currentRoleId]) {
            newStates[currentRoleId] = {};
          }
          
          if (!newStates[currentRoleId][skillName]) {
            newStates[currentRoleId][skillName] = {};
          }

          // Merge the progression with existing states
          newStates[currentRoleId][skillName] = {
            ...newStates[currentRoleId][skillName],
            ...progression
          };

          localStorage.setItem(getStorageKey(currentRoleId), JSON.stringify(newStates[currentRoleId]));

          return {
            currentStates: newStates,
            hasChanges: true,
          };
        });
      },
      saveChanges: () => {
        const currentStates = get().currentStates;
        
        Object.entries(currentStates).forEach(([roleId, roleStates]) => {
          localStorage.setItem(getStorageKey(roleId), JSON.stringify(roleStates));
        });
        
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