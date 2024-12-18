import { UnifiedSkill } from '../../../skills/types/SkillTypes';

export const commonSkills: UnifiedSkill[] = [
  {
    id: "agile-1",
    title: "Agile Methodologies",
    category: "common",
    businessCategory: "Process",
    subcategory: "Methodology",
    weight: "necessary",
    level: "intermediate",
    growth: "15%",
    salary: "$130,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: "comm-1",
    title: "Technical Communication",
    category: "common",
    businessCategory: "Communication",
    subcategory: "Technical Writing",
    weight: "necessary",
    level: "intermediate",
    growth: "12%",
    salary: "$125,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: "lead-1",
    title: "Team Leadership",
    category: "common",
    businessCategory: "Management",
    subcategory: "Leadership",
    weight: "critical",
    level: "intermediate",
    growth: "20%",
    salary: "$160,000",
    confidence: "medium",
    benchmarks: { B: true, R: true, M: true, O: true }
  }
];