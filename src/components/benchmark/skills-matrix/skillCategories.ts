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
      "Architecture",
      "Cloud Services",
      "DevOps",
      "System Design",
      "Data Engineering",
      "API Development",
      "Database Design"
    ],
    common: [
      "General",
      "Soft Skills",
      "Communication",
      "Development Practices",
      "Project Management",
      "Frontend Development",
      "Web Development",
      "Development Tools",
      "Leadership",
      "Management",
      "Problem Solving",
      "Team Collaboration",
      "Code Review",
      "Testing",
      "Documentation"
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
      "IT Service Management",
      "Professional Certifications"
    ]
  };

  // First try to match by subcategory
  const matchBySubcategory = skills.filter(skill => {
    const subcategory = skill.subcategory;
    return categoryMappings[category as keyof typeof categoryMappings]?.includes(subcategory);
  });

  // If no matches by subcategory, try to match by title patterns
  if (matchBySubcategory.length === 0) {
    return skills.filter(skill => {
      const title = skill.title.toLowerCase();
      
      switch (category) {
        case "specialized":
          return title.includes('machine learning') ||
                 title.includes('deep learning') ||
                 title.includes('tensorflow') ||
                 title.includes('pytorch') ||
                 title.includes('aws') ||
                 title.includes('cloud') ||
                 title.includes('docker') ||
                 title.includes('kubernetes') ||
                 title.includes('architecture') ||
                 title.includes('devops');
        case "common":
          return title.includes('communication') ||
                 title.includes('problem solving') ||
                 title.includes('teamwork') ||
                 title.includes('leadership') ||
                 title.includes('management') ||
                 !title.includes('certification');
        case "certification":
          return title.includes('certification') ||
                 title.includes('certified') ||
                 title.includes('certificate');
        default:
          return false;
      }
    });
  }

  return matchBySubcategory;
};

export const getCategoryCount = (skills: any[], category: string) => {
  return filterSkillsByCategory(skills, category).length;
};

export const categorizeSkill = (skillName: string): string => {
  const lowerSkill = skillName.toLowerCase();
  
  if (lowerSkill.includes('certification') || 
      lowerSkill.includes('certified') || 
      lowerSkill.includes('certificate')) {
    return 'certification';
  }
  
  const specializedPatterns = [
    'machine learning',
    'deep learning',
    'tensorflow',
    'pytorch',
    'aws',
    'cloud',
    'docker',
    'kubernetes',
    'architecture',
    'devops'
  ];
  
  if (specializedPatterns.some(pattern => lowerSkill.includes(pattern))) {
    return 'specialized';
  }
  
  return 'common';
};