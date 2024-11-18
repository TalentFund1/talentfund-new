import { create } from 'zustand';

interface RoleState {
  selectedRole: string;
  selectedLevel: string;
  setSelectedRole: (role: string) => void;
  setSelectedLevel: (level: string) => void;
}

export const useRoleStore = create<RoleState>((set) => ({
  selectedRole: "123",
  selectedLevel: "p4",
  setSelectedRole: (role) => set({ selectedRole: role }),
  setSelectedLevel: (level) => set({ selectedLevel: level })
}));