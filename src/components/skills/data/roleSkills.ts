import { RoleSkillData, UnifiedSkill } from '../types/SkillTypes';

// Helper function to get skills for a role
const getRoleSkills = (roleId: string): RoleSkillData => {
  console.log('Getting skills for role:', roleId);
  
  // Try to load saved skills from localStorage
  const savedSkills = localStorage.getItem(`role-skills-${roleId}`);
  if (savedSkills) {
    console.log('Found saved skills for role:', roleId);
    return JSON.parse(savedSkills);
  }
  
  // Initialize with empty arrays if no saved skills exist
  const defaultRole: RoleSkillData = {
    title: getRoleTitle(roleId),
    soc: getRoleSoc(roleId),
    specialized: [],
    common: [],
    certifications: [],
    skills: []
  };

  console.log('Initializing empty role data:', {
    roleId,
    title: defaultRole.title
  });

  // Save default role data
  localStorage.setItem(`role-skills-${roleId}`, JSON.stringify(defaultRole));
  return defaultRole;
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

// Export roleSkills object with initialization
export const roleSkills: { [key: string]: RoleSkillData } = {
  "123": getRoleSkills("123"),
  "124": getRoleSkills("124"), 
  "125": getRoleSkills("125"),
  "126": getRoleSkills("126"),
  "127": getRoleSkills("127")
};

// Helper function to save role skills
export const saveRoleSkills = (roleId: string, skills: RoleSkillData) => {
  console.log('Saving role skills:', { roleId, skills });
  localStorage.setItem(`role-skills-${roleId}`, JSON.stringify(skills));
  roleSkills[roleId] = skills;
};

console.log('Role skills initialized:', Object.keys(roleSkills).map(id => ({
  roleId: id,
  title: roleSkills[id].title,
  skillCount: {
    total: roleSkills[id].skills.length,
    specialized: roleSkills[id].specialized.length,
    common: roleSkills[id].common.length,
    certifications: roleSkills[id].certifications.length
  }
})));