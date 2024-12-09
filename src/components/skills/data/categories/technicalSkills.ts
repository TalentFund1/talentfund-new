import { UnifiedSkill } from '../../types/SkillTypes';

export const technicalSkills: UnifiedSkill[] = [
  {
    id: 'TECH001',
    title: "Amazon Web Services",
    subcategory: "Web Services",
    businessCategory: "Information Technology",
    level: "Advanced",
    growth: "12%",
    category: "specialized",
    weight: "technical",
    confidence: "high",
    salary: "$160,000",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'TECH002',
    title: "Docker",
    subcategory: "Software Development Tools",
    businessCategory: "Information Technology",
    level: "Intermediate",
    growth: "15%",
    category: "specialized",
    weight: "technical",
    confidence: "high",
    salary: "$145,000",
    benchmarks: { B: true, R: true, M: true, O: true }
  }
];