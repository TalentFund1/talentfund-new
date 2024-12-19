import { RoleSkillData, UnifiedSkill } from '../types/SkillTypes';
import { getAllSkills } from './skills/allSkills';
import { getSkillCategory } from './skills/categories/skillCategories';

// Helper function to get skills for a role
const getRoleSkills = (roleId: string): RoleSkillData => {
  console.log('Getting skills for role:', roleId);
  
  const allSkills = getAllSkills();

  // Return role-specific skills
  switch(roleId) {
    case "123": // AI Engineer
      return {
        title: "AI Engineer",
        soc: "15-2051",
        skills: allSkills.filter(skill => 
          ["Machine Learning", "Deep Learning", "Natural Language Processing", 
           "Computer Vision", "TensorFlow", "Python", "Problem Solving", 
           "Technical Writing", "AWS Certified Machine Learning - Specialty", 
           "TensorFlow Developer Certificate",
           "Google Cloud Professional Machine Learning Engineer"].includes(skill.title)
        )
      };
    
    case "124": // Backend Engineer
      return {
        title: "Backend Engineer",
        soc: "15-1252",
        skills: allSkills.filter(skill => 
          ["Node.js", "Database Design", "API Development", 
           "System Architecture", "Problem Solving", "Code Review", 
           "Git Version Control", "AWS Certified Solutions Architect", 
           "Kubernetes Administrator (CKA)"].includes(skill.title)
        )
      };

    case "125": // Frontend Engineer
      return {
        title: "Frontend Engineer",
        soc: "15-1252",
        skills: allSkills.filter(skill => 
          ["React", "TypeScript", "UI/UX Design", "CSS/SASS", "Next.js",
           "Cross-browser Compatibility", "Responsive Design", 
           "Problem Solving", "AWS Certified Developer - Associate",
           "Google Mobile Web Specialist",
           "Professional Scrum Developer"].includes(skill.title)
        )
      };

    case "126": // Engineering Manager
      return {
        title: "Engineering Manager",
        soc: "11-9041",
        skills: allSkills.filter(skill => 
          ["System Design", "Technical Architecture", "Team Leadership", 
           "Project Management", "Risk Management", 
           "Project Management Professional (PMP)",
           "Certified Scrum Master (CSM)"].includes(skill.title)
        )
      };

    case "127": // DevOps Engineer
      return {
        title: "DevOps Engineer",
        soc: "15-1244",
        skills: allSkills.filter(skill => 
          ["Kubernetes", "Docker", "CI/CD", "Infrastructure as Code",
           "Problem Solving", "Shell Scripting", "Monitoring",
           "AWS Certified DevOps Engineer",
           "Kubernetes Administrator (CKA)",
           "AWS Certified Solutions Architect"].includes(skill.title)
        )
      };

    default:
      console.warn('Unknown role ID:', roleId);
      return {
        title: "Unknown Role",
        soc: "",
        skills: []
      };
  }
};

// Export roleSkills object
export const roleSkills: { [key: string]: RoleSkillData } = {
  "123": getRoleSkills("123"),
  "124": getRoleSkills("124"), 
  "125": getRoleSkills("125"),
  "126": getRoleSkills("126"),
  "127": getRoleSkills("127")
};

console.log('Role skills initialized:', Object.keys(roleSkills).map(id => ({
  roleId: id,
  title: roleSkills[id].title,
  skillCount: roleSkills[id].skills.length,
  categories: roleSkills[id].skills.reduce((acc: {[key: string]: number}, skill) => {
    const category = getSkillCategory(skill.title);
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {})
})));