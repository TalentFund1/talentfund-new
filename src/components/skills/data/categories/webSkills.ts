import { UnifiedSkill } from '../../types/SkillTypes';

export const webSkills: UnifiedSkill[] = [
  {
    id: 'WEB001',
    title: "React",
    subcategory: "Frontend Frameworks",
    businessCategory: "Information Technology",
    category: "specialized",
    weight: "technical",
    level: "Advanced",
    growth: "25%",
    salary: "$165,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'WEB002',
    title: "GraphQL",
    subcategory: "API Development",
    businessCategory: "Information Technology",
    category: "specialized",
    weight: "technical",
    level: "Intermediate",
    growth: "24%",
    salary: "$150,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  }
];