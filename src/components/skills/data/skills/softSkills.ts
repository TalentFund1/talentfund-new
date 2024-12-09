import { UnifiedSkill } from '../../types/SkillTypes';

export const softSkills: UnifiedSkill[] = [
  {
    id: 'SOFT001',
    title: "Problem Solving",
    subcategory: "Soft Skills",
    category: "common",
    type: "necessary",
    growth: "15%",
    salary: "$158,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SOFT002',
    title: "Code Review",
    subcategory: "Development Practices",
    category: "common",
    type: "technical",
    growth: "18%",
    salary: "$145,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SOFT003',
    title: "Agile Methodologies",
    subcategory: "Project Management",
    category: "common",
    type: "technical",
    growth: "20%",
    salary: "$150,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  }
];