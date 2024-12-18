import { UnifiedSkill } from '../../../types/SkillTypes';

export const technicalSkills: UnifiedSkill[] = [
  {
    id: 'TECH001',
    title: "Python",
    subcategory: "Programming Languages",
    category: "specialized",
    businessCategory: "Information Technology",
    weight: "technical",
    level: "advanced",
    growth: "25%",
    salary: "$160,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'TECH002',
    title: "JavaScript",
    subcategory: "Programming Languages",
    category: "specialized",
    businessCategory: "Information Technology",
    weight: "technical",
    level: "advanced",
    growth: "22%",
    salary: "$155,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'TECH003',
    title: "Git Version Control",
    subcategory: "Development Tools",
    category: "common",
    businessCategory: "Information Technology",
    weight: "technical",
    level: "intermediate",
    growth: "15%",
    salary: "$140,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  }
];