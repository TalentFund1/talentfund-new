import { create } from 'zustand';

interface Skill {
  title: string;
  subcategory: string;
  level: string;
  growth: string;
  confidence: string;
  selected?: boolean;
}

interface SkillsState {
  skills: Skill[];
  originalSkills: Skill[];
  hasChanges: boolean;
  setSkills: (skills: Skill[]) => void;
  toggleSkill: (skillTitle: string) => void;
  saveChanges: () => void;
  cancelChanges: () => void;
}

export const useSkillsStore = create<SkillsState>((set) => ({
  skills: [],
  originalSkills: [],
  hasChanges: false,
  setSkills: (skills) => set({ skills, originalSkills: skills }),
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
    originalSkills: state.skills,
    hasChanges: false
  })),
  cancelChanges: () => set((state) => ({
    skills: state.originalSkills,
    hasChanges: false
  }))
}));