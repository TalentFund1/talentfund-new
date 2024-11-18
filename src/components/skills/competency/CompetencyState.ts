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
        const initializedStates = initializeSkillStates(roleId);
        const storedStates = localStorage.getItem(`competency-storage-${roleId}`);
        
        if (storedStates) {
          const parsedStates = JSON.parse(storedStates);
          set({
            currentStates: parsedStates,
            originalStates: parsedStates,
            hasChanges: false
          });
        } else {
          set({
            currentStates: initializedStates,
            originalStates: initializedStates,
            hasChanges: false
          });
        }
      },
      setSkillState: (skillName, level, levelKey, required) =>
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
          localStorage.setItem(`competency-storage-${roleId}`, JSON.stringify(newCurrentStates));

          return {
            currentStates: newCurrentStates,
            hasChanges,
          };
        }),
      saveChanges: () => {
        const state = get();
        const roleId = window.location.pathname.split('/')[2] || '123';
        localStorage.setItem(`competency-storage-${roleId}`, JSON.stringify(state.currentStates));
        
        set({
          originalStates: JSON.parse(JSON.stringify(state.currentStates)),
          hasChanges: false,
        });
      },
      cancelChanges: () =>
        set((state) => ({
          currentStates: JSON.parse(JSON.stringify(state.originalStates)),
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