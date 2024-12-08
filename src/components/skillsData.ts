// Define the skills array
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
    title: "Git Version Control",
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

// Categorize skills into technical and soft skills
export const technicalSkills = skills.filter(skill => 
  ['Web Services', 'Artificial Intelligence and Machine Learning', 'Software Development Tools', 
   'Machine Learning Frameworks', 'AI Applications', 'Container Orchestration', 'Version Control',
   'Databases', 'Web Development', 'Programming Languages', 'Mobile Development', 
   'Software Architecture', 'API Development', 'Development Operations', 'Security',
   'Data Management', 'Distributed Systems'].includes(skill.subcategory)
);

export const softSkills = skills.filter(skill => 
  ['Design', 'Analytics'].includes(skill.subcategory)
);

console.log('Loaded skills:', {
  total: skills.length,
  technical: technicalSkills.length,
  soft: softSkills.length
});