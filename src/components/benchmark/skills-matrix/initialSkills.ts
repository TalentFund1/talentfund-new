import { UnifiedSkill } from '../../skills/types/SkillTypes';
import { getSkillByTitle } from '../../skills/data/skills/allSkills';

// Employee skills database - now using references to universal skills
const employeeSkills: { [key: string]: UnifiedSkill[] } = {
  "123": [
    getSkillByTitle("Machine Learning") || {
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
    getSkillByTitle("Deep Learning") || {
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
    }
  ],
  "124": [
    getSkillByTitle("Node.js") || {
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
    getSkillByTitle("Database Design") || {
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
    getSkillByTitle("API Development") || {
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
    }
  ],
  "125": [
    getSkillByTitle("React") || {
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
    }
  ],
  "126": [
    getSkillByTitle("Team Leadership") || {
      id: "leadership-1",
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
    }
  ]
};

export const getEmployeeSkills = (id: string): UnifiedSkill[] => {
  console.log('Getting skills for employee:', id);
  const skills = employeeSkills[id] || [];
  console.log('Retrieved skills:', skills);
  return skills;
};