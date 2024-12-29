import { UnifiedSkill } from '../../../types/SkillTypes';

export const managementSkills: UnifiedSkill[] = [
  {
    id: 'SKILL_TL_048',
    title: "Team Leadership",
    subcategory: "General",
    category: "specialized",
    businessCategory: "Leadership",
    weight: "critical",
    level: "intermediate",
    growth: "18%",
    salary: "$140,000",
    skillScore: 80,
    minimumLevel: "beginner",
    requirementLevel: "required",
    metrics: {
      growth: "18%",
      salary: "$140,000",
      skillScore: 80
    },
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL_PO_049',
    title: "Performance Optimization",
    subcategory: "General",
    category: "specialized",
    businessCategory: "Technical Skills",
    weight: "technical",
    level: "intermediate",
    growth: "22%",
    salary: "$135,000",
    skillScore: 75,
    minimumLevel: "beginner",
    requirementLevel: "required",
    metrics: {
      growth: "22%",
      salary: "$135,000",
      skillScore: 75
    },
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL_TW_050',
    title: "Technical Writing",
    subcategory: "General",
    category: "specialized",
    businessCategory: "Documentation",
    weight: "necessary",
    level: "intermediate",
    growth: "12%",
    salary: "$115,000",
    skillScore: 70,
    minimumLevel: "beginner",
    requirementLevel: "required",
    metrics: {
      growth: "12%",
      salary: "$115,000",
      skillScore: 70
    },
    benchmarks: { B: true, R: true, M: true, O: true }
  }
];