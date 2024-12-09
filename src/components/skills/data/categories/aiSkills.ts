import { UnifiedSkill } from '../../types/SkillTypes';

export const aiSkills: UnifiedSkill[] = [
  {
    id: 'AI001',
    title: "Artificial Intelligence",
    subcategory: "Artificial Intelligence and Machine Learning",
    level: "Advanced",
    growth: "19%",
    category: "specialized",
    type: "technical",
    confidence: "high",
    salary: "$180,000",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'AI002',
    title: "Machine Learning",
    subcategory: "Artificial Intelligence and Machine Learning",
    level: "Intermediate",
    growth: "10%",
    category: "specialized",
    type: "technical",
    confidence: "high",
    salary: "$175,000",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  // ... Add other AI skills with IDs
];