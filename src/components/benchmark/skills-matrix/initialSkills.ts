import { UnifiedSkill } from '../../skills/types/SkillTypes';

// Employee skills database
const employeeSkills: { [key: string]: UnifiedSkill[] } = {
  "123": [
    {
      id: "ml-1",
      title: "Machine Learning",
      category: "specialized",
      businessCategory: "AI/ML",
      subcategory: "Machine Learning",
      weight: "critical",
      level: "advanced",
      growth: "25%",
      salary: "$150,000",
      confidence: "high",
      benchmarks: { B: true, R: true, M: true, O: true }
    },
    {
      id: "dl-1",
      title: "Deep Learning",
      category: "specialized",
      businessCategory: "AI/ML",
      subcategory: "Deep Learning",
      weight: "critical",
      level: "advanced",
      growth: "30%",
      salary: "$160,000",
      confidence: "high",
      benchmarks: { B: true, R: true, M: true, O: true }
    },
    {
      id: "py-1",
      title: "Python",
      category: "common",
      businessCategory: "Programming",
      subcategory: "Languages",
      weight: "technical",
      level: "advanced",
      growth: "20%",
      salary: "$140,000",
      confidence: "high",
      benchmarks: { B: true, R: true, M: true, O: true }
    },
    {
      id: "tf-1",
      title: "TensorFlow",
      category: "specialized",
      businessCategory: "AI/ML",
      subcategory: "Frameworks",
      weight: "critical",
      level: "advanced",
      growth: "28%",
      salary: "$155,000",
      confidence: "high",
      benchmarks: { B: true, R: true, M: true, O: true }
    },
    {
      id: "aws-ml-1",
      title: "AWS Certified Machine Learning - Specialty",
      category: "certification",
      businessCategory: "Cloud",
      subcategory: "AWS",
      weight: "critical",
      level: "advanced",
      growth: "32%",
      salary: "$170,000",
      confidence: "high",
      benchmarks: { B: true, R: true, M: true, O: true }
    }
  ],
  "124": [
    {
      id: "node-1",
      title: "Node.js",
      category: "specialized",
      businessCategory: "Backend",
      subcategory: "Runtime",
      weight: "critical",
      level: "intermediate",
      growth: "20%",
      salary: "$140,000",
      confidence: "high",
      benchmarks: { B: true, R: true, M: true, O: true }
    },
    {
      id: "db-1",
      title: "Database Design",
      category: "specialized",
      businessCategory: "Backend",
      subcategory: "Database",
      weight: "critical",
      level: "intermediate",
      growth: "18%",
      salary: "$135,000",
      confidence: "high",
      benchmarks: { B: true, R: true, M: true, O: true }
    },
    {
      id: "api-1",
      title: "API Development",
      category: "specialized",
      businessCategory: "Backend",
      subcategory: "API",
      weight: "critical",
      level: "intermediate",
      growth: "22%",
      salary: "$138,000",
      confidence: "high",
      benchmarks: { B: true, R: true, M: true, O: true }
    },
    {
      id: "express-1",
      title: "Express.js",
      category: "specialized",
      businessCategory: "Backend",
      subcategory: "Framework",
      weight: "technical",
      level: "intermediate",
      growth: "15%",
      salary: "$130,000",
      confidence: "high",
      benchmarks: { B: true, R: true, M: true, O: true }
    },
    {
      id: "mongo-1",
      title: "MongoDB",
      category: "specialized",
      businessCategory: "Backend",
      subcategory: "Database",
      weight: "technical",
      level: "intermediate",
      growth: "20%",
      salary: "$140,000",
      confidence: "high",
      benchmarks: { B: true, R: true, M: true, O: true }
    },
    {
      id: "aws-1",
      title: "AWS Certified Solutions Architect",
      category: "certification",
      businessCategory: "Cloud",
      subcategory: "AWS",
      weight: "critical",
      level: "intermediate",
      growth: "25%",
      salary: "$150,000",
      confidence: "high",
      benchmarks: { B: true, R: true, M: true, O: true }
    }
  ],
  "125": [
    {
      id: "react-1",
      title: "React",
      category: "specialized",
      businessCategory: "Frontend",
      subcategory: "Framework",
      weight: "critical",
      level: "advanced",
      growth: "25%",
      salary: "$145,000",
      confidence: "high",
      benchmarks: { B: true, R: true, M: true, O: true }
    },
    {
      id: "ts-1",
      title: "TypeScript",
      category: "specialized",
      businessCategory: "Frontend",
      subcategory: "Language",
      weight: "critical",
      level: "advanced",
      growth: "28%",
      salary: "$150,000",
      confidence: "high",
      benchmarks: { B: true, R: true, M: true, O: true }
    },
    {
      id: "next-1",
      title: "Next.js",
      category: "specialized",
      businessCategory: "Frontend",
      subcategory: "Framework",
      weight: "critical",
      level: "advanced",
      growth: "30%",
      salary: "$155,000",
      confidence: "high",
      benchmarks: { B: true, R: true, M: true, O: true }
    },
    {
      id: "tailwind-1",
      title: "Tailwind CSS",
      category: "specialized",
      businessCategory: "Frontend",
      subcategory: "Styling",
      weight: "technical",
      level: "advanced",
      growth: "22%",
      salary: "$140,000",
      confidence: "high",
      benchmarks: { B: true, R: true, M: true, O: true }
    },
    {
      id: "redux-1",
      title: "Redux",
      category: "specialized",
      businessCategory: "Frontend",
      subcategory: "State Management",
      weight: "technical",
      level: "advanced",
      growth: "20%",
      salary: "$145,000",
      confidence: "high",
      benchmarks: { B: true, R: true, M: true, O: true }
    },
    {
      id: "web-cert-1",
      title: "Google Mobile Web Specialist",
      category: "certification",
      businessCategory: "Frontend",
      subcategory: "Web",
      weight: "technical",
      level: "advanced",
      growth: "15%",
      salary: "$140,000",
      confidence: "high",
      benchmarks: { B: true, R: true, M: true, O: true }
    }
  ],
  "126": [
    {
      id: "lead-1",
      title: "Team Leadership",
      category: "common",
      businessCategory: "Management",
      subcategory: "Leadership",
      weight: "critical",
      level: "advanced",
      growth: "15%",
      salary: "$180,000",
      confidence: "high",
      benchmarks: { B: true, R: true, M: true, O: true }
    },
    {
      id: "pm-1",
      title: "Project Management",
      category: "specialized",
      businessCategory: "Management",
      subcategory: "Project Management",
      weight: "critical",
      level: "advanced",
      growth: "18%",
      salary: "$175,000",
      confidence: "high",
      benchmarks: { B: true, R: true, M: true, O: true }
    },
    {
      id: "arch-1",
      title: "System Architecture",
      category: "specialized",
      businessCategory: "Engineering",
      subcategory: "Architecture",
      weight: "critical",
      level: "advanced",
      growth: "22%",
      salary: "$190,000",
      confidence: "high",
      benchmarks: { B: true, R: true, M: true, O: true }
    },
    {
      id: "agile-1",
      title: "Agile Methodologies",
      category: "common",
      businessCategory: "Management",
      subcategory: "Process",
      weight: "technical",
      level: "advanced",
      growth: "15%",
      salary: "$170,000",
      confidence: "high",
      benchmarks: { B: true, R: true, M: true, O: true }
    },
    {
      id: "stake-1",
      title: "Stakeholder Management",
      category: "common",
      businessCategory: "Management",
      subcategory: "Communication",
      weight: "technical",
      level: "advanced",
      growth: "12%",
      salary: "$165,000",
      confidence: "high",
      benchmarks: { B: true, R: true, M: true, O: true }
    },
    {
      id: "pmp-1",
      title: "Project Management Professional (PMP)",
      category: "certification",
      businessCategory: "Management",
      subcategory: "Project Management",
      weight: "critical",
      level: "advanced",
      growth: "20%",
      salary: "$180,000",
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