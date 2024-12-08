import { SkillData } from '../skillLevels';

export const commonSkills: SkillData[] = [
  {
    title: "Problem Solving",
    category: "common",
    subcategory: "Soft Skills",
    professionalTrack: {
      P1: { level: 'intermediate', requirement: 'required' },
      P2: { level: 'intermediate', requirement: 'required' },
      P3: { level: 'advanced', requirement: 'required' },
      P4: { level: 'advanced', requirement: 'required' },
      P5: { level: 'advanced', requirement: 'required' },
      P6: { level: 'advanced', requirement: 'required' }
    }
  },
  {
    title: "Technical Writing",
    category: "common",
    subcategory: "Communication",
    professionalTrack: {
      P1: { level: 'beginner', requirement: 'preferred' },
      P2: { level: 'intermediate', requirement: 'preferred' },
      P3: { level: 'intermediate', requirement: 'preferred' },
      P4: { level: 'advanced', requirement: 'required' },
      P5: { level: 'advanced', requirement: 'required' },
      P6: { level: 'advanced', requirement: 'required' }
    }
  }
];