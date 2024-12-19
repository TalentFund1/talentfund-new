import { RoleSkillData, UnifiedSkill } from '../types/SkillTypes';
import { getAllSkills } from './skills/allSkills';
import { getSkillCategory } from './skills/categories/skillCategories';

export const ROLE_DEFINITIONS = {
  "123": { title: "AI Engineer", soc: "15-2051" },
  "124": { title: "Backend Engineer", soc: "15-1252" },
  "125": { title: "Frontend Engineer", soc: "15-1252" },
  "126": { title: "Engineering Manager", soc: "11-9041" },
  "127": { title: "DevOps Engineer", soc: "15-1244" }
} as const;

export const ROLE_SKILL_MAPPINGS = {
  "123": [
    "Machine Learning", "Deep Learning", "Natural Language Processing", 
    "Computer Vision", "TensorFlow", "Python", "Problem Solving", 
    "Technical Writing", "AWS Certified Machine Learning - Specialty", 
    "TensorFlow Developer Certificate",
    "Google Cloud Professional Machine Learning Engineer"
  ],
  "124": [
    "Node.js", "Database Design", "API Development", 
    "System Architecture", "Problem Solving", "Code Review", 
    "Git Version Control", "AWS Certified Solutions Architect", 
    "Kubernetes Administrator (CKA)"
  ],
  "125": [
    "React", "TypeScript", "UI/UX Design", "CSS/SASS", "Next.js",
    "Cross-browser Compatibility", "Responsive Design", 
    "Problem Solving", "AWS Certified Developer - Associate",
    "Google Mobile Web Specialist",
    "Professional Scrum Developer"
  ],
  "126": [
    "System Design", "Technical Architecture", "Team Leadership", 
    "Project Management", "Risk Management", 
    "Project Management Professional (PMP)",
    "Certified Scrum Master (CSM)"
  ],
  "127": [
    "Kubernetes", "Docker", "CI/CD", "Infrastructure as Code",
    "Problem Solving", "Shell Scripting", "Monitoring",
    "AWS Certified DevOps Engineer",
    "Kubernetes Administrator (CKA)",
    "AWS Certified Solutions Architect"
  ]
} as const;

// Helper function to get skills for a role
const getRoleSkills = (roleId: string): RoleSkillData => {
  console.log('Getting skills for role:', roleId);
  
  const allSkills = getAllSkills();
  const roleDefinition = ROLE_DEFINITIONS[roleId as keyof typeof ROLE_DEFINITIONS];
  const roleSkillTitles = ROLE_SKILL_MAPPINGS[roleId as keyof typeof ROLE_SKILL_MAPPINGS] || [];

  if (!roleDefinition) {
    console.warn('Unknown role ID:', roleId);
    return {
      title: "Unknown Role",
      soc: "",
      specialized: [],
      common: [],
      certifications: [],
      skills: []
    };
  }

  // Filter skills based on the role's skill mapping
  const skills = allSkills.filter(skill => 
    roleSkillTitles.includes(skill.title)
  );

  // Helper function to filter skills by category
  const filterSkillsByCategory = (skills: UnifiedSkill[], category: string) => {
    return skills.filter(skill => getSkillCategory(skill.title) === category) || [];
  };

  // Initialize arrays with empty arrays as fallback
  const specialized = filterSkillsByCategory(skills, 'specialized') || [];
  const common = filterSkillsByCategory(skills, 'common') || [];
  const certifications = filterSkillsByCategory(skills, 'certification') || [];

  console.log('Role skills categorized:', {
    roleId,
    specialized: specialized.length,
    common: common.length,
    certifications: certifications.length,
    total: skills.length
  });

  return {
    title: roleDefinition.title,
    soc: roleDefinition.soc,
    specialized,
    common,
    certifications,
    skills
  };
};

// Export roleSkills object with proper initialization
export const roleSkills: { [key: string]: RoleSkillData } = Object.keys(ROLE_DEFINITIONS).reduce((acc, roleId) => ({
  ...acc,
  [roleId]: getRoleSkills(roleId)
}), {});

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