import { UnifiedSkill } from '../../types/SkillTypes';

export const Skills: { [key: string]: UnifiedSkill[] } = {
  ai: [
    {
      id: 'AI001',
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
      id: 'AI002',
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
      id: 'AI003',
      title: "Natural Language Processing",
      subcategory: "Natural Language Processing (NLP)",
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
      id: 'AI004',
      title: "Computer Vision",
      subcategory: "Computer Vision",
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
      id: 'AI005',
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
    }
  ],
  backend: [
    {
      id: 'BE001',
      title: "Node.js",
      subcategory: "Backend Development",
      businessCategory: "Information Technology",
      category: "specialized",
      weight: "technical",
      level: "intermediate",
      growth: "24%",
      salary: "$155,000",
      confidence: "high",
      benchmarks: { B: true, R: true, M: true, O: true }
    },
    {
      id: 'BE002',
      title: "Database Design",
      subcategory: "Data Management",
      businessCategory: "Information Technology",
      category: "specialized",
      weight: "technical",
      level: "intermediate",
      growth: "26%",
      salary: "$160,000",
      confidence: "high",
      benchmarks: { B: true, R: true, M: true, O: true }
    },
    {
      id: 'BE003',
      title: "API Development",
      subcategory: "Backend Development",
      businessCategory: "Information Technology",
      category: "specialized",
      weight: "technical",
      level: "intermediate",
      growth: "26%",
      salary: "$150,000",
      confidence: "high",
      benchmarks: { B: true, R: true, M: true, O: true }
    },
    {
      id: 'BE004',
      title: "System Architecture",
      subcategory: "Software Architecture",
      businessCategory: "Information Technology",
      category: "specialized",
      weight: "critical",
      level: "advanced",
      growth: "30%",
      salary: "$180,000",
      confidence: "high",
      benchmarks: { B: true, R: true, M: true, O: true }
    }
  ],
  frontend: [
    {
      id: 'FE001',
      title: "React",
      subcategory: "Frontend Frameworks",
      businessCategory: "Information Technology",
      category: "specialized",
      weight: "critical",
      level: "advanced",
      growth: "28%",
      salary: "$165,000",
      confidence: "high",
      benchmarks: { B: true, R: true, M: true, O: true }
    },
    {
      id: 'FE002',
      title: "TypeScript",
      subcategory: "Programming Languages",
      businessCategory: "Information Technology",
      category: "specialized",
      weight: "critical",
      level: "intermediate",
      growth: "32%",
      salary: "$160,000",
      confidence: "high",
      benchmarks: { B: true, R: true, M: true, O: true }
    },
    {
      id: 'FE003',
      title: "Next.js",
      subcategory: "Frontend Frameworks",
      businessCategory: "Information Technology",
      category: "specialized",
      weight: "critical",
      level: "intermediate",
      growth: "35%",
      salary: "$170,000",
      confidence: "high",
      benchmarks: { B: true, R: true, M: true, O: true }
    },
    {
      id: 'FE004',
      title: "CSS/SASS",
      subcategory: "Frontend Development",
      businessCategory: "Information Technology",
      category: "specialized",
      weight: "technical",
      level: "intermediate",
      growth: "18%",
      salary: "$145,000",
      confidence: "high",
      benchmarks: { B: true, R: true, M: true, O: true }
    },
    {
      id: 'FE005',
      title: "Performance Optimization",
      subcategory: "Frontend Development",
      businessCategory: "Information Technology",
      category: "specialized",
      weight: "technical",
      level: "intermediate",
      growth: "25%",
      salary: "$155,000",
      confidence: "high",
      benchmarks: { B: true, R: true, M: true, O: true }
    }
  ],
  infrastructure: [
    {
      id: 'INF001',
      title: "Docker",
      subcategory: "Container Technology",
      businessCategory: "Information Technology",
      category: "specialized",
      weight: "technical",
      level: "intermediate",
      growth: "28%",
      salary: "$160,000",
      confidence: "high",
      benchmarks: { B: true, R: true, M: true, O: true }
    },
    {
      id: 'INF002',
      title: "Kubernetes",
      subcategory: "Container Orchestration",
      businessCategory: "Information Technology",
      category: "specialized",
      weight: "critical",
      level: "advanced",
      growth: "32%",
      salary: "$170,000",
      confidence: "high",
      benchmarks: { B: true, R: true, M: true, O: true }
    },
    {
      id: 'INF003',
      title: "Jenkins",
      subcategory: "CI/CD",
      businessCategory: "Information Technology",
      category: "specialized",
      weight: "technical",
      level: "intermediate",
      growth: "25%",
      salary: "$145,000",
      confidence: "high",
      benchmarks: { B: true, R: true, M: true, O: true }
    },
    {
      id: 'INF004',
      title: "Terraform",
      subcategory: "Infrastructure as Code",
      businessCategory: "Information Technology",
      category: "specialized",
      weight: "critical",
      level: "advanced",
      growth: "30%",
      salary: "$155,000",
      confidence: "high",
      benchmarks: { B: true, R: true, M: true, O: true }
    },
    {
      id: 'INF005',
      title: "AWS",
      subcategory: "Cloud Platforms",
      businessCategory: "Information Technology",
      category: "specialized",
      weight: "critical",
      level: "advanced",
      growth: "35%",
      salary: "$175,000",
      confidence: "high",
      benchmarks: { B: true, R: true, M: true, O: true }
    }
  ],
  management: [
    {
      id: 'MGT001',
      title: "System Design",
      subcategory: "Software Architecture",
      businessCategory: "Information Technology",
      category: "specialized",
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
      subcategory: "Software Architecture",
      businessCategory: "Information Technology",
      category: "specialized",
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
      businessCategory: "Risk and Compliance",
      category: "specialized",
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
      businessCategory: "Initiative and Leadership",
      category: "specialized",
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
      subcategory: "Management",
      businessCategory: "Project Management",
      category: "specialized",
      weight: "critical",
      level: "advanced",
      growth: "25%",
      salary: "$175,000",
      confidence: "high",
      benchmarks: { B: true, R: true, M: true, O: true }
    }
  ],
  certifications: [
    {
      id: 'CERT001',
      title: "AWS Certified DevOps Engineer",
      subcategory: "Cloud Certification",
      businessCategory: "Information Technology",
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
      businessCategory: "Information Technology",
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
      businessCategory: "Information Technology",
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
      businessCategory: "Information Technology",
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
      businessCategory: "Information Technology",
      category: "certification",
      weight: "critical",
      level: "intermediate",
      growth: "30%",
      salary: "$165,000",
      confidence: "high",
      benchmarks: { B: true, R: true, M: true, O: true }
    }
  ],
  common: [
    {
      id: 'COM001',
      title: "Git Version Control",
      subcategory: "Development Tools",
      businessCategory: "Information Technology",
      category: "common",
      weight: "technical",
      level: "intermediate",
      growth: "15%",
      salary: "$130,000",
      confidence: "high",
      benchmarks: { B: true, R: true, M: true, O: true }
    },
    {
      id: 'COM002',
      title: "Python",
      subcategory: "Programming Languages",
      businessCategory: "Information Technology",
      category: "common",
      weight: "technical",
      level: "intermediate",
      growth: "28%",
      salary: "$160,000",
      confidence: "high",
      benchmarks: { B: true, R: true, M: true, O: true }
    },
    {
      id: 'COM003',
      title: "Problem Solving",
      subcategory: "Soft Skills",
      businessCategory: "Physical and Inherent Abilities",
      category: "common",
      weight: "necessary",
      level: "intermediate",
      growth: "15%",
      salary: "$158,000",
      confidence: "high",
      benchmarks: { B: true, R: true, M: true, O: true }
    }
  ],
  soft: [
    {
      id: 'SOFT001',
      title: "Problem Solving",
      subcategory: "Soft Skills",
      businessCategory: "Physical and Inherent Abilities",
      category: "common",
      weight: "necessary",
      level: "intermediate",
      growth: "15%",
      salary: "$158,000",
      confidence: "high",
      benchmarks: { B: true, R: true, M: true, O: true }
    },
    {
      id: 'SOFT002',
      title: "Code Review",
      subcategory: "Development Practices",
      businessCategory: "Information Technology",
      category: "common",
      weight: "technical",
      level: "intermediate",
      growth: "18%",
      salary: "$145,000",
      confidence: "high",
      benchmarks: { B: true, R: true, M: true, O: true }
    },
    {
      id: 'SOFT003',
      title: "Agile Methodologies",
      subcategory: "Project Management",
      businessCategory: "Project Management",
      category: "common",
      weight: "technical",
      level: "intermediate",
      growth: "20%",
      salary: "$150,000",
      confidence: "high",
      benchmarks: { B: true, R: true, M: true, O: true }
    }
  ]
};

// Helper function to get all skills as a flat array
export const getAllSkills = (): UnifiedSkill[] => {
  return Object.values(Skills).flat();
};

// Helper function to get skills by category
export const getSkillsByCategory = (category: keyof typeof Skills): UnifiedSkill[] => {
  return Skills[category] || [];
};

// Helper function to find a skill by title
export const findSkillByTitle = (title: string): UnifiedSkill | undefined => {
  return getAllSkills().find(skill => skill.title === title);
};

console.log('Loaded skills:', {
  total: getAllSkills().length,
  byCategory: Object.fromEntries(
    Object.entries(Skills).map(([key, skills]) => [key, skills.length])
  )
});