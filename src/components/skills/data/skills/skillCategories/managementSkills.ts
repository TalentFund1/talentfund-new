import { UnifiedSkill } from '../../../types/SkillTypes';

export const managementSkills: UnifiedSkill[] = [
  {
    id: 'MGT001',
    title: "Communication",
    subcategory: "Communication",
    category: "common",
    businessCategory: "Media and Communications",
    weight: "technical",
    level: "intermediate",
    growth: "25%",
    salary: "$140,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'MGT002',
    title: "Team Leadership",
    subcategory: "Initiative and Leadership",
    category: "specialized",
    businessCategory: "Initiative and Leadership",
    weight: "technical",
    level: "advanced",
    growth: "28%",
    salary: "$165,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'MGT003',
    title: "Coaching",
    subcategory: "Initiative and Leadership",
    category: "common",
    businessCategory: "Physical and Inherent Abilities",
    weight: "technical",
    level: "intermediate",
    growth: "24%",
    salary: "$145,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'MGT004',
    title: "Business To Business",
    subcategory: "Business-to-Business (B2B) Sales",
    category: "specialized",
    businessCategory: "Sales",
    weight: "technical",
    level: "intermediate",
    growth: "26%",
    salary: "$155,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  }
];