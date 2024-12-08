import { getEmployeeSkills } from "./benchmark/skills-matrix/initialSkills";
import { roleSkills } from "./skills/data/roleSkills";

// Extract unique skills from all sources
const getAllSkills = () => {
  // Get skills from all employees
  const employeeSkills = Object.keys(roleSkills).flatMap(id => 
    getEmployeeSkills(id).map(skill => skill.title)
  );

  // Get skills from all roles
  const roleBasedSkills = Object.values(roleSkills).flatMap(role => [
    ...role.specialized.map(skill => skill.title),
    ...role.common.map(skill => skill.title),
    ...role.certifications.map(skill => skill.title)
  ]);

  // Combine and deduplicate
  return [...new Set([...employeeSkills, ...roleBasedSkills])];
};

const matrixSkills = getAllSkills();

// Universal skill categorization mapping
export const skillCategorization = {
  // AI & ML
  "Machine Learning": { category: "specialized", subcategory: "AI & ML" },
  "Deep Learning": { category: "specialized", subcategory: "AI & ML" },
  "Natural Language Processing": { category: "specialized", subcategory: "AI Applications" },
  "Computer Vision": { category: "specialized", subcategory: "AI Applications" },
  "TensorFlow": { category: "specialized", subcategory: "ML Frameworks" },
  "PyTorch": { category: "specialized", subcategory: "ML Frameworks" },
  
  // Programming & Development
  "Python": { category: "common", subcategory: "Programming Languages" },
  "JavaScript": { category: "common", subcategory: "Programming Languages" },
  "TypeScript": { category: "common", subcategory: "Programming Languages" },
  "React": { category: "specialized", subcategory: "Frontend Frameworks" },
  "Next.js": { category: "specialized", subcategory: "Frontend Frameworks" },
  "Node.js": { category: "specialized", subcategory: "Backend Development" },
  "CSS/SASS": { category: "specialized", subcategory: "Frontend Development" },
  "Git Version Control": { category: "common", subcategory: "Development Tools" },
  "API Development": { category: "specialized", subcategory: "Backend Development" },
  "System Architecture": { category: "specialized", subcategory: "Software Architecture" },
  "Code Review": { category: "common", subcategory: "Development Practices" },
  "Agile Methodologies": { category: "common", subcategory: "Project Management" },
  
  // DevOps & Cloud
  "Docker": { category: "specialized", subcategory: "Container Technology" },
  "Kubernetes": { category: "specialized", subcategory: "Container Orchestration" },
  "AWS": { category: "specialized", subcategory: "Cloud Platforms" },
  
  // Soft Skills & Communication
  "Problem Solving": { category: "common", subcategory: "Soft Skills" },
  "Technical Writing": { category: "common", subcategory: "Communication" },
  "Team Leadership": { category: "common", subcategory: "Leadership" },
  
  // Certifications
  "AWS Certified Machine Learning - Specialty": { category: "certification", subcategory: "Cloud Certification" },
  "TensorFlow Developer Certificate": { category: "certification", subcategory: "AI Certification" },
  "AWS Certified Developer - Associate": { category: "certification", subcategory: "Cloud Certification" },
  "Google Mobile Web Specialist": { category: "certification", subcategory: "Web Development Certification" },
  "Kubernetes Administrator (CKA)": { category: "certification", subcategory: "Container Certification" }
};

export const technicalSkills = [
  ...new Set([
    ...matrixSkills,
    // Programming Languages
    "JavaScript", "TypeScript", "Python", "Java", "C++", "Ruby", "Go", "Rust", "PHP", "Swift",
    "IPA Development", // Added new skill here
    
    // Web Development
    "React", "Angular", "Vue.js", "Next.js", "Node.js", "Express.js", "Django", "Flask",
    "HTML5", "CSS3", "Sass", "Tailwind CSS", "Bootstrap", "Material UI",
    
    // Database
    "SQL", "PostgreSQL", "MongoDB", "Redis", "Elasticsearch", "Oracle", "MySQL",
    
    // Cloud & DevOps
    "AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "Jenkins", "GitLab CI",
    "Terraform", "Ansible", "Linux", "Nginx", "Apache",
    
    // AI & ML
    "TensorFlow", "PyTorch", "Scikit-learn", "Natural Language Processing",
    "Computer Vision", "Machine Learning", "Deep Learning", "Data Science",
    
    // Mobile Development
    "React Native", "Flutter", "iOS Development", "Android Development",
    "Kotlin", "SwiftUI", "Mobile App Architecture",
    
    // Testing
    "Jest", "Cypress", "Selenium", "JUnit", "TestNG", "Mocha", "Testing Methodologies",
    
    // Version Control
    "Git", "GitHub", "Bitbucket", "GitLab", "Version Control Best Practices"
  ])
];

export const softSkills = [
  // Leadership & Management
  "Team Leadership", "Project Management", "Strategic Planning", "Decision Making",
  "Conflict Resolution", "Change Management", "Performance Management",
  "Mentoring", "Coaching", "Team Building",
  
  // Communication
  "Verbal Communication", "Written Communication", "Public Speaking",
  "Presentation Skills", "Technical Writing", "Active Listening",
  "Interpersonal Communication", "Cross-cultural Communication",
  
  // Problem Solving
  "Critical Thinking", "Analytical Skills", "Problem Analysis",
  "Creative Problem Solving", "Research Skills", "Logical Reasoning",
  "Innovation", "Design Thinking",
  
  // Collaboration
  "Team Collaboration", "Cross-functional Collaboration", "Remote Collaboration",
  "Stakeholder Management", "Client Relations", "Partnership Building",
  
  // Work Management
  "Time Management", "Task Prioritization", "Organization Skills",
  "Meeting Management", "Deadline Management", "Multitasking",
  
  // Personal Development
  "Adaptability", "Learning Agility", "Growth Mindset", "Self-motivation",
  "Emotional Intelligence", "Resilience", "Work Ethics", "Initiative",
  
  // Business Skills
  "Business Acumen", "Strategic Thinking", "Requirements Gathering",
  "Process Improvement", "Risk Management", "Quality Assurance",
  
  // Customer Focus
  "Customer Service", "User Experience", "Client Communication",
  "Needs Assessment", "Customer Feedback Management"
];

// Helper function to get skill categorization
export const getSkillCategorization = (skillTitle: string) => {
  const defaultCategorization = {
    category: "common",
    subcategory: "General Skills"
  };

  return skillCategorization[skillTitle] || defaultCategorization;
};