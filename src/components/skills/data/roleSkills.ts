import { RoleSkillData, UnifiedSkill } from '../types/SkillTypes';

// Helper function to get skills for a role
const getRoleSkills = (roleId: string): RoleSkillData => {
  console.log('Getting skills for role:', roleId);
  
  // Try to load saved skills from localStorage
  const savedSkills = localStorage.getItem(`role-skills-${roleId}`);
  if (savedSkills) {
    console.log('Found saved skills for role:', roleId);
    const parsedSkills = JSON.parse(savedSkills);
    return {
      ...parsedSkills,
      specialized: parsedSkills.specialized || [],
      common: parsedSkills.common || [],
      certifications: parsedSkills.certifications || [],
      skills: parsedSkills.skills || []
    };
  }
  
  // Initialize with default values if no saved skills exist
  const defaultRole: RoleSkillData = {
    title: getRoleTitle(roleId),
    soc: getRoleSoc(roleId),
    function: "Engineering",
    mappedTitle: "",
    occupation: getRoleTitle(roleId),
    description: "",
    roleTrack: "Professional",
    specialized: [],
    common: [],
    certifications: [],
    skills: []
  };

  console.log('Initializing default role data:', {
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

// Initialize roleSkills object
export const roleSkills: { [key: string]: RoleSkillData } = {};

// Initialize all roles
Object.keys({
  "123": true,
  "124": true,
  "125": true,
  "126": true,
  "127": true
}).forEach(id => {
  roleSkills[id] = getRoleSkills(id);
});

// Helper function to save role skills
export const saveRoleSkills = (roleId: string, skills: RoleSkillData) => {
  console.log('Saving role skills:', { roleId, skills });
  localStorage.setItem(`role-skills-${roleId}`, JSON.stringify(skills));
  roleSkills[roleId] = skills;
};