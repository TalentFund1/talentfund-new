import { initialSkills } from "./benchmark/skills-matrix/initialSkills";

// Extract unique skills from initialSkills by combining all employee skills
const matrixSkills = Object.values(initialSkills)
  .flatMap(skills => skills.map(skill => skill.title));

export const technicalSkills = [
  ...new Set([
    ...matrixSkills,
    // Programming Languages
    "JavaScript", "TypeScript", "Python", "Java", "C++", "Ruby", "Go", "Rust", "PHP", "Swift",
    
    // Web Development
    "React", "Angular", "Vue.js", "Next.js", "Node.js", "Express.js", "Django", "Flask",
    "HTML5", "CSS3", "Sass", "Tailwind CSS", "Bootstrap", "Material UI", "IPA Development",
    
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