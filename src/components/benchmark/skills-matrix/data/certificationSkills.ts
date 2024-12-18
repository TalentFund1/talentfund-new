import { UnifiedSkill } from '../../../skills/types/SkillTypes';

export const certificationSkills: UnifiedSkill[] = [
  {
    id: "aws-1",
    title: "AWS Solutions Architect",
    category: "certification",
    businessCategory: "Cloud",
    subcategory: "AWS",
    weight: "critical",
    level: "advanced",
    growth: "25%",
    salary: "$160,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: "gcp-1",
    title: "Google Cloud Professional",
    category: "certification",
    businessCategory: "Cloud",
    subcategory: "GCP",
    weight: "technical",
    level: "intermediate",
    growth: "20%",
    salary: "$150,000",
    confidence: "medium",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: "azure-1",
    title: "Azure Solutions Architect",
    category: "certification",
    businessCategory: "Cloud",
    subcategory: "Azure",
    weight: "technical",
    level: "beginner",
    growth: "18%",
    salary: "$145,000",
    confidence: "medium",
    benchmarks: { B: true, R: true, M: true, O: true }
  }
];