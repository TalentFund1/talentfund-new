import { UnifiedSkill } from '../../types/SkillTypes';

export const softSkills: UnifiedSkill[] = [
  {
    id: 'SF001',
    title: "Problem Solving",
    subcategory: "Soft Skills",
    category: "Analysis",
    weight: "necessary",
    growth: "15%",
    salary: "$160,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SF002',
    title: "Code Review",
    subcategory: "Development Practices",
    category: "Information Technology",
    weight: "technical",
    growth: "18%",
    salary: "$155,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SF003',
    title: "Communication",
    subcategory: "Soft Skills",
    category: "Media and Communications",
    weight: "necessary",
    growth: "20%",
    salary: "$160,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  }
];