import { create } from 'zustand';

export interface Skill {
  title: string;
  subcategory: string;
  level: string;
  growth: string;
  confidence: string;
  selected?: boolean;
  requirement?: string;
}

interface SkillsState {
  skills: Skill[];
  originalSkills: Skill[];
  hasChanges: boolean;
  setSkills: (skills: Skill[] | ((prev: Skill[]) => Skill[])) => void;
  toggleSkill: (skillTitle: string) => void;
  saveChanges: () => void;
  cancelChanges: () => void;
  setHasChanges: (value: boolean) => void;
}

export const useSkillsStore = create<SkillsState>((set) => ({
  skills: [],
  originalSkills: [],
  hasChanges: false,
  setSkills: (skills) => set((state) => {
    const newSkills = typeof skills === 'function' ? skills(state.skills) : skills;
    return { 
      skills: newSkills, 
      originalSkills: state.originalSkills.length === 0 ? newSkills : state.originalSkills 
    };
  }),
  toggleSkill: (skillTitle) => set((state) => {
    const updatedSkills = state.skills.map(skill => 
      skill.title === skillTitle 
        ? { ...skill, selected: !skill.selected }
        : skill
    );
    return {
      skills: updatedSkills,
      hasChanges: JSON.stringify(updatedSkills) !== JSON.stringify(state.originalSkills)
    };
  }),
  saveChanges: () => set((state) => ({
    originalSkills: [...state.skills],
    hasChanges: false
  })),
  cancelChanges: () => set((state) => ({
    skills: [...state.originalSkills],
    hasChanges: false
  })),
  setHasChanges: (value) => set({ hasChanges: value })
}));