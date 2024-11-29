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

export const useRoleStore = create<RoleBenchmarkState>()(
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
        console.log('Initializing skills for role:', {
          roleId,
          currentSkillsCount: currentSkills.size
        });

        // First try to load saved skills
        const savedSkills = loadRoleSkills(roleId);
        if (savedSkills.size > 0) {
          console.log('Using saved skills for role:', {
            roleId,
            skillCount: savedSkills.size,
            skills: Array.from(savedSkills)
          });
          return savedSkills;
        }

        // If no saved skills but we have current skills, save and use those
        if (currentSkills.size > 0) {
          console.log('Using and saving current skills for role:', {
            roleId,
            skillCount: currentSkills.size,
            skills: Array.from(currentSkills)
          });
          saveRoleSkills(roleId, currentSkills);
          return currentSkills;
        }

        // Initialize with default skills if no saved or current skills exist
        const initializedSkills = initializeRoleSkills(roleId);
        console.log('Initialized default skills for role:', {
          roleId,
          skillCount: initializedSkills.size,
          skills: Array.from(initializedSkills)
        });
        
        saveRoleSkills(roleId, initializedSkills);
        return initializedSkills;
      }
    }),
    {
      name: 'role-benchmark-store',
      version: 2, // Increment version to ensure clean state
      partialize: (state) => ({
        selectedRole: state.selectedRole,
        selectedLevel: state.selectedLevel
      })
    }
  )
);