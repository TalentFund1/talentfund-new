import { RoleSkillData } from '../types/SkillTypes';
import { skillDefinitions, getSkillByTitle } from './skillDefinitions';

// Initialize roleSkills with data from the universal database
const initializeRoleSkills = (roleId: string): RoleSkillData => {
  console.log('Initializing role skills from universal database:', roleId);
  
  const getSkillsForRole = (titles: string[]): UnifiedSkill[] => {
    return titles.map(title => {
      const skill = getSkillByTitle(title);
      if (!skill) {
        console.warn(`Skill not found in universal database: ${title}`);
      }
      return skill || {
        id: `SKILL_${Date.now()}`,
        title,
        subcategory: "Other",
        category: "common",
        businessCategory: "Information Technology",
        weight: "necessary",
        level: "beginner",
        growth: "10%",
        salary: "$0",
        confidence: "low",
        benchmarks: { B: false, R: false, M: false, O: false }
      };
    });
  };

  const roleSkillsMap: Record<string, string[]> = {
    "123": ["Machine Learning", "Deep Learning", "Natural Language Processing"],
    "124": ["Node.js", "Database Design", "System Architecture"],
    "125": ["React", "TypeScript", "CSS/SASS"],
    "126": ["Team Leadership", "System Design", "Technical Architecture"]
  };

  const titles = roleSkillsMap[roleId] || [];
  const skills = getSkillsForRole(titles);

  return {
    title: getRoleTitle(roleId),
    soc: getRoleSoc(roleId),
    function: "Engineering",
    specialized: skills.filter(s => s.category === 'specialized'),
    common: skills.filter(s => s.category === 'common'),
    certifications: skills.filter(s => s.category === 'certification'),
    skills: skills
  };
};

// Helper functions
const getRoleTitle = (id: string): string => {
  const titles: Record<string, string> = {
    "123": "AI Engineer",
    "124": "Backend Engineer",
    "125": "Frontend Engineer",
    "126": "Engineering Manager"
  };
  return titles[id] || "Unknown Role";
};

const getRoleSoc = (id: string): string => {
  const socs: Record<string, string> = {
    "123": "15-2051",
    "124": "15-1252",
    "125": "15-1254",
    "126": "11-9041"
  };
  return socs[id] || "";
};

// Initialize and export roleSkills
export const roleSkills: Record<string, RoleSkillData> = {};

["123", "124", "125", "126"].forEach(id => {
  roleSkills[id] = initializeRoleSkills(id);
  console.log(`Initialized role ${id} with skills from universal database:`, {
    title: roleSkills[id].title,
    specialized: roleSkills[id].specialized.length,
    common: roleSkills[id].common.length,
    certifications: roleSkills[id].certifications.length
  });
});

export { initializeRoleSkills };