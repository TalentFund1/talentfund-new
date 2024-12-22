import { RoleSkillData, UnifiedSkill } from '../types/SkillTypes';
import { getSkillByTitle } from './skills/allSkills';
import { getSkillCategory } from './skills/categories/skillCategories';
import { normalizeSkillTitle } from '../utils/normalization';

// Helper function to get skills for a role with proper categorization
const getRoleSkills = (roleId: string): RoleSkillData => {
  console.log('Getting skills for role:', roleId);
  
  // Try to load saved skills from localStorage
  const savedSkills = localStorage.getItem(`role-skills-${roleId}`);
  if (savedSkills) {
    console.log('Found saved skills for role:', roleId);
    const parsedSkills = JSON.parse(savedSkills);
    
    // Re-categorize all skills using universal database
    const recategorizedSkills = {
      ...parsedSkills,
      specialized: (parsedSkills.specialized || []).map((skill: UnifiedSkill) => {
        const category = getSkillCategory(skill.title);
        console.log(`Recategorizing skill ${skill.title}:`, category);
        return {
          ...skill,
          category
        };
      }),
      common: (parsedSkills.common || []).map((skill: UnifiedSkill) => {
        const category = getSkillCategory(skill.title);
        console.log(`Recategorizing skill ${skill.title}:`, category);
        return {
          ...skill,
          category
        };
      }),
      certifications: (parsedSkills.certifications || []).map((skill: UnifiedSkill) => {
        const category = getSkillCategory(skill.title);
        console.log(`Recategorizing skill ${skill.title}:`, category);
        return {
          ...skill,
          category
        };
      })
    };

    // Redistribute skills based on universal database categorization
    const allSkills = [
      ...recategorizedSkills.specialized,
      ...recategorizedSkills.common,
      ...recategorizedSkills.certifications
    ];

    const redistributedSkills = {
      ...recategorizedSkills,
      specialized: allSkills.filter(skill => getSkillCategory(skill.title) === 'specialized'),
      common: allSkills.filter(skill => getSkillCategory(skill.title) === 'common'),
      certifications: allSkills.filter(skill => getSkillCategory(skill.title) === 'certification')
    };

    console.log('Redistributed skills based on universal categories:', {
      specialized: redistributedSkills.specialized.length,
      common: redistributedSkills.common.length,
      certifications: redistributedSkills.certifications.length
    });

    return redistributedSkills;
  }
  
  // Initialize with default values if no saved skills exist
  return {
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

const getRoleDefaultTrack = (roleId: string): "Professional" | "Managerial" => {
  console.log('Determining default track for role:', roleId);
  return roleId === "126" ? "Managerial" : "Professional";
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
      specialized: skills.specialized.filter(skill => 
        getSkillCategory(skill.title) === 'specialized'
      ),
      common: skills.common.filter(skill => 
        getSkillCategory(skill.title) === 'common'
      ),
      certifications: skills.certifications.filter(skill => 
        getSkillCategory(skill.title) === 'certification'
      )
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
      const recategorizedSkills = {
        ...parsedSkills,
        specialized: parsedSkills.specialized.filter((skill: UnifiedSkill) => 
          getSkillCategory(skill.title) === 'specialized'
        ),
        common: parsedSkills.common.filter((skill: UnifiedSkill) => 
          getSkillCategory(skill.title) === 'common'
        ),
        certifications: parsedSkills.certifications.filter((skill: UnifiedSkill) => 
          getSkillCategory(skill.title) === 'certification'
        )
      };
      
      console.log('Loaded and recategorized skills:', {
        roleId,
        specialized: recategorizedSkills.specialized.length,
        common: recategorizedSkills.common.length,
        certifications: recategorizedSkills.certifications.length
      });
      
      return recategorizedSkills;
    }
  } catch (error) {
    console.error('Error loading role skills:', error);
  }
  return null;
};