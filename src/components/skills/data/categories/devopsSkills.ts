import { UnifiedSkill } from '../../types/SkillTypes';

export const devopsSkills: UnifiedSkill[] = [
  {
    id: 'DEV001',
    title: "Docker",
    subcategory: "Container Technologies",
    category: "specialized",
    businessCategory: "Information Technology",
    weight: "technical",
    level: "advanced",
    growth: "28%",
    salary: "$165,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'DEV002',
    title: "Kubernetes",
    subcategory: "Container Orchestration",
    category: "specialized",
    businessCategory: "Information Technology",
    weight: "technical",
    level: "advanced",
    growth: "30%",
    salary: "$170,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  }
];