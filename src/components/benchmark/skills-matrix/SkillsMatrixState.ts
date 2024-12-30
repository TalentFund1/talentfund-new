import { create } from 'zustand';

interface SkillState {
  level: string;
  required: string;
  inDevelopmentPlan?: boolean;
}

interface SkillsMatrixState {
  skillStates: Record<string, Record<string, SkillState>>;
  getSkillState: (employeeId: string, skillName: string) => SkillState;
  setSkillInDevelopmentPlan: (employeeId: string, skillName: string, inDevelopmentPlan: boolean) => void;
}

export const useSkillsMatrixStore = create<SkillsMatrixState>((set, get) => ({
  skillStates: {},

  getSkillState: (employeeId, skillName) => {
    const state = get().skillStates[employeeId]?.[skillName];
    if (!state) {
      console.log('No existing skill state found:', {
        employeeId,
        skillName,
        usingDefault: true
      });
      return {
        level: 'unspecified',
        required: 'unknown',
        inDevelopmentPlan: false
      };
    }
    return state;
  },

  setSkillInDevelopmentPlan: (employeeId, skillName, inDevelopmentPlan) => {
    console.log('Setting skill in development plan:', {
      employeeId,
      skillName,
      inDevelopmentPlan
    });

    set(state => ({
      skillStates: {
        ...state.skillStates,
        [employeeId]: {
          ...state.skillStates[employeeId],
          [skillName]: {
            ...state.skillStates[employeeId]?.[skillName] || {
              level: 'unspecified',
              required: 'unknown'
            },
            inDevelopmentPlan
          }
        }
      }
    }));
  }
}));