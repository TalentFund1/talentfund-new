import { getUnifiedSkillData } from './skillDatabaseService';
import { RoleSkillData } from '../types/SkillTypes';
import { Skills, getAllSkills } from './skills/allSkills';

// Get all skills from the universal database
const allSkills = getAllSkills();
console.log('Loaded all skills from universal database:', allSkills.length);

// Helper function to get and validate a skill from the universal database
const getValidatedSkill = (title: string) => {
  const skill = getUnifiedSkillData(title);
  if (!skill) {
    console.error(`Skill not found in universal database: ${title}`);
    throw new Error(`Skill not found: ${title}`);
  }
  console.log(`Found skill ${title} with category:`, skill.category);
  return skill;
};

// Helper function to get skills by category from the universal database
const getSkillsByCategory = (titles: string[], category: 'specialized' | 'common' | 'certification') => {
  console.log(`Getting ${category} skills for titles:`, titles);
  
  const skills = titles.map(title => {
    const skill = getValidatedSkill(title);
    if (skill.category !== category) {
      console.error(`Skill ${title} has category ${skill.category} but was requested as ${category}`);
      throw new Error(`Category mismatch for skill ${title}`);
    }
    return skill;
  });

  console.log(`Found ${skills.length} ${category} skills`);
  return skills;
};

// Define role skills using categories from the universal database
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
    ], 'specialized'),
    common: getSkillsByCategory([
      "Python",
      "Problem Solving",
      "Technical Writing",
      "Git Version Control",
      "Communication"
    ], 'common'),
    certifications: getSkillsByCategory([
      "AWS Certified Machine Learning - Specialty",
      "TensorFlow Developer Certificate"
    ], 'certification')
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
    ], 'specialized'),
    common: getSkillsByCategory([
      "Problem Solving",
      "Code Review",
      "Agile Methodologies",
      "Git Version Control",
      "Communication"
    ], 'common'),
    certifications: getSkillsByCategory([
      "AWS Certified Solutions Architect",
      "Kubernetes Administrator (CKA)"
    ], 'certification')
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
    ], 'specialized'),
    common: getSkillsByCategory([
      "Problem Solving",
      "Code Review",
      "Agile Methodologies",
      "Git Version Control",
      "Communication"
    ], 'common'),
    certifications: getSkillsByCategory([
      "AWS Certified Developer - Associate",
      "Google Mobile Web Specialist"
    ], 'certification')
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
    ], 'specialized'),
    common: getSkillsByCategory([
      "Strategic Planning",
      "Stakeholder Management",
      "Agile Methodologies",
      "Git Version Control",
      "Communication"
    ], 'common'),
    certifications: getSkillsByCategory([
      "Project Management Professional (PMP)",
      "Certified Scrum Master (CSM)"
    ], 'certification')
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
    ], 'specialized'),
    common: getSkillsByCategory([
      "Linux Administration",
      "Shell Scripting",
      "Git Version Control",
      "Problem Solving",
      "Communication"
    ], 'common'),
    certifications: getSkillsByCategory([
      "AWS Certified DevOps Engineer",
      "Certified Kubernetes Administrator",
      "HashiCorp Certified Terraform Associate"
    ], 'certification')
  }
};

// Log role skills configuration for verification
console.log('Role skills loaded:', Object.keys(roleSkills).map(key => ({
  role: roleSkills[key].title,
  specialized: roleSkills[key].specialized.length,
  common: roleSkills[key].common.length,
  certifications: roleSkills[key].certifications.length,
  categories: {
    specialized: roleSkills[key].specialized.map(s => s.title),
    common: roleSkills[key].common.map(s => s.title),
    certifications: roleSkills[key].certifications.map(s => s.title)
  }
})));