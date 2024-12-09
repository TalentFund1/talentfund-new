import { UnifiedSkill } from '../../types/SkillTypes';

export const infrastructureSkills: UnifiedSkill[] = [
  {
    id: 'INF001',
    title: "Docker",
    subcategory: "Container Technology",
    category: "specialized",
    type: "technical",
    level: "intermediate",
    growth: "28%",
    salary: "$160,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'INF002',
    title: "Kubernetes",
    subcategory: "Container Orchestration",
    category: "specialized",
    type: "critical",
    level: "advanced",
    growth: "32%",
    salary: "$170,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'INF003',
    title: "Jenkins",
    subcategory: "CI/CD",
    category: "specialized",
    type: "technical",
    level: "intermediate",
    growth: "25%",
    salary: "$145,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'INF004',
    title: "Terraform",
    subcategory: "Infrastructure as Code",
    category: "specialized",
    type: "critical",
    level: "advanced",
    growth: "30%",
    salary: "$155,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'INF005',
    title: "AWS",
    subcategory: "Cloud Platforms",
    category: "specialized",
    type: "critical",
    level: "advanced",
    growth: "35%",
    salary: "$175,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'INF006',
    title: "Linux Administration",
    subcategory: "System Administration",
    category: "specialized",
    type: "technical",
    level: "intermediate",
    growth: "22%",
    salary: "$140,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'INF007',
    title: "Shell Scripting",
    subcategory: "System Administration",
    category: "common",
    type: "technical",
    level: "intermediate",
    growth: "18%",
    salary: "$135,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'INF008',
    title: "Git Version Control",
    subcategory: "Development Tools",
    category: "common",
    type: "necessary",
    level: "intermediate",
    growth: "15%",
    salary: "$130,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  }
];