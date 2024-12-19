import { RoleSkillData, UnifiedSkill } from '../types/SkillTypes';
import { getAllSkills } from './skills/allSkills';
import { getSkillCategory } from './skills/categories/skillCategories';

// Helper function to get skills for a role
const getRoleSkills = (roleId: string): RoleSkillData => {
  console.log('Getting skills for role:', roleId);
  
  // Return empty role data structure
  return {
    title: getRoleTitle(roleId),
    soc: getRoleSoc(roleId),
    specialized: [],
    common: [],
    certifications: [],
    skills: []
  };
};

const getRoleTitle = (id: string): string => {
  const roleTitles: { [key: string]: string } = {
    "123": "AI Engineer",
    "124": "Backend Engineer",
    "125": "Frontend Engineer",
    "126": "Engineering Manager",
    "127": "DevOps Engineer"
  };
  return roleTitles[id] || "Unknown Role";
};

const getRoleSoc = (id: string): string => {
  const socCodes: { [key: string]: string } = {
    "123": "15-2051",
    "124": "15-1252",
    "125": "15-1252",
    "126": "11-9041",
    "127": "15-1244"
  };
  return socCodes[id] || "";
};

// Export roleSkills object with empty initialization
export const roleSkills: { [key: string]: RoleSkillData } = {
  "123": getRoleSkills("123"),
  "124": getRoleSkills("124"), 
  "125": getRoleSkills("125"),
  "126": getRoleSkills("126"),
  "127": getRoleSkills("127")
};

console.log('Role skills initialized with empty skills:', Object.keys(roleSkills).map(id => ({
  roleId: id,
  title: roleSkills[id].title,
  skillCount: {
    total: roleSkills[id].skills.length,
    specialized: roleSkills[id].specialized.length,
    common: roleSkills[id].common.length,
    certifications: roleSkills[id].certifications.length
  }
})));