import { EmployeeSkill } from "../../types/employeeTypes";

const specializedSkills = [
  "Programming Proficiency",
  "Machine Learning",
  "Data Structures & Algorithms",
  "Statistical Analysis",
  "AI Model Deployment",
  "Big Data Handling",
  "Deep Learning",
  "Natural Language Processing (NLP)",
  "Computer Vision",
  "AI Optimization",
  "Reinforcement Learning",
  "Edge AI",
  "AI Ethics",
  "Explainable AI",
  "AI Security",
  "Cloud AI Services"
];

const commonSkills = [
  "Problem Solving",
  "API Development",
  "Collaboration",
  "Version Control"
];

const certificationSkills = [
  "Certified Machine Learning Specialist",
  "TensorFlow Developer Certification",
  "Google Professional Data Engineer",
  "Microsoft Certified: Azure AI Engineer Associate",
  "Certified Ethical AI Engineer"
];

const getSkillsForEmployee130 = () => {
  return [
    ...specializedSkills.map(title => ({
      title,
      subcategory: "AI & Machine Learning",
      level: "unspecified",
      growth: "0%",
      requirement: "unknown"
    })),
    ...commonSkills.map(title => ({
      title,
      subcategory: "Common Skills",
      level: "unspecified",
      growth: "0%",
      requirement: "unknown"
    })),
    ...certificationSkills.map(title => ({
      title,
      subcategory: "Certifications",
      level: "unspecified",
      growth: "0%",
      requirement: "unknown"
    }))
  ];
};

export const getEmployeeSkills = (id: string): EmployeeSkill[] => {
  console.log('Getting skills for employee:', id);
  
  if (id === "130") {
    return getSkillsForEmployee130();
  }
  
  if (id === "123") {
    return [
      { title: "Machine Learning", subcategory: "AI & Machine Learning", level: "advanced", growth: "30%", requirement: "required" },
      { title: "Deep Learning", subcategory: "AI & Machine Learning", level: "advanced", growth: "25%", requirement: "required" },
      { title: "TensorFlow", subcategory: "Machine Learning Frameworks", level: "advanced", growth: "20%", requirement: "preferred" },
      { title: "PyTorch", subcategory: "Machine Learning Frameworks", level: "advanced", growth: "24%", requirement: "preferred" },
      { title: "Computer Vision", subcategory: "AI Applications", level: "advanced", growth: "22%", requirement: "preferred" },
      { title: "Natural Language Processing", subcategory: "AI Applications", level: "advanced", growth: "28%", requirement: "preferred" },
      { title: "Python", subcategory: "Programming Languages", level: "advanced", growth: "15%", requirement: "required" },
      { title: "Problem Solving", subcategory: "Soft Skills", level: "advanced", growth: "15%", requirement: "required" },
      { title: "Technical Writing", subcategory: "Communication", level: "intermediate", growth: "12%", requirement: "preferred" }
    ];
  }

  if (id === "124") {
    return [
      { title: "Node.js", subcategory: "Backend Development", level: "advanced", growth: "20%", requirement: "required" },
      { title: "Database Design", subcategory: "Data Management", level: "advanced", growth: "15%", requirement: "required" },
      { title: "API Development", subcategory: "Backend Development", level: "advanced", growth: "25%", requirement: "required" },
      { title: "System Architecture", subcategory: "Software Architecture", level: "intermediate", growth: "30%", requirement: "required" },
      { title: "Kubernetes", subcategory: "Container Orchestration", level: "advanced", growth: "28%", requirement: "required" },
      { title: "Problem Solving", subcategory: "Soft Skills", level: "advanced", growth: "15%", requirement: "required" },
      { title: "Code Review", subcategory: "Development Practices", level: "advanced", growth: "12%", requirement: "required" },
      { title: "Agile Methodologies", subcategory: "Project Management", level: "advanced", growth: "15%", requirement: "required" }
    ];
  }

  if (id === "125") {
    return [
      { title: "React", subcategory: "Frontend Frameworks", level: "advanced", growth: "20%", requirement: "required" },
      { title: "TypeScript", subcategory: "Programming Languages", level: "advanced", growth: "25%", requirement: "required" },
      { title: "CSS/SASS", subcategory: "Styling", level: "advanced", growth: "15%", requirement: "required" },
      { title: "Cross-browser Compatibility", subcategory: "Frontend Development", level: "advanced", growth: "12%", requirement: "preferred" },
      { title: "Responsive Design", subcategory: "Web Development", level: "advanced", growth: "18%", requirement: "preferred" },
      { title: "Problem Solving", subcategory: "Soft Skills", level: "advanced", growth: "15%", requirement: "preferred" }
    ];
  }

  if (id === "126") {
    return [
      { title: "System Design", subcategory: "Architecture", level: "advanced", growth: "25%", requirement: "required" },
      { title: "Technical Architecture", subcategory: "Architecture", level: "advanced", growth: "30%", requirement: "required" },
      { title: "Risk Management", subcategory: "Management", level: "advanced", growth: "20%", requirement: "required" },
      { title: "Team Leadership", subcategory: "Leadership", level: "advanced", growth: "22%", requirement: "required" },
      { title: "Project Management", subcategory: "Management", level: "advanced", growth: "25%", requirement: "required" },
      { title: "Strategic Planning", subcategory: "Management", level: "advanced", growth: "30%", requirement: "required" },
      { title: "Stakeholder Management", subcategory: "Leadership", level: "advanced", growth: "22%", requirement: "required" }
    ];
  }

  return [];
};