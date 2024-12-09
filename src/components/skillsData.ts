export const skills = [
  {
    title: "Amazon Web Services",
    subcategory: "Cloud Platforms",
    level: "Advanced",
    growth: "35%",
    salary: "$175,000"
  },
  {
    title: "Artificial Intelligence",
    subcategory: "AI & ML",
    level: "Advanced",
    growth: "35%",
    salary: "$185,000"
  },
  {
    title: "Conversational AI",
    subcategory: "AI Applications",
    level: "Advanced",
    growth: "30%",
    salary: "$175,000"
  },
  {
    title: "Deep Learning",
    subcategory: "AI & ML",
    level: "Advanced",
    growth: "32%",
    salary: "$180,000"
  },
  {
    title: "Machine Learning",
    subcategory: "AI & ML",
    level: "Advanced",
    growth: "35%",
    salary: "$185,000"
  },
  {
    title: "Docker",
    subcategory: "Container Technology",
    level: "Advanced",
    growth: "28%",
    salary: "$160,000"
  },
  {
    title: "MLflow",
    subcategory: "ML Frameworks",
    level: "Beginner",
    growth: "25%",
    salary: "$150,000"
  },
  {
    title: "TensorFlow",
    subcategory: "ML Frameworks",
    level: "Advanced",
    growth: "25%",
    salary: "$165,000"
  },
  {
    title: "PyTorch",
    subcategory: "ML Frameworks",
    level: "Intermediate",
    growth: "28%",
    salary: "$160,000"
  },
  {
    title: "Natural Language Processing",
    subcategory: "AI Applications",
    level: "Advanced",
    growth: "30%",
    salary: "$175,000"
  },
  {
    title: "Computer Vision",
    subcategory: "AI Applications",
    level: "Intermediate",
    growth: "28%",
    salary: "$170,000"
  },
  {
    title: "Kubernetes",
    subcategory: "Container Orchestration",
    level: "Advanced",
    growth: "32%",
    salary: "$170,000"
  },
  {
    title: "Git Version Control",
    subcategory: "Development Tools",
    level: "Advanced",
    growth: "15%",
    salary: "$145,000"
  },
  {
    title: "SQL",
    subcategory: "Databases",
    level: "Advanced",
    growth: "22%",
    salary: "$145,000"
  },
  {
    title: "MongoDB",
    subcategory: "Databases",
    level: "Intermediate",
    growth: "24%",
    salary: "$140,000"
  },
  {
    title: "REST APIs",
    subcategory: "Backend Development",
    level: "Advanced",
    growth: "26%",
    salary: "$150,000"
  },
  {
    title: "Python",
    subcategory: "Programming Languages",
    level: "Advanced",
    growth: "15%",
    salary: "$158,000"
  },
  {
    title: "Data Science",
    subcategory: "Analytics",
    level: "Intermediate",
    growth: "30%",
    salary: "$165,000"
  },
  {
    title: "React",
    subcategory: "Frontend Frameworks",
    level: "Advanced",
    growth: "28%",
    salary: "$165,000"
  },
  {
    title: "System Design",
    subcategory: "Software Architecture",
    level: "Advanced",
    growth: "28%",
    salary: "$165,000"
  },
  {
    title: "GraphQL",
    subcategory: "API Development",
    level: "Intermediate",
    growth: "26%",
    salary: "$155,000"
  },
  {
    title: "DevOps",
    subcategory: "Development Operations",
    level: "Advanced",
    growth: "32%",
    salary: "$170,000"
  },
  {
    title: "Cybersecurity",
    subcategory: "Security",
    level: "Advanced",
    growth: "35%",
    salary: "$180,000"
  },
  {
    title: "Data Engineering",
    subcategory: "Data Management",
    level: "Intermediate",
    growth: "26%",
    salary: "$160,000"
  },
  {
    title: "UI/UX Design",
    subcategory: "Design",
    level: "Intermediate",
    growth: "22%",
    salary: "$155,000"
  },
  {
    title: "Microservices",
    subcategory: "Software Architecture",
    level: "Advanced",
    growth: "30%",
    salary: "$170,000"
  },
  {
    title: "Flutter",
    subcategory: "Mobile Development",
    level: "Beginner",
    growth: "25%",
    salary: "$145,000"
  },
  {
    title: "Blockchain",
    subcategory: "Distributed Systems",
    level: "Intermediate",
    growth: "32%",
    salary: "$175,000"
  },
  {
    title: "Communication",
    subcategory: "Soft Skills",
    level: "Advanced",
    growth: "18%",
    salary: "$150,000"
  }
];

// Helper function to get unique skills by title
const getUniqueSkills = (skillsArray: typeof skills) => {
  const seen = new Set();
  return skillsArray.filter(skill => {
    const duplicate = seen.has(skill.title);
    seen.add(skill.title);
    return !duplicate;
  });
};

// Categorize skills into technical and soft skills and map to titles
export const technicalSkills = getUniqueSkills(skills
  .filter(skill => 
    ['Web Services', 'Artificial Intelligence and Machine Learning', 'Software Development Tools', 
     'Machine Learning Frameworks', 'AI Applications', 'Container Orchestration', 'Version Control',
     'Databases', 'Web Development', 'Programming Languages', 'Mobile Development', 
     'Software Architecture', 'API Development', 'Development Operations', 'Security',
     'Data Management', 'Distributed Systems'].includes(skill.subcategory)
  ))
  .map(skill => skill.title);

export const softSkills = getUniqueSkills(skills
  .filter(skill => 
    ['Design', 'Analytics'].includes(skill.subcategory)
  ))
  .map(skill => skill.title);

// Export full skill objects for when we need the complete data
export const technicalSkillObjects = getUniqueSkills(skills.filter(skill => 
  ['Web Services', 'Artificial Intelligence and Machine Learning', 'Software Development Tools', 
   'Machine Learning Frameworks', 'AI Applications', 'Container Orchestration', 'Version Control',
   'Databases', 'Web Development', 'Programming Languages', 'Mobile Development', 
   'Software Architecture', 'API Development', 'Development Operations', 'Security',
   'Data Management', 'Distributed Systems'].includes(skill.subcategory)
));

export const softSkillObjects = getUniqueSkills(skills.filter(skill => 
  ['Design', 'Analytics'].includes(skill.subcategory)
));

console.log('Loaded skills:', {
  total: skills.length,
  technical: technicalSkills.length,
  soft: softSkills.length
});