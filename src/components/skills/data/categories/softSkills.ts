import { UnifiedSkill } from '../../types/SkillTypes';

export const softSkills: UnifiedSkill[] = [
  {
    id: 'SOFT001',
    title: "UI/UX Design",
    subcategory: "Design",
    level: "Intermediate",
    growth: "22%",
    category: "common",
    weight: "necessary",
    confidence: "high",
    salary: "$130,000",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SOFT002',
    title: "Data Science",
    subcategory: "Analytics",
    level: "Intermediate",
    growth: "21%",
    category: "specialized",
    weight: "technical",
    confidence: "high",
    salary: "$165,000",
    benchmarks: { B: true, R: true, M: true, O: true }
  }
];