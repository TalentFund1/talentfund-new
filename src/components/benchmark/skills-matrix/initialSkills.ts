import { UnifiedSkill } from '../../skills/types/SkillTypes';
import { aiSkills } from './data/aiSkills';
import { webSkills } from './data/webSkills';
import { commonSkills } from './data/commonSkills';
import { certificationSkills } from './data/certificationSkills';

// Employee skills database with additional non-matching skills
const employeeSkills: { [key: string]: UnifiedSkill[] } = {
  "123": [
    ...aiSkills,
    webSkills[0], // React
    webSkills[1], // Vue.js
    commonSkills[0], // Agile
    commonSkills[1], // Technical Communication
    certificationSkills[1], // GCP
    certificationSkills[2], // Azure
    {
      id: "data-1",
      title: "Data Visualization",
      category: "specialized",
      businessCategory: "Data",
      subcategory: "Visualization",
      weight: "technical",
      level: "intermediate",
      growth: "15%",
      salary: "$135,000",
      confidence: "medium",
      benchmarks: { B: true, R: true, M: true, O: true }
    },
    {
      id: "mobile-1",
      title: "React Native",
      category: "specialized",
      businessCategory: "Mobile",
      subcategory: "Framework",
      weight: "technical",
      level: "beginner",
      growth: "20%",
      salary: "$140,000",
      confidence: "medium",
      benchmarks: { B: true, R: true, M: true, O: true }
    }
  ],
  "124": [
    ...webSkills,
    aiSkills[0], // Machine Learning
    commonSkills[2], // Team Leadership
    certificationSkills[0], // AWS Solutions Architect
    {
      id: "ui-1",
      title: "UI/UX Design",
      category: "specialized",
      businessCategory: "Design",
      subcategory: "User Interface",
      weight: "technical",
      level: "intermediate",
      growth: "18%",
      salary: "$130,000",
      confidence: "high",
      benchmarks: { B: true, R: true, M: true, O: true }
    },
    {
      id: "devops-1",
      title: "DevOps Practices",
      category: "specialized",
      businessCategory: "Operations",
      subcategory: "DevOps",
      weight: "critical",
      level: "beginner",
      growth: "25%",
      salary: "$150,000",
      confidence: "medium",
      benchmarks: { B: true, R: true, M: true, O: true }
    }
  ],
  "125": [
    webSkills[0], // React
    commonSkills[0], // Agile
    commonSkills[1], // Technical Communication
    certificationSkills[1], // GCP
    {
      id: "analytics-1",
      title: "Google Analytics",
      category: "specialized",
      businessCategory: "Analytics",
      subcategory: "Web Analytics",
      weight: "technical",
      level: "advanced",
      growth: "15%",
      salary: "$125,000",
      confidence: "high",
      benchmarks: { B: true, R: true, M: true, O: true }
    },
    {
      id: "seo-1",
      title: "SEO Optimization",
      category: "specialized",
      businessCategory: "Marketing",
      subcategory: "SEO",
      weight: "technical",
      level: "intermediate",
      growth: "12%",
      salary: "$120,000",
      confidence: "high",
      benchmarks: { B: true, R: true, M: true, O: true }
    }
  ],
  "126": [
    commonSkills[2], // Team Leadership
    certificationSkills[0], // AWS Solutions Architect
    {
      id: "proj-1",
      title: "Project Management",
      category: "specialized",
      businessCategory: "Management",
      subcategory: "Project Management",
      weight: "critical",
      level: "advanced",
      growth: "22%",
      salary: "$170,000",
      confidence: "high",
      benchmarks: { B: true, R: true, M: true, O: true }
    },
    {
      id: "risk-1",
      title: "Risk Management",
      category: "specialized",
      businessCategory: "Management",
      subcategory: "Risk",
      weight: "critical",
      level: "advanced",
      growth: "18%",
      salary: "$165,000",
      confidence: "high",
      benchmarks: { B: true, R: true, M: true, O: true }
    },
    {
      id: "strategy-1",
      title: "Strategic Planning",
      category: "specialized",
      businessCategory: "Management",
      subcategory: "Strategy",
      weight: "critical",
      level: "advanced",
      growth: "20%",
      salary: "$175,000",
      confidence: "high",
      benchmarks: { B: true, R: true, M: true, O: true }
    }
  ]
};

export const getEmployeeSkills = (id: string): UnifiedSkill[] => {
  console.log('Getting skills for employee:', id);
  const skills = employeeSkills[id] || [];
  console.log('Retrieved skills:', skills);
  return skills;
};