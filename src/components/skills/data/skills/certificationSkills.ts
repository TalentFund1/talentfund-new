import { SkillData } from '../skillTypes';

export const certificationSkills: SkillData[] = [
  {
    title: "AWS Certified Solutions Architect",
    category: "certification",
    subcategory: "Cloud Certification",
    professionalTrack: {
      P1: { level: 'unspecified', requirement: 'preferred' },
      P2: { level: 'beginner', requirement: 'preferred' },
      P3: { level: 'intermediate', requirement: 'preferred' },
      P4: { level: 'advanced', requirement: 'required' },
      P5: { level: 'advanced', requirement: 'required' },
      P6: { level: 'advanced', requirement: 'required' }
    }
  },
  {
    title: "TensorFlow Developer Certificate",
    category: "certification",
    subcategory: "AI Certification",
    professionalTrack: {
      P1: { level: 'unspecified', requirement: 'preferred' },
      P2: { level: 'beginner', requirement: 'preferred' },
      P3: { level: 'intermediate', requirement: 'preferred' },
      P4: { level: 'intermediate', requirement: 'preferred' },
      P5: { level: 'advanced', requirement: 'required' },
      P6: { level: 'advanced', requirement: 'required' }
    }
  }
];