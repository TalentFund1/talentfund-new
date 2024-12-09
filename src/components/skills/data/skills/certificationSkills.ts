import { UnifiedSkill } from '../../types/SkillTypes';

export const certificationSkills: UnifiedSkill[] = [
  {
    title: "AWS Certified Solutions Architect",
    subcategory: "Cloud Certification",
    category: "certification",
    type: "critical",
    growth: "30%",
    salary: "$175,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    title: "Kubernetes Administrator (CKA)",
    subcategory: "Container Certification",
    category: "certification",
    type: "critical",
    growth: "32%",
    salary: "$170,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    title: "AWS Certified Developer - Associate",
    subcategory: "Cloud Certification",
    category: "certification",
    type: "technical",
    growth: "28%",
    salary: "$160,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  }
];