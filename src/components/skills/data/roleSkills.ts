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
      skills: parsedSkills.skills || [],
      function: parsedSkills.function || "Engineering",
      mappedTitle: parsedSkills.mappedTitle || "",
      occupation: parsedSkills.occupation || "",
      description: parsedSkills.description || "",
      roleTrack: parsedSkills.roleTrack || "Professional"
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
    "127": "DevOps Engineer",
    "128": "Product Manager"
  };
  return roleTitles[id] || "Unknown Role";
};

const getRoleSoc = (id: string): string => {
  const socCodes: { [key: string]: string } = {
    "123": "15-2051",
    "124": "15-1252",
    "125": "15-1252",
    "126": "11-9041",
    "127": "15-1244",
    "128": "15-2031"
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
  "127": true,
  "128": true
}).forEach(id => {
  roleSkills[id] = getRoleSkills(id);
});

// Helper function to save role skills
export const saveRoleSkills = async (roleId: string, skills: RoleSkillData) => {
  console.log('Saving role skills:', { roleId, skills });
  
  try {
    // Update localStorage
    localStorage.setItem(`role-skills-${roleId}`, JSON.stringify(skills));
    
    // Update in-memory state
    roleSkills[roleId] = {
      ...skills,
      specialized: skills.specialized || [],
      common: skills.common || [],
      certifications: skills.certifications || [],
      skills: skills.skills || []
    };
    
    console.log('Updated role skills:', roleSkills[roleId]);
    
    // Dispatch custom event for components to update
    window.dispatchEvent(new CustomEvent('roleSkillsUpdated', { 
      detail: { roleId } 
    }));
    
    return true;
  } catch (error) {
    console.error('Error saving role skills:', error);
    throw error;
  }
};

// Helper function to load role skills
export const loadRoleSkills = (roleId: string): RoleSkillData | null => {
  try {
    const savedSkills = localStorage.getItem(`role-skills-${roleId}`);
    if (savedSkills) {
      return JSON.parse(savedSkills);
    }
  } catch (error) {
    console.error('Error loading role skills:', error);
  }
  return null;
};