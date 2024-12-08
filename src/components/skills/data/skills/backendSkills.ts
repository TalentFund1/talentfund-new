import { SkillData } from '../skillLevels';

export const backendSkills: SkillData[] = [
  {
    title: "Node.js",
    category: "specialized",
    subcategory: "Backend Development",
    professionalTrack: {
      P1: { level: 'beginner', requirement: 'required' },
      P2: { level: 'intermediate', requirement: 'required' },
      P3: { level: 'advanced', requirement: 'required' },
      P4: { level: 'advanced', requirement: 'required' },
      P5: { level: 'advanced', requirement: 'required' },
      P6: { level: 'advanced', requirement: 'required' }
    }
  },
  {
    title: "Database Design",
    category: "specialized",
    subcategory: "Data Management",
    professionalTrack: {
      P1: { level: 'beginner', requirement: 'preferred' },
      P2: { level: 'intermediate', requirement: 'required' },
      P3: { level: 'advanced', requirement: 'required' },
      P4: { level: 'advanced', requirement: 'required' },
      P5: { level: 'advanced', requirement: 'required' },
      P6: { level: 'advanced', requirement: 'required' }
    }
  }
];