export const filterSkillsByCategory = (skills: any[], category: string) => {
  if (category === "all") {
    return skills;
  }

  // Define category types
  const categoryTypes = {
    specialized: [
      "Frontend Frameworks",
      "Programming Languages",
      "State Management",
      "API Integration",
      "Build Tools",
      "Design"
    ],
    common: [
      "Frontend Development",
      "Web Development",
      "Soft Skills",
      "Development Tools",
      "Development Practices",
      "Project Management",
      "Communication"
    ],
    certification: [
      "Cloud Certification",
      "Web Development Certification",
      "Development Certification",
      "Frontend Certification",
      "Programming Certification",
      "Web Accessibility"
    ]
  };

  return skills.filter(skill => {
    const subcategory = skill.subcategory;
    switch (category) {
      case "specialized":
        return categoryTypes.specialized.includes(subcategory);
      case "common":
        return categoryTypes.common.includes(subcategory);
      case "certification":
        return categoryTypes.certification.includes(subcategory);
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
  return 'common'; // Default fallback
};