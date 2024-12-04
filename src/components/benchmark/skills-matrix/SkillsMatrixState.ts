import { create } from 'zustand';

interface SkillState {
  level: string;
  requirement: string;
}

interface RoleData {
  title: string;
  soc: string;
  function: string;
  track: string;
}

interface SkillsMatrixStore {
  skillStates: { [key: string]: SkillState };
  roles: { [key: string]: RoleData };
  setSkillState: (skill: string, level: string, requirement: string) => void;
  addRole: (roleId: string, roleData: RoleData) => void;
  getRole: (roleId: string) => RoleData | undefined;
}

export const useSkillsMatrixStore = create<SkillsMatrixStore>((set, get) => ({
  skillStates: {},
  roles: {},
  setSkillState: (skill, level, requirement) => {
    set((state) => ({
      skillStates: {
        ...state.skillStates,
        [skill]: { level, requirement }
      }
    }));
  },
  addRole: (roleId, roleData) => {
    console.log('Adding role to SkillsMatrixStore:', { roleId, roleData });
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
  }
}));