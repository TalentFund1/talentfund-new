import { UnifiedSkill } from '../../../types/SkillTypes';

export const managementSkills: UnifiedSkill[] = [
  {
    id: 'MGT001',
    title: "System Design",
    subcategory: "Software Architecture",
    category: "specialized",
    businessCategory: "Information Technology",
    weight: "technical",
    level: "advanced",
    growth: "28%",
    salary: "$165,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'MGT002',
    title: "Technical Architecture",
    subcategory: "Architecture",
    category: "specialized",
    businessCategory: "Information Technology",
    weight: "critical",
    level: "advanced",
    growth: "30%",
    salary: "$175,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'MGT003',
    title: "Risk Management",
    subcategory: "Management",
    category: "common",
    businessCategory: "Risk and Compliance",
    weight: "critical",
    level: "advanced",
    growth: "24%",
    salary: "$180,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'MGT004',
    title: "Team Leadership",
    subcategory: "Leadership",
    category: "common",
    businessCategory: "Initiative and Leadership",
    weight: "critical",
    level: "advanced",
    growth: "22%",
    salary: "$180,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'MGT005',
    title: "Project Management",
    subcategory: "Project Management",
    category: "common",
    businessCategory: "Project Management",
    weight: "critical",
    level: "advanced",
    growth: "25%",
    salary: "$175,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  }
];