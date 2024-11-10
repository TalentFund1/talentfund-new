import { create } from 'zustand';

interface Skill {
  title: string;
  subcategory: string;
  level: string;
  growth: string;
  confidence: string;
  isToggled?: boolean;
}

interface SkillsState {
  skills: Skill[];
  originalSkills: Skill[];
  hasChanges: boolean;
  setSkills: (skills: Skill[]) => void;
  setOriginalSkills: (skills: Skill[]) => void;
  setHasChanges: (hasChanges: boolean) => void;
  toggleSkill: (skillTitle: string) => void;
  saveChanges: () => void;
  cancelChanges: () => void;
}

export const useSkillsStore = create<SkillsState>((set) => ({
  skills: [],
  originalSkills: [],
  hasChanges: false,
  setSkills: (skills) => set({ skills }),
  setOriginalSkills: (originalSkills) => set({ originalSkills }),
  setHasChanges: (hasChanges) => set({ hasChanges }),
  toggleSkill: (skillTitle) => 
    set((state) => ({
      skills: state.skills.map(skill => 
        skill.title === skillTitle 
          ? { ...skill, isToggled: !skill.isToggled }
          : skill
      ),
      hasChanges: true
    })),
  saveChanges: () => 
    set((state) => ({ 
      originalSkills: state.skills,
      hasChanges: false 
    })),
  cancelChanges: () => 
    set((state) => ({ 
      skills: state.originalSkills,
      hasChanges: false 
    }))
}));