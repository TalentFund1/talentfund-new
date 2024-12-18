import { UnifiedSkill } from '../../../types/SkillTypes';

export const technicalSkills: UnifiedSkill[] = [
  // AI Skills
  {
    id: 'SKILL001',
    title: "Machine Learning",
    subcategory: "AI & ML",
    category: "specialized",
    businessCategory: "Information Technology",
    weight: "critical",
    level: "advanced",
    growth: "35%",
    salary: "$185,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL002',
    title: "Deep Learning",
    subcategory: "AI & ML",
    category: "specialized",
    businessCategory: "Information Technology",
    weight: "critical",
    level: "advanced",
    growth: "32%",
    salary: "$180,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL003',
    title: "Natural Language Processing",
    subcategory: "AI Applications",
    category: "specialized",
    businessCategory: "Analysis",
    weight: "critical",
    level: "intermediate",
    growth: "30%",
    salary: "$175,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL004',
    title: "Computer Vision",
    subcategory: "AI Applications",
    category: "specialized",
    businessCategory: "Analysis",
    weight: "critical",
    level: "intermediate",
    growth: "28%",
    salary: "$170,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL005',
    title: "TensorFlow",
    subcategory: "ML Frameworks",
    category: "specialized",
    businessCategory: "Information Technology",
    weight: "critical",
    level: "intermediate",
    growth: "25%",
    salary: "$165,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL006',
    title: "PyTorch",
    subcategory: "ML Frameworks",
    category: "specialized",
    businessCategory: "Information Technology",
    weight: "critical",
    level: "advanced",
    growth: "28%",
    salary: "$170,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  // Backend Skills
  {
    id: 'SKILL007',
    title: "Node.js",
    subcategory: "Backend Development",
    category: "specialized",
    businessCategory: "Information Technology",
    weight: "critical",
    level: "advanced",
    growth: "30%",
    salary: "$160,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL008',
    title: "Database Design",
    subcategory: "Data Management",
    category: "specialized",
    businessCategory: "Information Technology",
    weight: "critical",
    level: "advanced",
    growth: "28%",
    salary: "$155,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL009',
    title: "API Development",
    subcategory: "Backend Development",
    category: "specialized",
    businessCategory: "Information Technology",
    weight: "critical",
    level: "advanced",
    growth: "27%",
    salary: "$150,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL010',
    title: "System Architecture",
    subcategory: "Software Architecture",
    category: "specialized",
    businessCategory: "Information Technology",
    weight: "critical",
    level: "advanced",
    growth: "26%",
    salary: "$165,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL011',
    title: "GraphQL",
    subcategory: "API Development",
    category: "specialized",
    businessCategory: "Information Technology",
    weight: "technical",
    level: "intermediate",
    growth: "25%",
    salary: "$140,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  // DevOps Skills
  {
    id: 'SKILL012',
    title: "Kubernetes",
    subcategory: "Container Orchestration",
    category: "specialized",
    businessCategory: "Information Technology",
    weight: "critical",
    level: "advanced",
    growth: "30%",
    salary: "$160,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL013',
    title: "Docker",
    subcategory: "Container Technology",
    category: "specialized",
    businessCategory: "Information Technology",
    weight: "critical",
    level: "advanced",
    growth: "28%",
    salary: "$155,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL014',
    title: "Jenkins",
    subcategory: "CI/CD",
    category: "specialized",
    businessCategory: "Information Technology",
    weight: "technical",
    level: "intermediate",
    growth: "25%",
    salary: "$150,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'SKILL015',
    title: "Terraform",
    subcategory: "Infrastructure as Code",
    category: "specialized",
    businessCategory: "Information Technology",
    weight: "technical",
    level: "intermediate",
    growth: "27%",
    salary: "$155,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  }
];

console.log('Loaded technical skills:', {
  total: technicalSkills.length,
  bySubcategory: technicalSkills.reduce((acc, skill) => {
    acc[skill.subcategory] = (acc[skill.subcategory] || 0) + 1;
    return acc;
  }, {} as Record<string, number>)
});