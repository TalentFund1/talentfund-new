import { UnifiedSkill } from '../../skills/types/SkillTypes';

// Employee skills database
const employeeSkills: { [key: string]: UnifiedSkill[] } = {
  "123": [
    {
      id: "ml-1",
      title: "Machine Learning",
      category: "technical",
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
      category: "technical",
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
    {
      id: "node-1",
      title: "Node.js",
      category: "technical",
      businessCategory: "Backend",
      subcategory: "Runtime",
      weight: "critical",
      level: "intermediate",
      growth: "20%",
      salary: "$140,000",
      confidence: "high",
      benchmarks: { B: true, R: true, M: true, O: true }
    }
  ],
  "125": [
    {
      id: "react-1",
      title: "React",
      category: "technical",
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
    {
      id: "leadership-1",
      title: "Team Leadership",
      category: "soft",
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
  return employeeSkills[id] || [];
};