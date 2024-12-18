export type SkillCategory = 'specialized' | 'common' | 'certification';

export const skillCategoryClassifications: { [key: string]: SkillCategory } = {
  // AI & ML Skills
  "Machine Learning": "specialized",
  "Deep Learning": "specialized",
  "Natural Language Processing": "specialized",
  "Computer Vision": "specialized",
  "TensorFlow": "specialized",
  
  // Backend Skills
  "Node.js": "specialized",
  "Database Design": "specialized",
  "API Development": "specialized",
  "System Architecture": "specialized",
  "Kubernetes": "specialized",
  
  // Frontend Skills
  "React": "specialized",
  "TypeScript": "specialized",
  "Next.js": "specialized",
  "CSS/SASS": "specialized",
  "Performance Optimization": "specialized",
  
  // Common Skills
  "Problem Solving": "common",
  "Code Review": "common",
  "Agile Methodologies": "common",
  "Communication": "common",
  "Team Leadership": "common",
  "Git Version Control": "common",
  "Technical Writing": "common",
  
  // Certifications
  "AWS Certified Solutions Architect": "certification",
  "Kubernetes Administrator (CKA)": "certification",
  "AWS Certified Machine Learning - Specialty": "certification",
  "TensorFlow Developer Certificate": "certification",
  "Project Management Professional (PMP)": "certification",
  "Certified Scrum Master (CSM)": "certification"
};

export const getSkillCategory = (skillTitle: string): SkillCategory => {
  console.log('Getting category for skill:', skillTitle);
  return skillCategoryClassifications[skillTitle] || "common";
};