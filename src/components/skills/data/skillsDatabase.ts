export interface Skill {
  title: string;
  subcategory: string;
  category: 'critical' | 'technical' | 'necessary';
  growth: string;
  salary: string;
  benchmarks: {
    B: boolean; // Basic
    R: boolean; // Required
    M: boolean; // Management
    O: boolean; // Optional
  };
}

// Centralized skills database
export const skillsDatabase: Record<string, Skill> = {
  "Machine Learning": {
    title: "Machine Learning",
    subcategory: "AI & ML",
    category: "critical",
    growth: "30%",
    salary: "$180,256",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  "Deep Learning": {
    title: "Deep Learning",
    subcategory: "AI & ML",
    category: "critical",
    growth: "28%",
    salary: "$182,000",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  "CSS/SASS": {
    title: "CSS/SASS",
    subcategory: "Frontend Development",
    category: "technical",
    growth: "15%",
    salary: "$165,000",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  "React": {
    title: "React",
    subcategory: "Frontend Frameworks",
    category: "critical",
    growth: "20%",
    salary: "$170,000",
    benchmarks: { B: true, R: true, M: true, O: true }
  },
  // ... Add all other skills with consistent categorization
};

export const getSkillData = (skillTitle: string): Skill | undefined => {
  return skillsDatabase[skillTitle];
};

export const getAllSkills = (): Skill[] => {
  return Object.values(skillsDatabase);
};

export const getSkillsByCategory = (category: 'critical' | 'technical' | 'necessary'): Skill[] => {
  return Object.values(skillsDatabase).filter(skill => skill.category === category);
};
