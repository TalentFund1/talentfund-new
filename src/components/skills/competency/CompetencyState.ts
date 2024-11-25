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
  states: Record<string, Record<string, Record<string, SkillState>>>;
  currentStates: Record<string, Record<string, Record<string, SkillState>>>;
  hasChanges: boolean;
  initializeStates: (employeeId: string) => void;
  setSkillState: (skillName: string, level: string, levelKey: string, required: string, employeeId: string) => void;
  saveChanges: () => void;
  cancelChanges: () => void;
}

const getStorageKey = (employeeId: string) => `competency-states-${employeeId}`;

const initializeSkillStates = (employeeId: string) => {
  console.log('Initializing competency states for employee:', employeeId);
  const states: Record<string, Record<string, SkillState>> = {};
  
  const allSkills = [
    ...aiSkills,
    ...backendSkills,
    ...commonSkills,
    ...certificationSkills
  ];

  // First try to load from localStorage
  const storageKey = getStorageKey(employeeId);
  const savedStates = localStorage.getItem(storageKey);
  
  if (savedStates) {
    console.log('Found saved states for employee:', employeeId);
    try {
      const parsedStates = JSON.parse(savedStates);
      if (parsedStates && typeof parsedStates === 'object') {
        console.log('Successfully loaded saved states for employee:', employeeId, parsedStates);
        return parsedStates;
      }
    } catch (error) {
      console.error('Error parsing saved states for employee:', employeeId, error);
    }
  }

  // If no saved states or invalid data, initialize with default values
  console.log('Initializing with default states for employee:', employeeId);
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

  // Save initial states to localStorage
  localStorage.setItem(storageKey, JSON.stringify(states));
  return states;
};

export const useCompetencyStore = create<CompetencyState>()(
  persist(
    (set, get) => ({
      states: {},
      currentStates: {},
      hasChanges: false,
      initializeStates: (employeeId: string) => {
        const initializedStates = initializeSkillStates(employeeId);
        console.log('Setting initial competency states for employee:', employeeId, initializedStates);
        set((state) => ({
          states: {
            ...state.states,
            [employeeId]: initializedStates
          },
          currentStates: {
            ...state.currentStates,
            [employeeId]: initializedStates
          },
          hasChanges: false
        }));
      },
      setSkillState: (skillName, level, levelKey, required, employeeId) => {
        console.log('Setting competency state:', { skillName, level, levelKey, required, employeeId });
        set((state) => {
          const newStates = {
            ...state.states,
            [employeeId]: {
              ...(state.states[employeeId] || {}),
              [skillName]: {
                ...(state.states[employeeId]?.[skillName] || {}),
                [levelKey]: {
                  level,
                  required,
                },
              },
            },
          };
          
          return {
            states: newStates,
            currentStates: newStates,
            hasChanges: true,
          };
        });
      },
      saveChanges: () => {
        console.log('Saving competency changes');
        const states = get().states;
        Object.entries(states).forEach(([employeeId, employeeStates]) => {
          const storageKey = getStorageKey(employeeId);
          localStorage.setItem(storageKey, JSON.stringify(employeeStates));
          console.log('Saved states to localStorage for employee:', employeeId);
        });
        
        set({ hasChanges: false });
      },
      cancelChanges: () => {
        console.log('Cancelling competency changes');
        set({ hasChanges: false });
      },
    }),
    {
      name: 'competency-storage',
      partialize: (state) => ({
        states: state.states,
        currentStates: state.currentStates,
      }),
    }
  )
);