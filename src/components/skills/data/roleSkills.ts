import { RoleSkillData, UnifiedSkill } from '../types/SkillTypes';
import { getSkillByTitle } from './skills/allSkills';
import { getSkillCategory } from './skills/categories/skillCategories';

// Helper function to get skills for a role with proper categorization
const getRoleSkills = (roleId: string): RoleSkillData => {
  console.log('Getting skills for role:', roleId);
  
  // Try to load saved skills from localStorage
  const savedSkills = localStorage.getItem(`role-skills-${roleId}`);
  if (savedSkills) {
    console.log('Found saved skills for role:', roleId);
    const parsedSkills = JSON.parse(savedSkills);
    
    // Re-categorize skills based on universal database
    const recategorizedSkills = {
      ...parsedSkills,
      specialized: (parsedSkills.specialized || []).map((skill: UnifiedSkill) => {
        const universalSkill = getSkillByTitle(skill.title);
        return {
          ...skill,
          category: universalSkill?.category || getSkillCategory(skill.title)
        };
      }),
      common: (parsedSkills.common || []).map((skill: UnifiedSkill) => {
        const universalSkill = getSkillByTitle(skill.title);
        return {
          ...skill,
          category: universalSkill?.category || getSkillCategory(skill.title)
        };
      }),
      certifications: (parsedSkills.certifications || []).map((skill: UnifiedSkill) => {
        const universalSkill = getSkillByTitle(skill.title);
        return {
          ...skill,
          category: universalSkill?.category || getSkillCategory(skill.title)
        };
      }),
      skills: parsedSkills.skills || [],
      function: parsedSkills.function || "Engineering",
      mappedTitle: parsedSkills.mappedTitle || "",
      occupation: parsedSkills.occupation || "",
      roleTrack: parsedSkills.roleTrack || getRoleDefaultTrack(roleId)
    };

    console.log('Recategorized skills based on universal database:', recategorizedSkills);
    return recategorizedSkills;
  }
  
  // Initialize with default values if no saved skills exist
  const defaultRole: RoleSkillData = {
    title: getRoleTitle(roleId),
    soc: getRoleSoc(roleId),
    function: "Engineering",
    mappedTitle: "",
    occupation: getRoleTitle(roleId),
    description: "",
    roleTrack: getRoleDefaultTrack(roleId),
    specialized: [],
    common: [],
    certifications: [],
    skills: []
  };

  console.log('Initializing default role data:', {
    roleId,
    title: defaultRole.title,
    track: defaultRole.roleTrack
  });

  // Save default role data
  localStorage.setItem(`role-skills-${roleId}`, JSON.stringify(defaultRole));
  return defaultRole;
};

const getRoleTitle = (id: string): string => {
  const roleTitles: { [key: string]: string } = {
    "123": "AI Engineer",  // Updated from "AI Engineers" to "AI Engineer"
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

// Helper function to determine default track based on role
const getRoleDefaultTrack = (roleId: string): "Professional" | "Managerial" => {
  console.log('Determining default track for role:', roleId);
  
  // Only Engineering Manager (126) should be managerial by default
  const isManagerial = roleId === "126";
  const track = isManagerial ? "Managerial" : "Professional";
  
  console.log('Default track determined:', {
    roleId,
    track,
    isManagerial
  });
  
  return track;
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
    // Ensure all skills have proper categorization from universal database
    const updatedSkills = {
      ...skills,
      specialized: skills.specialized.map(skill => ({
        ...skill,
        category: getSkillByTitle(skill.title)?.category || getSkillCategory(skill.title)
      })),
      common: skills.common.map(skill => ({
        ...skill,
        category: getSkillByTitle(skill.title)?.category || getSkillCategory(skill.title)
      })),
      certifications: skills.certifications.map(skill => ({
        ...skill,
        category: getSkillByTitle(skill.title)?.category || getSkillCategory(skill.title)
      }))
    };
    
    // Update localStorage
    localStorage.setItem(`role-skills-${roleId}`, JSON.stringify(updatedSkills));
    
    // Update in-memory state
    roleSkills[roleId] = updatedSkills;
    
    console.log('Updated role skills with universal categories:', roleSkills[roleId]);
    
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
      const parsedSkills = JSON.parse(savedSkills);
      // Ensure loaded skills use universal database categories
      return {
        ...parsedSkills,
        specialized: parsedSkills.specialized.map((skill: UnifiedSkill) => ({
          ...skill,
          category: getSkillByTitle(skill.title)?.category || getSkillCategory(skill.title)
        })),
        common: parsedSkills.common.map((skill: UnifiedSkill) => ({
          ...skill,
          category: getSkillByTitle(skill.title)?.category || getSkillCategory(skill.title)
        })),
        certifications: parsedSkills.certifications.map((skill: UnifiedSkill) => ({
          ...skill,
          category: getSkillByTitle(skill.title)?.category || getSkillCategory(skill.title)
        }))
      };
    }
  } catch (error) {
    console.error('Error loading role skills:', error);
  }
  return null;
};