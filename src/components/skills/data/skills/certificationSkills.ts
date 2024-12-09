import { UnifiedSkill } from '../../types/SkillTypes';

export const certificationSkills: UnifiedSkill[] = [
  {
    id: 'CT001',
    title: "AWS Certified Machine Learning - Specialty",
    subcategory: "Cloud Certifications",
    category: "certification",
    weight: "critical",
    growth: "35%",
    salary: "$190,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'CT002',
    title: "AWS Certified DevOps Engineer",
    subcategory: "Cloud Certifications",
    category: "certification",
    weight: "critical",
    growth: "32%",
    salary: "$185,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'CT003',
    title: "Certified Kubernetes Administrator",
    subcategory: "Container Orchestration Certifications",
    category: "certification",
    weight: "critical",
    growth: "30%",
    salary: "$175,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'CT004',
    title: "HashiCorp Certified Terraform Associate",
    subcategory: "Infrastructure Certifications",
    category: "certification",
    weight: "critical",
    growth: "28%",
    salary: "$170,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  }
];