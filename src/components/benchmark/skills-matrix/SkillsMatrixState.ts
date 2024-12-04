import { create } from 'zustand';

interface SkillState {
  level: string;
  requirement: string;
}

interface RoleData {
  title: string;
  description: string;
  skills: string[];
  soc?: string;  // Added soc as optional property
  function?: string;  // Added function as it's used in AddSkillProfileForm
  track?: string;    // Added track as it's used in AddSkillProfileForm
}

interface SkillsMatrixStore {
  skillStates: { [key: string]: SkillState };
  roles: { [key: string]: RoleData };
  currentStates: { [key: string]: SkillState };
  originalStates: { [key: string]: SkillState };
  hasChanges: boolean;
  setSkillState: (skill: string, level: string, requirement: string) => void;
  addRole: (roleId: string, roleData: RoleData) => void;
  getRole: (roleId: string) => RoleData | undefined;
  saveChanges: () => void;
  cancelChanges: () => void;
  initializeState: (skillTitle: string, initialLevel: string, initialRequirement: string) => void;
}

export const useSkillsMatrixStore = create<SkillsMatrixStore>((set, get) => ({
  skillStates: {},
  roles: {},
  currentStates: {},
  originalStates: {},
  hasChanges: false,
  setSkillState: (skill, level, requirement) => {
    console.log('Setting skill state:', { skill, level, requirement });
    set((state) => ({
      currentStates: {
        ...state.currentStates,
        [skill]: { level, requirement }
      },
      hasChanges: true
    }));
  },
  addRole: (roleId, roleData) => {
    console.log('Adding role:', { roleId, roleData });
    set((state) => ({
      roles: {
        ...state.roles,
        [roleId]: roleData
      }
    }));
  },
  getRole: (roleId) => {
    const state = get();
    return state.roles[roleId];
  },
  saveChanges: () => {
    console.log('Saving changes in SkillsMatrixStore');
    set((state) => ({
      originalStates: { ...state.currentStates },
      hasChanges: false
    }));
  },
  cancelChanges: () => {
    console.log('Canceling changes in SkillsMatrixStore');
    set((state) => ({
      currentStates: { ...state.originalStates },
      hasChanges: false
    }));
  },
  initializeState: (skillTitle, initialLevel, initialRequirement) => {
    console.log('Initializing state for skill:', {
      skillTitle,
      initialLevel,
      initialRequirement
    });
    
    set((state) => {
      // Only initialize if not already present
      if (!state.currentStates[skillTitle]) {
        return {
          currentStates: {
            ...state.currentStates,
            [skillTitle]: {
              level: initialLevel,
              requirement: initialRequirement
            }
          },
          originalStates: {
            ...state.originalStates,
            [skillTitle]: {
              level: initialLevel,
              requirement: initialRequirement
            }
          }
        };
      }
      return state;
    });
  }
}));