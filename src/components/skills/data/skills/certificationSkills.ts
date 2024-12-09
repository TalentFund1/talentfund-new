import { UnifiedSkill } from '../../types/SkillTypes';

export const certificationSkills: UnifiedSkill[] = [
  {
    id: 'CT001',
    title: "AWS Certified Machine Learning - Specialty",
    subcategory: "AI/ML Certification",
    category: "certification",
    type: "critical",
    growth: "38%",
    salary: "$190,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'CT002',
    title: "TensorFlow Developer Certificate",
    subcategory: "AI/ML Certification",
    category: "certification",
    type: "technical",
    growth: "28%",
    salary: "$170,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  }
];