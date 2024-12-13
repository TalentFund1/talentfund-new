import { UnifiedSkill } from '../../../types/SkillTypes';

export const versionControlSkills: UnifiedSkill[] = [
  {
    id: 'VCS001',
    title: "Git Version Control",
    subcategory: "Development Tools",
    category: "common",
    businessCategory: "Information Technology",
    weight: "technical",
    level: "Advanced",
    growth: "20%",
    salary: "$150,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  }
];

console.log('Loaded version control skills:', versionControlSkills);