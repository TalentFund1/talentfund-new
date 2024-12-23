import { RoleSkillData } from '../types/SkillTypes';
import { loadRoleSkills, saveRoleSkills, initializeRoleSkills } from './roles/roleStorage';
import { getUnifiedSkillData } from './skillDatabaseService';
import { getCategorizedSkills } from '../utils/skillCategorization';

// Initialize roleSkills object
export const roleSkills: { [key: string]: RoleSkillData } = {};

// Initialize all roles
const roleIds = ["123", "124", "125", "126", "127", "128"];

// Default skills for each role
const defaultRoleSkills: { [key: string]: string[] } = {
  "123": ["Machine Learning", "Deep Learning", "Python", "TensorFlow"], // AI Engineer
  "124": ["Node.js", "API Development", "Database Design", "System Architecture"], // Backend Engineer
  "125": ["React", "TypeScript", "HTML/CSS", "JavaScript"], // Frontend Engineer
  "126": ["Team Leadership", "Project Management", "Technical Architecture", "Agile Methodologies"], // Engineering Manager
  "127": ["DevOps", "Kubernetes", "Docker", "CI/CD"], // DevOps Engineer
  "128": ["Product Strategy", "User Research", "Agile", "Roadmap Planning"] // Product Manager
};

roleIds.forEach(id => {
  const savedSkills = loadRoleSkills(id);
  if (savedSkills) {
    // Ensure categorized arrays exist
    const categorized = getCategorizedSkills(savedSkills);
    roleSkills[id] = {
      ...savedSkills,
      specialized: categorized.specialized,
      common: categorized.common,
      certifications: categorized.certifications
    };
  } else {
    // Initialize with default skills
    const defaultSkills = defaultRoleSkills[id]?.map(title => getUnifiedSkillData(title)) || [];
    const initialState = initializeRoleSkills(id);
    const categorized = getCategorizedSkills({ ...initialState, skills: defaultSkills });
    
    roleSkills[id] = {
      ...initialState,
      skills: defaultSkills,
      specialized: categorized.specialized,
      common: categorized.common,
      certifications: categorized.certifications
    };
    saveRoleSkills(id, roleSkills[id]);
  }
  
  console.log(`Initialized role ${id}:`, {
    title: roleSkills[id].title,
    skillsCount: roleSkills[id].skills.length,
    specialized: roleSkills[id].specialized.length,
    common: roleSkills[id].common.length,
    certifications: roleSkills[id].certifications.length,
    skills: roleSkills[id].skills.map(s => s.title)
  });
});

// Export helper functions
export { saveRoleSkills, loadRoleSkills, getCategorizedSkills };

// Helper function to get category for a skill using universal database
export const getRoleSkillCategory = (skillTitle: string): string => {
  const skillData = getUnifiedSkillData(skillTitle);
  return skillData.category;
};