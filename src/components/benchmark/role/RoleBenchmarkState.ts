import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { loadRoleSkills, saveRoleSkills, initializeRoleSkills } from './RoleSkillsManager';

interface RoleBenchmarkState {
  selectedRole: string;
  selectedLevel: string;
  setSelectedRole: (role: string) => void;
  setSelectedLevel: (level: string) => void;
  initializeSkills: (roleId: string, currentSkills: Set<string>) => Set<string>;
}

export const useRoleBenchmarkStore = create<RoleBenchmarkState>()(
  persist(
    (set) => ({
      selectedRole: "123",
      selectedLevel: "p4",
      setSelectedRole: (role) => {
        console.log('Setting selected role:', role);
        set({ selectedRole: role });
      },
      setSelectedLevel: (level) => {
        console.log('Setting selected level:', level);
        set({ selectedLevel: level });
      },
      initializeSkills: (roleId: string, currentSkills: Set<string>): Set<string> => {
        const savedSkills = loadRoleSkills(roleId);
        if (savedSkills.size > 0) {
          console.log('Using saved skills for role:', { roleId, skillCount: savedSkills.size });
          return savedSkills;
        }

        if (currentSkills.size > 0) {
          console.log('Using current skills for role:', { roleId, skillCount: currentSkills.size });
          saveRoleSkills(roleId, currentSkills);
          return currentSkills;
        }

        const initializedSkills = initializeRoleSkills(roleId);
        saveRoleSkills(roleId, initializedSkills);
        return initializedSkills;
      }
    }),
    {
      name: 'role-benchmark-store',
      version: 1,
    }
  )
);