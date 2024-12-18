import { UnifiedSkill } from '../../../skills/types/SkillTypes';

export const aiSkills: UnifiedSkill[] = [
  {
    id: "ml-1",
    title: "Machine Learning",
    category: "specialized",
    businessCategory: "AI/ML",
    subcategory: "Machine Learning",
    weight: "critical",
    level: "advanced",
    growth: "25%",
    salary: "$150,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: "dl-1",
    title: "Deep Learning",
    category: "specialized",
    businessCategory: "AI/ML",
    subcategory: "Deep Learning",
    weight: "critical",
    level: "advanced",
    growth: "30%",
    salary: "$160,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: "nlp-1",
    title: "Natural Language Processing",
    category: "specialized",
    businessCategory: "AI/ML",
    subcategory: "NLP",
    weight: "critical",
    level: "intermediate",
    growth: "28%",
    salary: "$155,000",
    confidence: "medium",
    benchmarks: { B: true, R: true, M: true, O: true }
  }
];