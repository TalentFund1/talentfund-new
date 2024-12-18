import { UnifiedSkill } from '../../types/SkillTypes';

export const managementSkills: UnifiedSkill[] = [
  {
    id: 'MGT001',
    title: "Team Leadership",
    subcategory: "Leadership",
    category: "common",
    businessCategory: "Initiative and Leadership",
    weight: "necessary",
    level: "advanced",
    growth: "20%",
    salary: "$160,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'MGT002',
    title: "Project Management",
    subcategory: "Management",
    category: "common",
    businessCategory: "Project Management",
    weight: "necessary",
    level: "advanced",
    growth: "20%",
    salary: "$155,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'MGT003',
    title: "Strategic Planning",
    subcategory: "Management",
    category: "common",
    businessCategory: "Project Management",
    weight: "necessary",
    level: "advanced",
    growth: "18%",
    salary: "$150,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  }
];