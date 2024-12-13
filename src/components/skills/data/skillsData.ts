import { versionControlSkills } from './skills/categories/versionControlSkills';

// Base skills excluding Git Version Control
const baseSkills = [
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
].filter(skill => skill.title !== "Git Version Control");

// Combine base skills with version control skills
export const skills = baseSkills.concat(versionControlSkills);

// Normalization map
const normalizations: { [key: string]: string } = {
  'Git': 'Git Version Control',
  'Version Control': 'Git Version Control',
  'AWS': 'Amazon Web Services',
  'Amazon AWS': 'Amazon Web Services',
  'TensorFlow Developer Certificate': 'TensorFlow Developer Certification',
  'AWS Certified Machine Learning - Specialty': 'AWS Certified Machine Learning Specialty',
  'AWS DevOps': 'AWS Certified DevOps Engineer',
  'Kubernetes Administrator': 'Certified Kubernetes Administrator',
  'Terraform Associate': 'HashiCorp Certified Terraform Associate',
  'Project Management Professional': 'Project Management Professional (PMP)',
  'Scrum Master': 'Certified Scrum Master (CSM)',
  'Node': 'Node.js',
  'NodeJS': 'Node.js',
  'React JS': 'React',
  'ReactJS': 'React',
  'Next': 'Next.js',
  'NextJS': 'Next.js',
  'TypeScript': 'TypeScript',
  'TS': 'TypeScript',
  'Machine Learning': 'Machine Learning',
  'ML': 'Machine Learning',
  'Artificial Intelligence': 'Artificial Intelligence',
  'AI': 'Artificial Intelligence',
  'CSS3': 'CSS/SASS',
  'SASS': 'CSS/SASS',
  'SCSS': 'CSS/SASS',
  'Docker Container': 'Docker',
  'Kubernetes Container': 'Kubernetes',
  'K8s': 'Kubernetes',
  'Amazon Web Service': 'Amazon Web Services',
  'React Native': 'React Native',
  'GraphQL': 'GraphQL',
  'Flutter': 'Flutter'
};

export const normalizeSkillTitle = (title: string): string => {
  return normalizations[title] || title;
};

console.log('Loaded skills:', {
  total: skills.length,
  versionControl: versionControlSkills.length,
  gitSkills: skills.filter(s => s.title === 'Git Version Control').length
});
