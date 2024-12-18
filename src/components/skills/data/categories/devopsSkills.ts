import { UnifiedSkill } from '../../types/SkillTypes';

export const devopsSkills: UnifiedSkill[] = [
  {
    id: 'DEVOPS001',
    title: "Docker",
    subcategory: "Container Technology",
    businessCategory: "Information Technology",
    category: "specialized",
    weight: "technical",
    level: "Advanced",
    growth: "15%",
    salary: "$145,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'DEVOPS002',
    title: "Kubernetes",
    subcategory: "Container Orchestration",
    businessCategory: "Information Technology",
    category: "specialized",
    weight: "technical",
    level: "Advanced",
    growth: "17%",
    salary: "$155,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  }
];