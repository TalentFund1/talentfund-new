import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CompetencyState, SkillState } from './state/types';
import { initializeSkillStates } from './state/initialState';
import { roleSkills } from '../data/roleSkills';

export const useCompetencyStore = create<CompetencyState>()(
  persist(
    (set, get) => ({
      currentStates: {},
      originalStates: {},
      hasChanges: false,
      setSkillState: (skillName, level, levelKey, required) => {
        console.log('Setting competency state:', { 
          skillName, 
          level, 
          levelKey, 
          required,
          currentStates: get().currentStates
        });
        
        set((state) => {
          // Deep copy the current states to avoid reference issues
          const newStates = JSON.parse(JSON.stringify({
            ...state.currentStates,
            [skillName]: {
              ...state.currentStates[skillName],
              [levelKey]: {
                level,
                required,
              },
            },
          }));
          
          console.log('Updated competency states:', {
            previous: state.currentStates,
            new: newStates
          });
          
          const hasChanges = JSON.stringify(newStates) !== JSON.stringify(state.originalStates);
          
          return { 
            currentStates: newStates,
            hasChanges
          };
        });
      },
      setSkillProgression: (skillName, progression) => {
        console.log('Setting skill progression:', { 
          skillName, 
          progression,
          currentStates: get().currentStates 
        });
        
        set((state) => {
          const newStates = JSON.parse(JSON.stringify({
            ...state.currentStates,
            [skillName]: {
              ...state.currentStates[skillName],
              ...progression,
            },
          }));
          
          return {
            currentStates: newStates,
            hasChanges: true
          };
        });
      },
      resetLevels: () => {
        console.log('Resetting all levels to default values');
        const defaultStates = initializeSkillStates("123"); // Initialize with default role
        
        set({
          currentStates: defaultStates,
          originalStates: defaultStates,
          hasChanges: false
        });
      },
      saveChanges: () => {
        console.log('Saving competency changes');
        set((state) => ({
          originalStates: JSON.parse(JSON.stringify(state.currentStates)),
          hasChanges: false
        }));
      },
      cancelChanges: () => {
        console.log('Cancelling competency changes');
        set((state) => ({
          currentStates: JSON.parse(JSON.stringify(state.originalStates)),
          hasChanges: false
        }));
      },
      initializeState: (roleId: string) => {
        console.log('Initializing competency state for role:', roleId);
        
        // Get the role's skills
        const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills] || roleSkills["123"];
        const allSkills = [
          ...(currentRoleSkills.specialized || []),
          ...(currentRoleSkills.common || []),
          ...(currentRoleSkills.certifications || [])
        ];

        // Create initial states for all skills
        const initialStates: Record<string, Record<string, SkillState>> = {};
        
        allSkills.forEach(skill => {
          initialStates[skill.title] = {};
          
          // Initialize P1-P6 levels
          ['p1', 'p2', 'p3', 'p4', 'p5', 'p6'].forEach(level => {
            initialStates[skill.title][level] = {
              level: skill.level || 'advanced',
              required: skill.requirement || 'required'
            };
          });
          
          // Initialize M3-M6 levels
          ['m3', 'm4', 'm5', 'm6'].forEach(level => {
            initialStates[skill.title][level] = {
              level: skill.level || 'advanced',
              required: skill.requirement || 'required'
            };
          });
        });

        console.log('Setting initial states:', initialStates);
        
        set({
          currentStates: initialStates,
          originalStates: JSON.parse(JSON.stringify(initialStates)),
          hasChanges: false
        });
      }
    }),
    {
      name: 'competency-storage',
      version: 2, // Increment version to force rehydration
      skipHydration: false,
      partialize: (state) => ({
        currentStates: state.currentStates,
        originalStates: state.originalStates
      }),
      onRehydrateStorage: () => (state) => {
        console.log('Rehydrated competency state:', state);
      }
    }
  )
);