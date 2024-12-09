export const filterSkillsByCategory = (skills: any[], category: string) => {
  if (category === "all") {
    return skills;
  }

  // Define category mappings based on subcategories
  const categoryMappings = {
    specialized: [
      "AI & ML",
      "ML Frameworks",
      "AI Applications",
      "Backend Development",
      "Data Management",
      "Software Architecture",
      "Container Orchestration",
      "Frontend Frameworks",
      "Programming Languages",
      "State Management",
      "Build Tools",
      "Design",
      "Architecture"
    ],
    common: [
      "Soft Skills",
      "Communication",  // Explicitly add Communication here
      "Development Practices",
      "Project Management",
      "Frontend Development",
      "Web Development",
      "Development Tools",
      "Leadership",
      "Management",
      "Technical Writing",  // Add Technical Writing as common
      "System Administration"
    ],
    certification: [
      "Cloud Certification",
      "AI Certification",
      "Container Certification",
      "Database Certification",
      "Web Development Certification",
      "Development Certification",
      "Frontend Certification",
      "Programming Certification",
      "Web Accessibility",
      "Management Certification",
      "Agile Certification",
      "IT Service Management"
    ]
  };

  return skills.filter(skill => {
    const subcategory = skill.subcategory;
    switch (category) {
      case "specialized":
        return categoryMappings.specialized.includes(subcategory);
      case "common":
        return categoryMappings.common.includes(subcategory);
      case "certification":
        return categoryMappings.certification.includes(subcategory);
      default:
        return false;
    }
  });
};

export const getCategoryCount = (skills: any[], category: string) => {
  return filterSkillsByCategory(skills, category).length;
};

export const categorizeSkill = (skillName: string): string => {
  // This function can be used for individual skill categorization if needed
  const commonSkills = [
    "Communication",
    "Technical Writing",
    "Problem Solving",
    "Team Leadership",
    "Project Management"
  ];
  
  if (commonSkills.includes(skillName)) {
    return 'common';
  }
  return 'specialized'; // Default fallback
};