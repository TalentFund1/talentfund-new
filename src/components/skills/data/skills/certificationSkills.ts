import { UnifiedSkill } from '../../types/SkillTypes';

export const certificationSkills: UnifiedSkill[] = [
  {
    id: 'CERT001',
    title: "AWS Certified DevOps Engineer",
    subcategory: "Cloud Certification",
    category: "certification",
    weight: "critical",
    level: "advanced",
    growth: "30%",
    salary: "$175,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'CERT002',
    title: "AWS Certified Solutions Architect",
    subcategory: "Cloud Certification",
    category: "certification",
    weight: "critical",
    level: "advanced",
    growth: "28%",
    salary: "$180,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'CERT003',
    title: "AWS Certified Developer - Associate",
    subcategory: "Cloud Certification",
    category: "certification",
    weight: "critical",
    level: "intermediate",
    growth: "25%",
    salary: "$165,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'CERT004',
    title: "Certified Kubernetes Administrator",
    subcategory: "Container Certification",
    category: "certification",
    weight: "critical",
    level: "advanced",
    growth: "32%",
    salary: "$170,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'CERT005',
    title: "HashiCorp Certified Terraform Associate",
    subcategory: "Infrastructure Certification",
    category: "certification",
    weight: "critical",
    level: "intermediate",
    growth: "30%",
    salary: "$165,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'CERT006',
    title: "Project Management Professional (PMP)",
    subcategory: "Management Certification",
    category: "certification",
    weight: "critical",
    level: "advanced",
    growth: "25%",
    salary: "$175,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  {
    id: 'CERT007',
    title: "Certified Scrum Master (CSM)",
    subcategory: "Agile Certification",
    category: "certification",
    weight: "critical",
    level: "intermediate",
    growth: "22%",
    salary: "$160,000",
    confidence: "high",
    benchmarks: { B: true, R: true, M: true, O: true }
  }
];