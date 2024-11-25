import { EmployeeSkill } from "../../types/employeeTypes";

export const initialSkills: { [key: string]: EmployeeSkill[] } = {
  "130": [
    // Specialized Skills
    { title: "Programming Proficiency", subcategory: "AI & Machine Learning", level: "unspecified", growth: "0%", requirement: "unknown" },
    { title: "Machine Learning", subcategory: "AI & Machine Learning", level: "unspecified", growth: "0%", requirement: "unknown" },
    { title: "Data Structures & Algorithms", subcategory: "AI & Machine Learning", level: "unspecified", growth: "0%", requirement: "unknown" },
    { title: "Statistical Analysis", subcategory: "AI & Machine Learning", level: "unspecified", growth: "0%", requirement: "unknown" },
    { title: "AI Model Deployment", subcategory: "AI & Machine Learning", level: "unspecified", growth: "0%", requirement: "unknown" },
    { title: "Big Data Handling", subcategory: "AI & Machine Learning", level: "unspecified", growth: "0%", requirement: "unknown" },
    { title: "Deep Learning", subcategory: "AI & Machine Learning", level: "unspecified", growth: "0%", requirement: "unknown" },
    { title: "Natural Language Processing (NLP)", subcategory: "AI & Machine Learning", level: "unspecified", growth: "0%", requirement: "unknown" },
    { title: "Computer Vision", subcategory: "AI & Machine Learning", level: "unspecified", growth: "0%", requirement: "unknown" },
    { title: "AI Optimization", subcategory: "AI & Machine Learning", level: "unspecified", growth: "0%", requirement: "unknown" },
    { title: "Reinforcement Learning", subcategory: "AI & Machine Learning", level: "unspecified", growth: "0%", requirement: "unknown" },
    { title: "Edge AI", subcategory: "AI & Machine Learning", level: "unspecified", growth: "0%", requirement: "unknown" },
    { title: "AI Ethics", subcategory: "AI & Machine Learning", level: "unspecified", growth: "0%", requirement: "unknown" },
    { title: "Explainable AI", subcategory: "AI & Machine Learning", level: "unspecified", growth: "0%", requirement: "unknown" },
    { title: "AI Security", subcategory: "AI & Machine Learning", level: "unspecified", growth: "0%", requirement: "unknown" },
    { title: "Cloud AI Services", subcategory: "AI & Machine Learning", level: "unspecified", growth: "0%", requirement: "unknown" },
    
    // Common Skills
    { title: "Problem Solving", subcategory: "Common Skills", level: "unspecified", growth: "0%", requirement: "unknown" },
    { title: "API Development", subcategory: "Common Skills", level: "unspecified", growth: "0%", requirement: "unknown" },
    { title: "Collaboration", subcategory: "Common Skills", level: "unspecified", growth: "0%", requirement: "unknown" },
    { title: "Version Control", subcategory: "Common Skills", level: "unspecified", growth: "0%", requirement: "unknown" },
    
    // Certifications
    { title: "Certified Machine Learning Specialist", subcategory: "Certifications", level: "unspecified", growth: "0%", requirement: "unknown" },
    { title: "TensorFlow Developer Certification", subcategory: "Certifications", level: "unspecified", growth: "0%", requirement: "unknown" },
    { title: "Google Professional Data Engineer", subcategory: "Certifications", level: "unspecified", growth: "0%", requirement: "unknown" },
    { title: "Microsoft Certified: Azure AI Engineer Associate", subcategory: "Certifications", level: "unspecified", growth: "0%", requirement: "unknown" },
    { title: "Certified Ethical AI Engineer", subcategory: "Certifications", level: "unspecified", growth: "0%", requirement: "unknown" }
  ],
  // Employee with id "123"
  "123": [
    { title: "Machine Learning", subcategory: "AI & Machine Learning", level: "advanced", growth: "30%", requirement: "required" },
    { title: "Deep Learning", subcategory: "AI & Machine Learning", level: "advanced", growth: "25%", requirement: "required" },
    { title: "TensorFlow", subcategory: "Machine Learning Frameworks", level: "advanced", growth: "20%", requirement: "preferred" },
    { title: "PyTorch", subcategory: "Machine Learning Frameworks", level: "advanced", growth: "24%", requirement: "preferred" },
    { title: "Computer Vision", subcategory: "AI Applications", level: "advanced", growth: "22%", requirement: "preferred" },
    { title: "Natural Language Processing", subcategory: "AI Applications", level: "advanced", growth: "28%", requirement: "preferred" },
    { title: "Python", subcategory: "Programming Languages", level: "advanced", growth: "15%", requirement: "required" },
    { title: "Problem Solving", subcategory: "Soft Skills", level: "advanced", growth: "15%", requirement: "required" },
    { title: "Technical Writing", subcategory: "Communication", level: "intermediate", growth: "12%", requirement: "preferred" }
  ],
  // Employee with id "124"
  "124": [
    { title: "Node.js", subcategory: "Backend Development", level: "advanced", growth: "20%", requirement: "required" },
    { title: "Database Design", subcategory: "Data Management", level: "advanced", growth: "15%", requirement: "required" },
    { title: "API Development", subcategory: "Backend Development", level: "advanced", growth: "25%", requirement: "required" },
    { title: "System Architecture", subcategory: "Software Architecture", level: "intermediate", growth: "30%", requirement: "required" },
    { title: "Kubernetes", subcategory: "Container Orchestration", level: "advanced", growth: "28%", requirement: "required" },
    { title: "Problem Solving", subcategory: "Soft Skills", level: "advanced", growth: "15%", requirement: "required" },
    { title: "Code Review", subcategory: "Development Practices", level: "advanced", growth: "12%", requirement: "required" },
    { title: "Agile Methodologies", subcategory: "Project Management", level: "advanced", growth: "15%", requirement: "required" }
  ],
  // Employee with id "125"
  "125": [
    { title: "React", subcategory: "Frontend Frameworks", level: "advanced", growth: "20%", requirement: "required" },
    { title: "TypeScript", subcategory: "Programming Languages", level: "advanced", growth: "25%", requirement: "required" },
    { title: "CSS/SASS", subcategory: "Styling", level: "advanced", growth: "15%", requirement: "required" },
    { title: "Cross-browser Compatibility", subcategory: "Frontend Development", level: "advanced", growth: "12%", requirement: "preferred" },
    { title: "Responsive Design", subcategory: "Web Development", level: "advanced", growth: "18%", requirement: "preferred" },
    { title: "Problem Solving", subcategory: "Soft Skills", level: "advanced", growth: "15%", requirement: "preferred" }
  ],
  // Employee with id "126"
  "126": [
    { title: "System Design", subcategory: "Architecture", level: "advanced", growth: "25%", requirement: "required" },
    { title: "Technical Architecture", subcategory: "Architecture", level: "advanced", growth: "30%", requirement: "required" },
    { title: "Risk Management", subcategory: "Management", level: "advanced", growth: "20%", requirement: "required" },
    { title: "Team Leadership", subcategory: "Leadership", level: "advanced", growth: "22%", requirement: "required" },
    { title: "Project Management", subcategory: "Management", level: "advanced", growth: "25%", requirement: "required" },
    { title: "Strategic Planning", subcategory: "Management", level: "advanced", growth: "30%", requirement: "required" },
    { title: "Stakeholder Management", subcategory: "Leadership", level: "advanced", growth: "22%", requirement: "required" }
  ]
};

export const getEmployeeSkills = (id: string): EmployeeSkill[] => {
  console.log('Getting skills for employee:', id);
  return initialSkills[id] || [];
};
