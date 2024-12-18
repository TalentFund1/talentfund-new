import { UnifiedSkill } from '../../../skills/types/SkillTypes';

export const webSkills: UnifiedSkill[] = [
  {
    id: "react-1",
    title: "React",
    category: "specialized",
    businessCategory: "Frontend",
    subcategory: "Framework",
    weight: "critical",
    level: "intermediate",
    growth: "22%",
    salary: "$140,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: "vue-1",
    title: "Vue.js",
    category: "specialized",
    businessCategory: "Frontend",
    subcategory: "Framework",
    weight: "technical",
    level: "beginner",
    growth: "18%",
    salary: "$130,000",
    confidence: "medium",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: "node-1",
    title: "Node.js",
    category: "specialized",
    businessCategory: "Backend",
    subcategory: "Runtime",
    weight: "critical",
    level: "intermediate",
    growth: "20%",
    salary: "$145,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  }
];