import { UnifiedSkill } from '../../types/SkillTypes';

export const technicalSkills: UnifiedSkill[] = [
  {
    id: 'TECH001',
    title: "Amazon Web Services",
    subcategory: "Web Services",
    level: "Advanced",
    growth: "12%",
    category: "specialized",
    type: "technical",
    confidence: "high",
    salary: "$160,000",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'TECH002',
    title: "Docker",
    subcategory: "Software Development Tools",
    level: "Intermediate",
    growth: "15%",
    category: "specialized",
    type: "technical",
    confidence: "high",
    salary: "$145,000",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  // ... Add other technical skills with IDs
];