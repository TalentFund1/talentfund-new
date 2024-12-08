export const initialSkills = {
  "124": [
    // Specialized Skills
    { title: "Node.js", subcategory: "Backend Development", level: "unspecified", growth: "25%", confidence: "high", requirement: "preferred", isCompanySkill: true },
    { title: "Database Design", subcategory: "Data Management", level: "unspecified", growth: "15%", confidence: "high", requirement: "preferred", isCompanySkill: true },
    { title: "API Development", subcategory: "Backend Development", level: "unspecified", growth: "25%", confidence: "high", requirement: "preferred", isCompanySkill: true }
  ],
  "123": [
    // AI Engineer Skills
    { title: "Machine Learning", subcategory: "AI & ML", level: "advanced", growth: "30%", confidence: "high", requirement: "required", isCompanySkill: true },
    { title: "Deep Learning", subcategory: "AI & ML", level: "advanced", growth: "28%", confidence: "high", requirement: "required", isCompanySkill: true },
    { title: "Natural Language Processing", subcategory: "AI Applications", level: "beginner", growth: "28%", confidence: "high", requirement: "unknown", isCompanySkill: true },
    { title: "TensorFlow", subcategory: "ML Frameworks", level: "beginner", growth: "20%", confidence: "high", requirement: "skill_goal", isCompanySkill: true }
  ],
  "125": [
    // Frontend Skills
    { title: "React", subcategory: "Frontend Frameworks", level: "unspecified", growth: "20%", confidence: "high", requirement: "preferred", isCompanySkill: true },
    { title: "TypeScript", subcategory: "Programming Languages", level: "unspecified", growth: "25%", confidence: "high", requirement: "preferred", isCompanySkill: true }
  ],
  "126": [
    // Management Skills
    { title: "Team Leadership", subcategory: "Leadership", level: "unspecified", growth: "22%", confidence: "high", requirement: "preferred", isCompanySkill: true },
    { title: "Project Management", subcategory: "Management", level: "unspecified", growth: "25%", confidence: "high", requirement: "preferred", isCompanySkill: true }
  ]
};

export const getEmployeeSkills = (id: string) => {
  console.log('Getting skills for employee:', id);
  const skills = initialSkills[id as keyof typeof initialSkills] || [];
  console.log('Found employee skills:', skills);
  return skills;
};