import { UnifiedSkill } from '../../types/SkillTypes';

export const certificationSkills: UnifiedSkill[] = [
  {
    id: 'CT001',
    title: "AWS Certified Solutions Architect",
    subcategory: "Cloud Certification",
    category: "certification",
    type: "critical",
    growth: "35%",
    salary: "$190,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'CT002',
    title: "AWS Certified DevOps Engineer",
    subcategory: "DevOps Certification",
    category: "certification",
    type: "critical",
    growth: "32%",
    salary: "$185,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'CT003',
    title: "Certified Kubernetes Administrator",
    subcategory: "Container Certification",
    category: "certification",
    type: "critical",
    growth: "30%",
    salary: "$180,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'CT004',
    title: "HashiCorp Certified Terraform Associate",
    subcategory: "Infrastructure Certification",
    category: "certification",
    type: "critical",
    growth: "28%",
    salary: "$175,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  }
];