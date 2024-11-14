// Individual employee skills data
export const initialSkills = {
  "124": [
    { title: "Node.js", subcategory: "Backend Frameworks", level: "advanced", growth: "25%", confidence: "high", requirement: "required", isCompanySkill: true },
    { title: "Python", subcategory: "Programming Languages", level: "advanced", growth: "20%", confidence: "high", requirement: "required", isCompanySkill: true },
    { title: "Database Design", subcategory: "Database", level: "advanced", growth: "15%", confidence: "high", requirement: "required", isCompanySkill: true }
  ],
  "123": [
    { title: "Machine Learning", subcategory: "AI/ML", level: "advanced", growth: "30%", confidence: "high", requirement: "required", isCompanySkill: true },
    { title: "Deep Learning", subcategory: "AI/ML", level: "advanced", growth: "28%", confidence: "high", requirement: "required", isCompanySkill: true },
    { title: "Python", subcategory: "Programming Languages", level: "advanced", growth: "25%", confidence: "high", requirement: "required", isCompanySkill: true }
  ],
  "125": [
    // Specialized Skills
    { title: "React", subcategory: "Frontend Frameworks", level: "advanced", growth: "20%", confidence: "high", requirement: "required", isCompanySkill: true },
    { title: "TypeScript", subcategory: "Programming Languages", level: "advanced", growth: "25%", confidence: "high", requirement: "required", isCompanySkill: true },
    { title: "UI/UX Design", subcategory: "Design", level: "intermediate", growth: "30%", confidence: "medium", requirement: "required", isCompanySkill: true },
    { title: "CSS/SASS", subcategory: "Styling", level: "advanced", growth: "15%", confidence: "high", requirement: "required", isCompanySkill: true },
    { title: "Next.js", subcategory: "Frontend Frameworks", level: "advanced", growth: "28%", confidence: "high", requirement: "required", isCompanySkill: true },
    { title: "Vue.js", subcategory: "Frontend Frameworks", level: "intermediate", growth: "22%", confidence: "medium", requirement: "preferred", isCompanySkill: true },
    { title: "Angular", subcategory: "Frontend Frameworks", level: "beginner", growth: "18%", confidence: "low", requirement: "preferred", isCompanySkill: true },
    { title: "Redux", subcategory: "State Management", level: "advanced", growth: "24%", confidence: "high", requirement: "required", isCompanySkill: true },
    { title: "GraphQL", subcategory: "API Integration", level: "intermediate", growth: "26%", confidence: "medium", requirement: "preferred", isCompanySkill: true },
    { title: "Webpack", subcategory: "Build Tools", level: "advanced", growth: "16%", confidence: "high", requirement: "required", isCompanySkill: true },

    // Common Skills
    { title: "Cross-browser Compatibility", subcategory: "Frontend Development", level: "advanced", growth: "12%", confidence: "high", requirement: "required", isCompanySkill: true },
    { title: "Responsive Design", subcategory: "Web Development", level: "advanced", growth: "18%", confidence: "high", requirement: "required", isCompanySkill: true },
    { title: "Problem Solving", subcategory: "Soft Skills", level: "advanced", growth: "15%", confidence: "high", requirement: "required", isCompanySkill: true },
    { title: "Git Version Control", subcategory: "Development Tools", level: "advanced", growth: "14%", confidence: "high", requirement: "required", isCompanySkill: true },
    { title: "Code Review", subcategory: "Development Practices", level: "advanced", growth: "16%", confidence: "high", requirement: "required", isCompanySkill: true },
    { title: "Agile Methodologies", subcategory: "Project Management", level: "intermediate", growth: "20%", confidence: "medium", requirement: "preferred", isCompanySkill: true },
    { title: "Technical Documentation", subcategory: "Communication", level: "intermediate", growth: "17%", confidence: "medium", requirement: "preferred", isCompanySkill: true },
    { title: "Performance Optimization", subcategory: "Web Development", level: "advanced", growth: "22%", confidence: "high", requirement: "required", isCompanySkill: true },

    // Certifications
    { title: "AWS Certified Developer - Associate", subcategory: "Cloud Certification", level: "intermediate", growth: "25%", confidence: "medium", requirement: "preferred", isCompanySkill: true },
    { title: "Google Mobile Web Specialist", subcategory: "Web Development Certification", level: "advanced", growth: "20%", confidence: "high", requirement: "required", isCompanySkill: true },
    { title: "Professional Scrum Developer", subcategory: "Development Certification", level: "intermediate", growth: "15%", confidence: "medium", requirement: "preferred", isCompanySkill: true },
    { title: "Meta Frontend Developer", subcategory: "Frontend Certification", level: "advanced", growth: "23%", confidence: "high", requirement: "preferred", isCompanySkill: true },
    { title: "JavaScript Algorithms and Data Structures", subcategory: "Programming Certification", level: "advanced", growth: "19%", confidence: "high", requirement: "preferred", isCompanySkill: true },
    { title: "Accessibility Certification (IAAP)", subcategory: "Web Accessibility", level: "intermediate", growth: "21%", confidence: "medium", requirement: "preferred", isCompanySkill: true }
  ],
  "126": [
    { title: "Team Leadership", subcategory: "Management", level: "advanced", growth: "20%", confidence: "high", requirement: "required", isCompanySkill: true },
    { title: "Project Management", subcategory: "Management", level: "advanced", growth: "25%", confidence: "high", requirement: "required", isCompanySkill: true },
    { title: "Strategic Planning", subcategory: "Management", level: "advanced", growth: "22%", confidence: "high", requirement: "required", isCompanySkill: true }
  ]
};

export const getEmployeeSkills = (employeeId: string) => {
  return initialSkills[employeeId as keyof typeof initialSkills] || [];
};