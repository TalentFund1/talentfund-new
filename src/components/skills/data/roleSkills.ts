import { getUnifiedSkillData } from './skillDatabaseService';
import { RoleSkillData } from '../types/SkillTypes';
import { Skills, getAllSkills } from './skills/allSkills';

// Get all skills from the universal database
const allSkills = getAllSkills();
console.log('Loaded all skills from universal database:', allSkills.length);

// Helper function to get and validate skills from the universal database
const getSkillsByTitles = (titles: string[]) => {
  console.log('Getting skills for titles:', titles);
  return titles.map(title => {
    const skill = getUnifiedSkillData(title);
    if (!skill) {
      console.error(`Skill not found in universal database: ${title}`);
      throw new Error(`Skill not found: ${title}`);
    }
    console.log(`Found skill ${title} with category:`, skill.category);
    return skill;
  });
};

// Helper function to filter skills by their category from the universal database
const filterSkillsByCategory = (titles: string[], category: 'specialized' | 'common' | 'certification') => {
  console.log(`Filtering skills for category ${category}`);
  const skills = getSkillsByTitles(titles);
  const filtered = skills.filter(skill => skill.category === category);
  console.log(`Found ${filtered.length} ${category} skills from ${titles.length} total skills`);
  return filtered;
};

// Define role skills using categories from the universal database
export const roleSkills: { [key: string]: RoleSkillData } = {
  "123": {
    title: "AI Engineer",
    soc: "15-2051",
    specialized: filterSkillsByCategory([
      "Machine Learning",
      "Deep Learning",
      "Natural Language Processing",
      "Computer Vision",
      "TensorFlow",
      "GraphQL"
    ], 'specialized'),
    common: filterSkillsByCategory([
      "Python",
      "Problem Solving",
      "Technical Writing",
      "Git Version Control",
      "Communication"
    ], 'common'),
    certifications: filterSkillsByCategory([
      "AWS Certified Machine Learning - Specialty",
      "TensorFlow Developer Certificate"
    ], 'certification')
  },
  "124": {
    title: "Backend Engineer",
    soc: "15-1252",
    specialized: filterSkillsByCategory([
      "Node.js",
      "Database Design",
      "API Development",
      "System Architecture",
      "Kubernetes",
      "GraphQL"
    ], 'specialized'),
    common: filterSkillsByCategory([
      "Problem Solving",
      "Code Review",
      "Agile Methodologies",
      "Git Version Control",
      "Communication"
    ], 'common'),
    certifications: filterSkillsByCategory([
      "AWS Certified Solutions Architect",
      "Kubernetes Administrator (CKA)"
    ], 'certification')
  },
  "125": {
    title: "Frontend Engineer",
    soc: "15-1252",
    specialized: filterSkillsByCategory([
      "React",
      "TypeScript",
      "Next.js",
      "CSS/SASS",
      "Performance Optimization",
      "React Native",
      "Flutter",
      "GraphQL"
    ], 'specialized'),
    common: filterSkillsByCategory([
      "Problem Solving",
      "Code Review",
      "Agile Methodologies",
      "Git Version Control",
      "Communication"
    ], 'common'),
    certifications: filterSkillsByCategory([
      "AWS Certified Developer - Associate",
      "Google Mobile Web Specialist"
    ], 'certification')
  },
  "126": {
    title: "Engineering Manager",
    soc: "11-9041",
    specialized: filterSkillsByCategory([
      "System Design",
      "Technical Architecture",
      "Risk Management",
      "Team Leadership",
      "Project Management"
    ], 'specialized'),
    common: filterSkillsByCategory([
      "Strategic Planning",
      "Stakeholder Management",
      "Agile Methodologies",
      "Git Version Control",
      "Communication"
    ], 'common'),
    certifications: filterSkillsByCategory([
      "Project Management Professional (PMP)",
      "Certified Scrum Master (CSM)"
    ], 'certification')
  },
  "127": {
    title: "DevOps Engineer",
    soc: "15-1244",
    specialized: filterSkillsByCategory([
      "Docker",
      "Kubernetes",
      "Jenkins",
      "Terraform",
      "AWS"
    ], 'specialized'),
    common: filterSkillsByCategory([
      "Linux Administration",
      "Shell Scripting",
      "Git Version Control",
      "Problem Solving",
      "Communication"
    ], 'common'),
    certifications: filterSkillsByCategory([
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
