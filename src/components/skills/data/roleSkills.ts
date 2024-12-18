import { getUnifiedSkillData } from './skillDatabaseService';
import { RoleSkillData } from '../types/SkillTypes';

// Helper function to get skills based on their category from the unified database
const getSkillsByCategory = (titles: string[]) => {
  console.log('Getting skills for titles:', titles);
  return titles.map(title => getUnifiedSkillData(title));
};

export const roleSkills: { [key: string]: RoleSkillData } = {
  "123": {
    title: "AI Engineer",
    soc: "15-2051",
    specialized: getSkillsByCategory([
      "Machine Learning",
      "Deep Learning",
      "Natural Language Processing",
      "Computer Vision",
      "TensorFlow",
      "GraphQL"
    ]),
    common: getSkillsByCategory([
      "Python",
      "Problem Solving",
      "Technical Writing",
      "Git Version Control",
      "Communication"
    ]),
    certifications: getSkillsByCategory([
      "AWS Certified Machine Learning - Specialty",
      "TensorFlow Developer Certificate"
    ])
  },
  "124": {
    title: "Backend Engineer",
    soc: "15-1252",
    specialized: getSkillsByCategory([
      "Node.js",
      "Database Design",
      "API Development",
      "System Architecture",
      "Kubernetes",
      "GraphQL"
    ]),
    common: getSkillsByCategory([
      "Problem Solving",
      "Code Review",
      "Agile Methodologies",
      "Git Version Control",
      "Communication"
    ]),
    certifications: getSkillsByCategory([
      "AWS Certified Solutions Architect",
      "Kubernetes Administrator (CKA)"
    ])
  },
  "125": {
    title: "Frontend Engineer",
    soc: "15-1252",
    specialized: getSkillsByCategory([
      "React",
      "TypeScript",
      "Next.js",
      "CSS/SASS",
      "Performance Optimization",
      "React Native",
      "Flutter",
      "GraphQL"
    ]),
    common: getSkillsByCategory([
      "Problem Solving",
      "Code Review",
      "Agile Methodologies",
      "Git Version Control",
      "Communication"
    ]),
    certifications: getSkillsByCategory([
      "AWS Certified Developer - Associate",
      "Google Mobile Web Specialist"
    ])
  },
  "126": {
    title: "Engineering Manager",
    soc: "11-9041",
    specialized: getSkillsByCategory([
      "System Design",
      "Technical Architecture",
      "Risk Management",
      "Team Leadership",
      "Project Management"
    ]),
    common: getSkillsByCategory([
      "Strategic Planning",
      "Stakeholder Management",
      "Agile Methodologies",
      "Git Version Control",
      "Communication"
    ]),
    certifications: getSkillsByCategory([
      "Project Management Professional (PMP)",
      "Certified Scrum Master (CSM)"
    ])
  },
  "127": {
    title: "DevOps Engineer",
    soc: "15-1244",
    specialized: getSkillsByCategory([
      "Docker",
      "Kubernetes",
      "Jenkins",
      "Terraform",
      "AWS"
    ]),
    common: getSkillsByCategory([
      "Linux Administration",
      "Shell Scripting",
      "Git Version Control",
      "Problem Solving",
      "Communication"
    ]),
    certifications: getSkillsByCategory([
      "AWS Certified DevOps Engineer",
      "Certified Kubernetes Administrator",
      "HashiCorp Certified Terraform Associate"
    ])
  }
};

console.log('Role skills loaded:', Object.keys(roleSkills).map(key => ({
  role: roleSkills[key].title,
  specialized: roleSkills[key].specialized.length,
  common: roleSkills[key].common.length,
  certifications: roleSkills[key].certifications.length
})));