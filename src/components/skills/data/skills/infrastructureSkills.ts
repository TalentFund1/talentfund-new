import { UnifiedSkill } from '../../types/SkillTypes';

export const infrastructureSkills: UnifiedSkill[] = [
  {
    title: "Kubernetes",
    subcategory: "Container Orchestration",
    category: "specialized",
    type: "critical",
    growth: "32%",
    salary: "$170,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    title: "Git Version Control",
    subcategory: "Development Tools",
    category: "common",
    type: "necessary",
    growth: "15%",
    salary: "$130,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  }
];