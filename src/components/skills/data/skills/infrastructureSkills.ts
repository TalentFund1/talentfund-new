import { UnifiedSkill } from '../../types/SkillTypes';

export const infrastructureSkills: UnifiedSkill[] = [
  {
    id: 'IN001',
    title: "Docker",
    subcategory: "Container Technology",
    type: "specialized",
    weight: "technical",
    growth: "28%",
    salary: "$160,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'IN002',
    title: "Kubernetes",
    subcategory: "Container Orchestration",
    type: "specialized",
    weight: "critical",
    growth: "32%",
    salary: "$170,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'IN003',
    title: "Jenkins",
    subcategory: "CI/CD",
    type: "specialized",
    weight: "technical",
    growth: "25%",
    salary: "$145,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'IN004',
    title: "Terraform",
    subcategory: "Infrastructure as Code",
    type: "specialized",
    weight: "critical",
    growth: "30%",
    salary: "$155,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'IN005',
    title: "AWS",
    subcategory: "Cloud Platforms",
    type: "specialized",
    weight: "critical",
    growth: "35%",
    salary: "$175,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'IN006',
    title: "Linux Administration",
    subcategory: "System Administration",
    type: "specialized",
    weight: "technical",
    growth: "22%",
    salary: "$140,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  }
];