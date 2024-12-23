import { UnifiedSkill } from '../../../types/SkillTypes';

export const certificationSkills: UnifiedSkill[] = [
  {
    id: 'SKILL023',
    title: "AWS Certified Solutions Architect",
    subcategory: "Cloud Certification",
    category: 'certification',
    businessCategory: "Information Technology",
    weight: 'critical',
    level: "advanced",
    growth: "28%",
    salary: "$180,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL024',
    title: "Kubernetes Administrator (CKA)",
    subcategory: "Cloud Certification",
    category: 'certification',
    businessCategory: "Information Technology",
    weight: 'critical',
    level: "advanced",
    growth: "26%",
    salary: "$175,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL025',
    title: "AWS Certified Machine Learning - Specialty",
    subcategory: "Cloud Certification",
    category: 'certification',
    businessCategory: "Information Technology",
    weight: 'critical',
    level: "advanced",
    growth: "30%",
    salary: "$185,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  }
];