import { UnifiedSkill } from '../../types/SkillTypes';

export const aiSkills: UnifiedSkill[] = [
  {
    id: 'AI001',
    title: "Artificial Intelligence",
    subcategory: "Artificial Intelligence and Machine Learning",
    businessCategory: "Information Technology",
    level: "Advanced",
    growth: "19%",
    category: "specialized",
    weight: "technical",
    confidence: "high",
    salary: "$180,000",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'AI002',
    title: "Machine Learning",
    subcategory: "Artificial Intelligence and Machine Learning",
    businessCategory: "Information Technology",
    level: "Intermediate",
    growth: "10%",
    category: "specialized",
    weight: "technical",
    confidence: "high",
    salary: "$175,000",
    benchmarks: { B: true, R: true, M: true, O: true }
  }
];