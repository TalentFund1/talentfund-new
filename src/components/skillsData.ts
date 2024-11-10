export const specializedSkills = [
  // Programming Languages & Frameworks
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C++",
  "Ruby",
  "Go",
  "Rust",
  "PHP",
  "Swift",
  "SystemVerilog",
  "React",
  "Angular",
  "Vue.js",
  "Next.js",
  "Node.js",
  
  // Cloud & DevOps
  "AWS Lambda",
  "Azure Functions",
  "Docker",
  "Kubernetes",
  "Jenkins",
  "GitLab CI",
  "Terraform",
  
  // Hardware & Systems
  "Computer Architecture",
  "Static Timing Analysis",
  "Cadence Encounter",
  "Synopsys Primetime",
  "Internet of Things",
  "GraphQL"
];

export const commonSkills = [
  // Web Development Basics
  "HTML5",
  "CSS3",
  "Sass",
  "Tailwind CSS",
  "Bootstrap",
  "Material UI",
  
  // Tools & Software
  "Microsoft Excel",
  "Git",
  "GitHub",
  "Bitbucket",
  "GitLab",
  "Version Control Best Practices",
  
  // Infrastructure
  "Linux",
  "Nginx",
  "Apache",
  "Express.js",
  "Django",
  "Flask",
  
  // Project Management
  "Agile Methodologies",
  "Project Management",
  "Scrum",
  "Time Management",
  
  // Problem Solving
  "Problem Solving",
  "Critical Thinking",
  "Analytical Skills",
  "Problem Analysis",
  "Creative Problem Solving",
  "Research Skills",
  "Logical Reasoning",
  "Innovation",
  "Design Thinking",
  
  // Design & Communication
  "UI/UX Design Principles",
  "Team Leadership",
  "Strategic Planning",
  "Decision Making",
  "Conflict Resolution",
  "Change Management",
  "Performance Management",
  "Mentoring",
  "Coaching",
  "Team Building",
  "Communication",
  "Presentation Skills",
  "Technical Writing",
  "Active Listening",
  "Interpersonal Communication",
  "Cross-cultural Communication"
];

export const certificationSkills = [
  "AWS Certified Solutions Architect",
  "AWS Certified Developer",
  "Professional Scrum Master",
  "Kubernetes Administrator (CKA)",
  "Azure Solutions Architect",
  "Cybersecurity License"
];

export const allSkills = [
  ...specializedSkills,
  ...commonSkills,
  ...certificationSkills
];

export const categorizeSkill = (skill: string) => {
  if (specializedSkills.includes(skill)) return "specialized";
  if (commonSkills.includes(skill)) return "common";
  if (certificationSkills.includes(skill)) return "certification";
  return "common"; // Default category
};