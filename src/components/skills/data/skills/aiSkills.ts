import { UnifiedSkill } from '../../types/SkillTypes';

export const aiSkills: UnifiedSkill[] = [
  {
    id: 'AI001',
    title: "Machine Learning",
    subcategory: "AI & ML",
    type: "specialized",
    weight: "critical",
    growth: "35%",
    salary: "$185,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'AI002',
    title: "Deep Learning",
    subcategory: "AI & ML",
    type: "specialized",
    weight: "critical",
    growth: "32%",
    salary: "$180,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'AI003',
    title: "Natural Language Processing",
    subcategory: "AI Applications",
    type: "specialized",
    weight: "critical",
    growth: "30%",
    salary: "$175,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'AI004',
    title: "Computer Vision",
    subcategory: "AI Applications",
    type: "specialized",
    weight: "critical",
    growth: "28%",
    salary: "$170,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'AI005',
    title: "TensorFlow",
    subcategory: "ML Frameworks",
    type: "specialized",
    weight: "critical",
    growth: "25%",
    salary: "$165,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  }
];