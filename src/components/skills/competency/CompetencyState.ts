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
        const storedKey = `competency-storage-${roleId}`;
        const storedStates = localStorage.getItem(storedKey);
        
        if (storedStates) {
          const parsedStates = JSON.parse(storedStates);
          console.log('Loading stored states for role:', roleId, parsedStates);
          set({
            currentStates: parsedStates,
            originalStates: parsedStates,
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
      setSkillState: (skillName, level, levelKey, required) =>
        set((state) => {
          const roleId = window.location.pathname.split('/')[2] || '123';
          const newCurrentStates = {
            ...state.currentStates,
            [skillName]: {
              ...state.currentStates[skillName],
              [levelKey]: {
                level,
                required,
              },
            },
          };

          const hasChanges = JSON.stringify(newCurrentStates) !== JSON.stringify(state.originalStates);
          
          // Store the updated state immediately
          const storedKey = `competency-storage-${roleId}`;
          localStorage.setItem(storedKey, JSON.stringify(newCurrentStates));
          console.log('Saving state for role:', roleId, newCurrentStates);

          return {
            currentStates: newCurrentStates,
            hasChanges,
          };
        }),
      saveChanges: () => {
        const state = get();
        const roleId = window.location.pathname.split('/')[2] || '123';
        const storedKey = `competency-storage-${roleId}`;
        localStorage.setItem(storedKey, JSON.stringify(state.currentStates));
        console.log('Saving changes for role:', roleId, state.currentStates);
        
        set({
          originalStates: { ...state.currentStates },
          hasChanges: false,
        });
      },
      cancelChanges: () =>
        set((state) => ({
          currentStates: { ...state.originalStates },
          hasChanges: false,
        })),
    }),
    {
      name: 'competency-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        currentStates: state.currentStates,
        originalStates: state.originalStates,
      }),
    }
  )
);