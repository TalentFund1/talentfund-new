import { SkillData } from '../skillTypes';

export const aiSkills: SkillData[] = [
  {
    title: "Machine Learning",
    category: "specialized",
    subcategory: "AI & ML",
    professionalTrack: {
      P1: { level: 'beginner', requirement: 'preferred' },
      P2: { level: 'intermediate', requirement: 'required' },
      P3: { level: 'advanced', requirement: 'required' },
      P4: { level: 'advanced', requirement: 'required' },
      P5: { level: 'advanced', requirement: 'required' },
      P6: { level: 'advanced', requirement: 'required' }
    }
  },
  {
    title: "Deep Learning",
    category: "specialized",
    subcategory: "AI & ML",
    professionalTrack: {
      P1: { level: 'unspecified', requirement: 'preferred' },
      P2: { level: 'beginner', requirement: 'preferred' },
      P3: { level: 'intermediate', requirement: 'preferred' },
      P4: { level: 'intermediate', requirement: 'preferred' },
      P5: { level: 'advanced', requirement: 'preferred' },
      P6: { level: 'advanced', requirement: 'required' }
    }
  },
  {
    title: "Natural Language Processing",
    category: "specialized",
    subcategory: "AI Applications",
    professionalTrack: {
      P1: { level: 'unspecified', requirement: 'preferred' },
      P2: { level: 'beginner', requirement: 'preferred' },
      P3: { level: 'intermediate', requirement: 'preferred' },
      P4: { level: 'advanced', requirement: 'required' },
      P5: { level: 'advanced', requirement: 'required' },
      P6: { level: 'advanced', requirement: 'required' }
    }
  }
];