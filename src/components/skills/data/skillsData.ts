export const skills = [
  {
    title: "Amazon Web Services",
    subcategory: "Web Services",
    level: "Advanced",
    growth: "12%"
  },
  {
    title: "Artificial Intelligence",
    subcategory: "Artificial Intelligence and Machine Learning",
    level: "Advanced",
    growth: "19%"
  },
  {
    title: "Conversational AI",
    subcategory: "Natural Language Processing (NLP)",
    level: "Advanced",
    growth: "12%"
  },
  {
    title: "Deep Learning",
    subcategory: "Artificial Intelligence and Machine Learning",
    level: "Intermediate",
    growth: "19%"
  },
  {
    title: "Machine Learning",
    subcategory: "Artificial Intelligence and Machine Learning",
    level: "Intermediate",
    growth: "10%"
  },
  {
    title: "Docker",
    subcategory: "Software Development Tools",
    level: "Intermediate",
    growth: "15%"
  },
  {
    title: "MLflow",
    subcategory: "Artificial Intelligence and Machine Learning",
    level: "Beginner",
    growth: "11%"
  },
  {
    title: "TensorFlow",
    subcategory: "Machine Learning Frameworks",
    level: "Advanced",
    growth: "16%"
  },
  {
    title: "PyTorch",
    subcategory: "Machine Learning Frameworks",
    level: "Intermediate",
    growth: "18%"
  },
  {
    title: "Natural Language Processing",
    subcategory: "AI Applications",
    level: "Advanced",
    growth: "20%"
  },
  {
    title: "Computer Vision",
    subcategory: "AI Applications",
    level: "Intermediate",
    growth: "22%"
  },
  {
    title: "Kubernetes",
    subcategory: "Container Orchestration",
    level: "Advanced",
    growth: "17%"
  },
  {
    title: "Git",
    subcategory: "Version Control",
    level: "Advanced",
    growth: "8%"
  },
  {
    title: "SQL",
    subcategory: "Databases",
    level: "Advanced",
    growth: "9%"
  },
  {
    title: "MongoDB",
    subcategory: "Databases",
    level: "Intermediate",
    growth: "14%"
  },
  {
    title: "REST APIs",
    subcategory: "Web Development",
    level: "Advanced",
    growth: "11%"
  },
  {
    title: "Python",
    subcategory: "Programming Languages",
    level: "Advanced",
    growth: "15%"
  },
  {
    title: "Data Science",
    subcategory: "Analytics",
    level: "Intermediate",
    growth: "21%"
  },
  {
    title: "React Native",
    subcategory: "Mobile Development",
    level: "Advanced",
    growth: "25%"
  },
  {
    title: "System Design",
    subcategory: "Software Architecture",
    level: "Advanced",
    growth: "21%"
  },
  {
    title: "GraphQL",
    subcategory: "API Development",
    level: "Intermediate",
    growth: "24%"
  },
  {
    title: "DevOps",
    subcategory: "Development Operations",
    level: "Advanced",
    growth: "28%"
  },
  {
    title: "Cybersecurity",
    subcategory: "Security",
    level: "Advanced",
    growth: "30%"
  },
  {
    title: "Data Engineering",
    subcategory: "Data Management",
    level: "Intermediate",
    growth: "26%"
  },
  {
    title: "UI/UX Design",
    subcategory: "Design",
    level: "Intermediate",
    growth: "22%"
  },
  {
    title: "Microservices",
    subcategory: "Software Architecture",
    level: "Advanced",
    growth: "27%"
  },
  {
    title: "Flutter",
    subcategory: "Mobile Development",
    level: "Beginner",
    growth: "23%"
  },
  {
    title: "Blockchain",
    subcategory: "Distributed Systems",
    level: "Intermediate",
    growth: "29%"
  }
];

interface RoleSkills {
  specialized: Array<{
    title: string;
    subcategory: string;
    level: string;
    growth: string;
    salary: string;
    benchmarks: { J: boolean; B: boolean; O: boolean; }
  }>;
  common: Array<{
    title: string;
    subcategory: string;
    level: string;
    growth: string;
    salary: string;
    benchmarks: { J: boolean; B: boolean; O: boolean; }
  }>;
  certifications: Array<{
    title: string;
    subcategory: string;
    level: string;
    growth: string;
    salary: string;
    benchmarks: { J: boolean; B: boolean; O: boolean; }
  }>;
}

export const roleSkills: Record<string, RoleSkills> = {
  "123": {
    specialized: skills.slice(0, 5).map(skill => ({
      ...skill,
      salary: "$120,000",
      benchmarks: { J: true, B: true, O: true }
    })),
    common: skills.slice(5, 10).map(skill => ({
      ...skill,
      salary: "$110,000",
      benchmarks: { J: true, B: false, O: true }
    })),
    certifications: skills.slice(10, 15).map(skill => ({
      ...skill,
      salary: "$130,000",
      benchmarks: { J: false, B: true, O: true }
    }))
  },
  "124": {
    specialized: skills.slice(3, 8).map(skill => ({
      ...skill,
      salary: "$125,000",
      benchmarks: { J: true, B: true, O: false }
    })),
    common: skills.slice(8, 13).map(skill => ({
      ...skill,
      salary: "$115,000",
      benchmarks: { J: true, B: false, O: true }
    })),
    certifications: skills.slice(13, 18).map(skill => ({
      ...skill,
      salary: "$135,000",
      benchmarks: { J: true, B: true, O: true }
    }))
  }
};