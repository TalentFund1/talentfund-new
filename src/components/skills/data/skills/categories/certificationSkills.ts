import { UnifiedSkill } from '../../../types/SkillTypes';

export const certificationSkills: UnifiedSkill[] = [
  {
    id: 'SKILL_CER_160',
    title: "Certified AI Professional",
    subcategory: "General",
    category: "certification",
    businessCategory: "Information Technology",
    weight: "necessary",
    level: "intermediate",
    growth: "10%",
    salary: "$145,000",
    skillScore: 78,
    minimumLevel: "beginner",
    requirementLevel: "required",
    metrics: {
      growth: "10%",
      salary: "$145,000",
      skillScore: 78
    },
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL_KUB_785',
    title: "Kubernetes Administrator (CKA)",
    subcategory: "General",
    category: "certification",
    businessCategory: "Information Technology",
    weight: "necessary",
    level: "intermediate",
    growth: "10%",
    salary: "$140,000",
    skillScore: 75,
    minimumLevel: "beginner",
    requirementLevel: "required",
    metrics: {
      growth: "10%",
      salary: "$140,000",
      skillScore: 75
    },
    benchmarks: { B: true, R: true, M: true, O: true }
  }
];