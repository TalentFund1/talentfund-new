import { UnifiedSkill } from '../../types/SkillTypes';

export const aiSkills: UnifiedSkill[] = [
  {
    id: 'AI001',
    title: "Machine Learning",
    subcategory: "Artificial Intelligence and Machine Learning",
    category: "specialized",
    businessCategory: "Information Technology",
    weight: "technical",
    level: "advanced",
    growth: "20%",
    salary: "$175,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'AI002',
    title: "Deep Learning",
    subcategory: "Artificial Intelligence and Machine Learning",
    category: "specialized",
    businessCategory: "Information Technology",
    weight: "technical",
    level: "advanced",
    growth: "19%",
    salary: "$170,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'AI003',
    title: "Natural Language Processing",
    subcategory: "Artificial Intelligence and Machine Learning",
    category: "common",
    businessCategory: "Information Technology",
    weight: "technical",
    level: "intermediate",
    growth: "18%",
    salary: "$165,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'AI004',
    title: "TensorFlow",
    subcategory: "Machine Learning Frameworks",
    category: "common",
    businessCategory: "Information Technology",
    weight: "technical",
    level: "intermediate",
    growth: "17%",
    salary: "$160,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  }
];