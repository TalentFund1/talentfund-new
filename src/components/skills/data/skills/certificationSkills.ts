import { UnifiedSkill } from '../../types/SkillTypes';

export const certificationSkills: UnifiedSkill[] = [
  {
    title: "AWS Certified DevOps Engineer",
    subcategory: "Cloud Certification",
    category: "certification",
    type: "critical",
    growth: "35%",
    salary: "$175,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    title: "Certified Kubernetes Administrator",
    subcategory: "Container Certification",
    category: "certification",
    type: "critical",
    growth: "32%",
    salary: "$170,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    title: "HashiCorp Certified Terraform Associate",
    subcategory: "Infrastructure Certification",
    category: "certification",
    type: "technical",
    growth: "30%",
    salary: "$155,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  }
];