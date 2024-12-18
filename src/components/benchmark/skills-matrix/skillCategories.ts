import { roleSkills } from '../../skills/data/roleSkills';

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
      "Artificial Intelligence and Machine Learning",
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
      "Communication",
      "Development Practices",
      "Project Management",
      "Frontend Development",
      "Web Development",
      "Development Tools",
      "Leadership",
      "Management",
      "Version Control",
      "Problem Solving"
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
    
    // First check if the skill exists in roleSkills categories
    const currentRoleSkills = roleSkills["123"]; // Using AI Engineer as default reference
    if (category === "specialized" && currentRoleSkills.specialized.some(s => s.title === skill.title)) {
      return true;
    }
    if (category === "common" && currentRoleSkills.common.some(s => s.title === skill.title)) {
      return true;
    }
    if (category === "certification" && currentRoleSkills.certifications.some(s => s.title === skill.title)) {
      return true;
    }

    // Fallback to subcategory mapping
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
  // First check roleSkills categories
  const currentRoleSkills = roleSkills["123"]; // Using AI Engineer as default reference
  
  if (currentRoleSkills.specialized.some(s => s.title === skillName)) {
    console.log(`${skillName} categorized as specialized based on roleSkills`);
    return 'specialized';
  }
  if (currentRoleSkills.common.some(s => s.title === skillName)) {
    console.log(`${skillName} categorized as common based on roleSkills`);
    return 'common';
  }
  if (currentRoleSkills.certifications.some(s => s.title === skillName)) {
    console.log(`${skillName} categorized as certification based on roleSkills`);
    return 'certification';
  }
  
  // Fallback to name-based categorization
  const lowerName = skillName.toLowerCase();
  
  if (lowerName.includes('certification') || 
      lowerName.includes('certified') ||
      lowerName.includes('certificate')) {
    console.log(`${skillName} categorized as certification based on name`);
    return 'certification';
  }
  
  if (lowerName.includes('machine learning') ||
      lowerName.includes('artificial intelligence') ||
      lowerName.includes('deep learning') ||
      lowerName.includes('neural') ||
      lowerName.includes('nlp') ||
      lowerName.includes('computer vision')) {
    console.log(`${skillName} categorized as specialized based on AI/ML keywords`);
    return 'specialized';
  }
  
  console.log(`${skillName} defaulting to common category`);
  return 'common';
};