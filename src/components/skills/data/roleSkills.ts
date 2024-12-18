import { getUnifiedSkillData } from './skillDatabaseService';
import { RoleSkillData } from '../types/SkillTypes';
import { Skills, getAllSkills } from './skills/allSkills';

// Helper function to get skills and categorize them based on their category from allSkills
const getSkillsByCategory = (titles: string[]) => {
  console.log('Getting skills for titles:', titles);
  const skills = titles.map(title => {
    const skill = getUnifiedSkillData(title);
    console.log(`Categorized skill ${title}:`, skill.category);
    return skill;
  });
  return skills;
};

// Helper function to filter skills by category from allSkills database
const filterSkillsByCategory = (skills: ReturnType<typeof getSkillsByCategory>, category: 'specialized' | 'common' | 'certification') => {
  console.log(`Filtering skills for category ${category}`);
  const filtered = skills.filter(skill => skill.category === category);
  console.log(`Found ${filtered.length} skills for category ${category}`);
  return filtered;
};

// Get all skills first
const allSkills = getAllSkills();
console.log('Loaded all skills from universal database:', allSkills.length);

export const roleSkills: { [key: string]: RoleSkillData } = {
  "123": {
    title: "AI Engineer",
    soc: "15-2051",
    specialized: filterSkillsByCategory(getSkillsByCategory([
      "Machine Learning",
      "Deep Learning",
      "Natural Language Processing",
      "Computer Vision",
      "TensorFlow",
      "GraphQL"
    ]), 'specialized'),
    common: filterSkillsByCategory(getSkillsByCategory([
      "Python",
      "Problem Solving",
      "Technical Writing",
      "Git Version Control",
      "Communication"
    ]), 'common'),
    certifications: filterSkillsByCategory(getSkillsByCategory([
      "AWS Certified Machine Learning - Specialty",
      "TensorFlow Developer Certificate"
    ]), 'certification')
  },
  "124": {
    title: "Backend Engineer",
    soc: "15-1252",
    specialized: filterSkillsByCategory(getSkillsByCategory([
      "Node.js",
      "Database Design",
      "API Development",
      "System Architecture",
      "Kubernetes",
      "GraphQL"
    ]), 'specialized'),
    common: filterSkillsByCategory(getSkillsByCategory([
      "Problem Solving",
      "Code Review",
      "Agile Methodologies",
      "Git Version Control",
      "Communication"
    ]), 'common'),
    certifications: filterSkillsByCategory(getSkillsByCategory([
      "AWS Certified Solutions Architect",
      "Kubernetes Administrator (CKA)"
    ]), 'certification')
  },
  "125": {
    title: "Frontend Engineer",
    soc: "15-1252",
    specialized: filterSkillsByCategory(getSkillsByCategory([
      "React",
      "TypeScript",
      "Next.js",
      "CSS/SASS",
      "Performance Optimization",
      "React Native",
      "Flutter",
      "GraphQL"
    ]), 'specialized'),
    common: filterSkillsByCategory(getSkillsByCategory([
      "Problem Solving",
      "Code Review",
      "Agile Methodologies",
      "Git Version Control",
      "Communication"
    ]), 'common'),
    certifications: filterSkillsByCategory(getSkillsByCategory([
      "AWS Certified Developer - Associate",
      "Google Mobile Web Specialist"
    ]), 'certification')
  },
  "126": {
    title: "Engineering Manager",
    soc: "11-9041",
    specialized: filterSkillsByCategory(getSkillsByCategory([
      "System Design",
      "Technical Architecture",
      "Risk Management",
      "Team Leadership",
      "Project Management"
    ]), 'specialized'),
    common: filterSkillsByCategory(getSkillsByCategory([
      "Strategic Planning",
      "Stakeholder Management",
      "Agile Methodologies",
      "Git Version Control",
      "Communication"
    ]), 'common'),
    certifications: filterSkillsByCategory(getSkillsByCategory([
      "Project Management Professional (PMP)",
      "Certified Scrum Master (CSM)"
    ]), 'certification')
  },
  "127": {
    title: "DevOps Engineer",
    soc: "15-1244",
    specialized: filterSkillsByCategory(getSkillsByCategory([
      "Docker",
      "Kubernetes",
      "Jenkins",
      "Terraform",
      "AWS"
    ]), 'specialized'),
    common: filterSkillsByCategory(getSkillsByCategory([
      "Linux Administration",
      "Shell Scripting",
      "Git Version Control",
      "Problem Solving",
      "Communication"
    ]), 'common'),
    certifications: filterSkillsByCategory(getSkillsByCategory([
      "AWS Certified DevOps Engineer",
      "Certified Kubernetes Administrator",
      "HashiCorp Certified Terraform Associate"
    ]), 'certification')
  }
};

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