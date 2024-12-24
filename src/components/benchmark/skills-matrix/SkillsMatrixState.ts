import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UnifiedSkill } from '../../skills/types/SkillTypes';
import { useEmployeeStore } from '../../employee/store/employeeStore';
import { filterSkillsByCategory } from '../skills-matrix/skillCategories';
import { EmployeeSkillAchievement, SkillLevel, SkillGoalStatus } from '../../employee/types/employeeSkillTypes';

interface SkillState {
  level: SkillLevel;
  requirement: SkillGoalStatus;
  lastUpdated: string;
}

interface SkillsMatrixState {
  currentStates: { [key: string]: SkillState };
  hasChanges: boolean;
  setSkillState: (skillTitle: string, level: SkillLevel, requirement: SkillGoalStatus) => void;
  resetSkills: () => void;
  initializeState: (skillTitle: string, level: SkillLevel, requirement: SkillGoalStatus) => void;
  saveChanges: () => void;
  cancelChanges: () => void;
}

export const useSkillsMatrixStore = create<SkillsMatrixState>()(
  persist(
    (set) => ({
      currentStates: {},
      hasChanges: false,

      setSkillState: (skillTitle, level, requirement) => {
        console.log('Setting skill state in matrix:', { skillTitle, level, requirement });
        
        // Get current employee ID from URL
        const employeeId = window.location.pathname.split('/').pop();
        
        if (employeeId) {
          // Sync with employee store
          const employeeStore = useEmployeeStore.getState();
          employeeStore.setSkillState(employeeId, skillTitle, level, requirement);
          
          console.log('Synced skill state with employee store:', {
            employeeId,
            skillTitle,
            level,
            requirement
          });
        }

        set((state) => ({
          currentStates: {
            ...state.currentStates,
            [skillTitle]: { 
              level, 
              requirement,
              lastUpdated: new Date().toISOString()
            },
          },
          hasChanges: true,
        }));
      },

      resetSkills: () =>
        set(() => ({
          currentStates: {},
          hasChanges: false,
        })),

      initializeState: (skillTitle, level, requirement) =>
        set((state) => {
          if (!state.currentStates[skillTitle]) {
            console.log('Initializing skill state:', { skillTitle, level, requirement });
            return {
              currentStates: {
                ...state.currentStates,
                [skillTitle]: { 
                  level, 
                  requirement: requirement || 'unknown',
                  lastUpdated: new Date().toISOString()
                },
              },
            };
          }
          return state;
        }),

      saveChanges: () => {
        const employeeId = window.location.pathname.split('/').pop();
        if (employeeId) {
          const employeeStore = useEmployeeStore.getState();
          const { currentStates } = useSkillsMatrixStore.getState();
          
          // Sync all changes to employee store
          Object.entries(currentStates).forEach(([skillTitle, state]) => {
            employeeStore.setSkillState(employeeId, skillTitle, state.level, state.requirement);
          });
          
          console.log('Saved all changes to employee store:', {
            employeeId,
            skillCount: Object.keys(currentStates).length
          });
        }

        set(() => ({
          hasChanges: false,
        }));
      },

      cancelChanges: () =>
        set(() => ({
          hasChanges: false,
        })),
    }),
    {
      name: 'skills-matrix-storage',
      version: 2,
      partialize: (state) => ({
        currentStates: state.currentStates,
      }),
    }
  )
);

export const useSkillsMatrixState = (
  selectedCategory: string,
  selectedLevel: string,
  selectedInterest: string
) => {
  const { currentStates } = useSkillsMatrixStore();

  const filterAndSortSkills = (employeeId: string) => {
    console.log('Filtering skills for employee:', employeeId);
    const employeeSkills = getEmployeeSkills(employeeId);
    let filteredSkills = [...employeeSkills];

    // Filter by category if not "all"
    if (selectedCategory !== "all") {
      filteredSkills = filterSkillsByCategory(filteredSkills, selectedCategory);
    }

    // Filter by level if not "all"
    if (selectedLevel !== "all") {
      filteredSkills = filteredSkills.filter((skill) => {
        const state = currentStates[skill.title];
        return state?.level.toLowerCase() === selectedLevel.toLowerCase();
      });
    }

    // Filter by interest/requirement if not "all"
    if (selectedInterest !== "all") {
      filteredSkills = filteredSkills.filter((skill) => {
        const state = currentStates[skill.title];
        if (!state) return false;

        switch (selectedInterest.toLowerCase()) {
          case "skill_goal":
            return state.requirement === "required" || state.requirement === "skill_goal";
          case "not_interested":
            return state.requirement === "not_interested";
          case "unknown":
            return !state.requirement || state.requirement === "unknown";
          default:
            return state.requirement === selectedInterest.toLowerCase();
        }
      });
    }

    return filteredSkills.sort((a, b) => a.title.localeCompare(b.title));
  };

  return {
    filterAndSortSkills,
  };
};

export const getEmployeeSkills = (employeeId: string): UnifiedSkill[] => {
  console.log('Getting skills for employee:', employeeId);
  return useEmployeeStore.getState().getEmployeeSkills(employeeId);
};

