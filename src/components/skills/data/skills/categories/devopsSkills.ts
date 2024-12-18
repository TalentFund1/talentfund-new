import { UnifiedSkill } from '../../../types/SkillTypes';

export const devopsSkills: UnifiedSkill[] = [
  {
    id: 'SKILL012',
    title: "Kubernetes",
    subcategory: "Container Orchestration",
    category: "specialized",
    businessCategory: "Information Technology",
    weight: "critical",
    level: "advanced",
    growth: "30%",
    salary: "$160,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL013',
    title: "Docker",
    subcategory: "Container Technology",
    category: "specialized",
    businessCategory: "Information Technology",
    weight: "critical",
    level: "advanced",
    growth: "28%",
    salary: "$155,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL014',
    title: "Jenkins",
    subcategory: "CI/CD",
    category: "specialized",
    businessCategory: "Information Technology",
    weight: "technical",
    level: "intermediate",
    growth: "25%",
    salary: "$150,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL015',
    title: "Terraform",
    subcategory: "Infrastructure as Code",
    category: "specialized",
    businessCategory: "Information Technology",
    weight: "technical",
    level: "intermediate",
    growth: "27%",
    salary: "$155,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  }
];