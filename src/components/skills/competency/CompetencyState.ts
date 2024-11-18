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

const initializeSkillStates = (roleId: string) => {
  console.log('Initializing skill states for role:', roleId);
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

export const useCompetencyStore = create<CompetencyState>()(
  persist(
    (set, get) => ({
      currentStates: {},
      originalStates: {},
      hasChanges: false,
      initializeStates: (roleId: string) => {
        console.log('Initializing states for role:', roleId);
        const initializedStates = initializeSkillStates(roleId);
        const storageKey = `competency-storage-${roleId}`;
        const storedStates = localStorage.getItem(storageKey);
        
        if (storedStates) {
          console.log('Found stored states:', storageKey);
          const parsedStates = JSON.parse(storedStates);
          set({
            currentStates: parsedStates,
            originalStates: parsedStates,
            hasChanges: false
          });
        } else {
          console.log('No stored states found, using initialized states');
          set({
            currentStates: initializedStates,
            originalStates: initializedStates,
            hasChanges: false
          });
        }
      },
      setSkillState: (skillName, level, levelKey, required) => {
        console.log('Setting skill state:', { skillName, level, levelKey, required });
        set((state) => {
          const newCurrentStates = JSON.parse(JSON.stringify(state.currentStates));
          
          if (!newCurrentStates[skillName]) {
            newCurrentStates[skillName] = {};
          }
          
          newCurrentStates[skillName][levelKey] = {
            level,
            required,
          };

          const hasChanges = JSON.stringify(newCurrentStates) !== JSON.stringify(state.originalStates);
          
          // Store the updated state immediately
          const roleId = window.location.pathname.split('/')[2] || '123';
          const storageKey = `competency-storage-${roleId}`;
          localStorage.setItem(storageKey, JSON.stringify(newCurrentStates));
          console.log('Saved states to localStorage:', storageKey);

          return {
            currentStates: newCurrentStates,
            hasChanges,
          };
        });
      },
      saveChanges: () => {
        const state = get();
        const roleId = window.location.pathname.split('/')[2] || '123';
        const storageKey = `competency-storage-${roleId}`;
        localStorage.setItem(storageKey, JSON.stringify(state.currentStates));
        console.log('Saved changes to localStorage:', storageKey);
        
        set({
          originalStates: JSON.parse(JSON.stringify(state.currentStates)),
          hasChanges: false,
        });
      },
      cancelChanges: () => {
        console.log('Cancelling changes');
        set((state) => ({
          currentStates: JSON.parse(JSON.stringify(state.originalStates)),
          hasChanges: false,
        }));
      },
    }),
    {
      name: 'competency-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        currentStates: state.currentStates,
        originalStates: state.originalStates,
      }),
      version: 1,
    }
  )
);