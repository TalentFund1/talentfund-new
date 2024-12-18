import { UnifiedSkill } from '../../../types/SkillTypes';

export const certificationSkills: UnifiedSkill[] = [
  {
    id: 'CERT001',
    title: "AWS Certified Solutions Architect",
    subcategory: "Cloud Certification",
    category: "certification",
    businessCategory: "Information Technology",
    weight: "critical",
    level: "advanced",
    growth: "28%",
    salary: "$180,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'CERT002',
    title: "Google Cloud Professional",
    subcategory: "Cloud Certification",
    category: "certification",
    businessCategory: "Information Technology",
    weight: "critical",
    level: "advanced",
    growth: "26%",
    salary: "$175,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  }
];