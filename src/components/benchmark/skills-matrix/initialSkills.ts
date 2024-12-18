import { UnifiedSkill } from '../../skills/types/SkillTypes';
import { Skills, getAllSkills } from '../../skills/data/skills/allSkills';

// Get base skills from allSkills
const baseSkills = getAllSkills();

// Employee skills database with additional non-matching skills
const employeeSkills: { [key: string]: UnifiedSkill[] } = {
  "123": [
    // Filter and map skills from allSkills based on employee's profile
    ...baseSkills.filter(skill => 
      ["Machine Learning", "Deep Learning", "Natural Language Processing", "Computer Vision", "TensorFlow", "GraphQL"].includes(skill.title)
    ),
    ...baseSkills.filter(skill => 
      ["Python", "Problem Solving", "Technical Writing", "Git Version Control", "Communication"].includes(skill.title)
    ),
    ...baseSkills.filter(skill => 
      ["AWS Certified Machine Learning - Specialty", "TensorFlow Developer Certificate"].includes(skill.title)
    ),
    // Keep custom skills that might not be in allSkills
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
    ...baseSkills.filter(skill => 
      ["Node.js", "Database Design", "API Development", "System Architecture", "Kubernetes", "GraphQL"].includes(skill.title)
    ),
    ...baseSkills.filter(skill => 
      ["Problem Solving", "Code Review", "Agile Methodologies", "Git Version Control", "Communication"].includes(skill.title)
    ),
    ...baseSkills.filter(skill => 
      ["AWS Certified Solutions Architect", "Kubernetes Administrator (CKA)"].includes(skill.title)
    ),
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
    ...baseSkills.filter(skill => 
      ["React", "Agile", "Technical Communication", "GCP", "SEO Optimization"].includes(skill.title)
    ),
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
    }
  ],
  "126": [
    ...baseSkills.filter(skill => 
      ["Team Leadership", "AWS Solutions Architect"].includes(skill.title)
    ),
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
