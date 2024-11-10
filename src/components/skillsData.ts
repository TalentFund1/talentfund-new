// Technical Skills
const webDevelopment = [
  "React", "Angular", "Vue.js", "Next.js", "Node.js", "Express.js",
  "Django", "Flask", "HTML5", "CSS3", "Sass", "Tailwind CSS",
  "Bootstrap", "Material UI", "GraphQL"
];

const programmingLanguages = [
  "JavaScript", "TypeScript", "Python", "Java", "C++", "Ruby",
  "Go", "Rust", "PHP", "Swift", "SystemVerilog"
];

const cloudAndDevOps = [
  "AWS Lambda", "Azure Functions", "Docker", "Kubernetes", "Jenkins",
  "GitLab CI", "Terraform", "Ansible", "Linux", "Nginx", "Apache"
];

const hardwareAndSystems = [
  "Computer Architecture", "Static Timing Analysis", "Cadence Encounter",
  "Synopsys Primetime", "Internet of Things"
];

const toolsAndSoftware = [
  "Microsoft Excel", "Git", "GitHub", "Bitbucket", "GitLab",
  "Version Control Best Practices"
];

export const technicalSkills = [
  ...programmingLanguages,
  ...webDevelopment,
  ...cloudAndDevOps,
  ...hardwareAndSystems,
  ...toolsAndSoftware
];

// Soft Skills
const projectManagement = [
  "Agile Methodologies", "Project Management", "Scrum", "Time Management"
];

const problemSolving = [
  "Problem Solving", "Critical Thinking", "Analytical Skills",
  "Problem Analysis", "Creative Problem Solving", "Research Skills",
  "Logical Reasoning", "Innovation", "Design Thinking"
];

const design = ["UI/UX Design Principles"];

const otherSkills = [
  "Team Leadership", "Strategic Planning", "Decision Making",
  "Conflict Resolution", "Change Management", "Performance Management",
  "Mentoring", "Coaching", "Team Building", "Communication",
  "Presentation Skills", "Technical Writing", "Active Listening",
  "Interpersonal Communication", "Cross-cultural Communication"
];

export const softSkills = [
  ...projectManagement,
  ...problemSolving,
  ...design,
  ...otherSkills
];

export const certificationSkills = [
  "Cybersecurity License",
  "AWS Certified Solutions Architect",
  "Kubernetes Administrator (CKA)",
  "Professional Agile Leadership",
  "Azure Solutions Architect"
];

// Skill categorization helpers
export const isSpecializedSkill = (skill: string) => {
  const specializedSkills = [
    ...hardwareAndSystems,
    ...cloudAndDevOps.filter(s => ["Kubernetes", "Docker", "AWS Lambda", "Azure Functions"].includes(s))
  ];
  return specializedSkills.includes(skill);
};

export const isCommonSkill = (skill: string) => {
  const commonSkills = [
    ...projectManagement,
    ...problemSolving,
    ...otherSkills,
    ...toolsAndSoftware,
    "JavaScript", "Python", "HTML5", "CSS3"
  ];
  return commonSkills.includes(skill);
};

export const isCertificationSkill = (skill: string) => {
  return certificationSkills.includes(skill);
};