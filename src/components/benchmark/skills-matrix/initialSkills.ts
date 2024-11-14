// Individual employee skills data
export const initialSkills = {
  "124": [ // Backend Engineer - Jennie Richards
    { title: "Node.js", subcategory: "Backend Development", level: "advanced", growth: "20%", confidence: "high", requirement: "required", isCompanySkill: true },
    { title: "Database Design", subcategory: "Data Management", level: "advanced", growth: "15%", confidence: "high", requirement: "required", isCompanySkill: true },
    { title: "API Development", subcategory: "Backend Development", level: "advanced", growth: "25%", confidence: "high", requirement: "required", isCompanySkill: true },
    { title: "System Architecture", subcategory: "Software Architecture", level: "intermediate", growth: "30%", confidence: "medium", requirement: "required", isCompanySkill: true },
    { title: "Kubernetes", subcategory: "Container Orchestration", level: "advanced", growth: "28%", confidence: "high", requirement: "required", isCompanySkill: false },
    { title: "Problem Solving", subcategory: "Soft Skills", level: "advanced", growth: "15%", confidence: "high", requirement: "required", isCompanySkill: true },
    { title: "Code Review", subcategory: "Development Practices", level: "advanced", growth: "12%", confidence: "high", requirement: "required", isCompanySkill: true },
    { title: "Agile Methodologies", subcategory: "Project Management", level: "advanced", growth: "15%", confidence: "high", requirement: "required", isCompanySkill: true }
  ],
  "123": [ // AI Engineer
    { title: "Machine Learning", subcategory: "Artificial Intelligence", level: "advanced", growth: "30%", confidence: "high", requirement: "required", isCompanySkill: true },
    { title: "Deep Learning", subcategory: "Artificial Intelligence", level: "advanced", growth: "25%", confidence: "high", requirement: "required", isCompanySkill: true },
    { title: "TensorFlow", subcategory: "Machine Learning Frameworks", level: "advanced", growth: "20%", confidence: "high", requirement: "required", isCompanySkill: true },
    { title: "PyTorch", subcategory: "Machine Learning Frameworks", level: "advanced", growth: "24%", confidence: "high", requirement: "required", isCompanySkill: true },
    { title: "Computer Vision", subcategory: "AI Applications", level: "advanced", growth: "22%", confidence: "high", requirement: "required", isCompanySkill: true },
    { title: "Natural Language Processing", subcategory: "AI Applications", level: "advanced", growth: "28%", confidence: "high", requirement: "required", isCompanySkill: true }
  ],
  "125": [ // Frontend Engineer
    { title: "React", subcategory: "Frontend Frameworks", level: "advanced", growth: "20%", confidence: "high", requirement: "required", isCompanySkill: true },
    { title: "TypeScript", subcategory: "Programming Languages", level: "advanced", growth: "25%", confidence: "high", requirement: "required", isCompanySkill: true },
    { title: "UI/UX Design", subcategory: "Design", level: "intermediate", growth: "30%", confidence: "medium", requirement: "required", isCompanySkill: true },
    { title: "CSS/SASS", subcategory: "Styling", level: "advanced", growth: "15%", confidence: "high", requirement: "required", isCompanySkill: true },
    { title: "Next.js", subcategory: "Frontend Frameworks", level: "advanced", growth: "28%", confidence: "high", requirement: "required", isCompanySkill: true }
  ],
  "126": [ // Engineering Manager
    { title: "Team Leadership", subcategory: "Leadership", level: "advanced", growth: "22%", confidence: "high", requirement: "required", isCompanySkill: true },
    { title: "Project Management", subcategory: "Management", level: "advanced", growth: "25%", confidence: "high", requirement: "required", isCompanySkill: true },
    { title: "Strategic Planning", subcategory: "Management", level: "advanced", growth: "30%", confidence: "high", requirement: "required", isCompanySkill: true },
    { title: "Risk Management", subcategory: "Management", level: "advanced", growth: "20%", confidence: "high", requirement: "required", isCompanySkill: true },
    { title: "Stakeholder Management", subcategory: "Leadership", level: "advanced", growth: "22%", confidence: "high", requirement: "required", isCompanySkill: true }
  ]
};

export const getEmployeeSkills = (employeeId: string) => {
  return initialSkills[employeeId as keyof typeof initialSkills] || [];
};