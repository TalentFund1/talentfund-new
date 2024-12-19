import { RoleSkillData } from '../types/SkillTypes';
import { getAllSkills, getSkillByTitle } from './skills/allSkills';
import { getSkillCategory } from './skills/categories/skillCategories';

// Helper function to get skills for a role
const getRoleSkills = (roleId: string): RoleSkillData => {
  console.log('Getting skills for role:', roleId);
  
  const allSkills = getAllSkills();
  const specialized = [];
  const common = [];
  const certifications = [];

  // Filter skills based on role and categorize them
  allSkills.forEach(skill => {
    const category = getSkillCategory(skill.title);
    switch(category) {
      case 'specialized':
        specialized.push(skill);
        break;
      case 'common':
        common.push(skill);
        break;
      case 'certification':
        certifications.push(skill);
        break;
    }
  });

  // Return role-specific skills
  switch(roleId) {
    case "123": // AI Engineer
      return {
        title: "AI Engineer",
        soc: "15-2051",
        specialized: specialized.filter(skill => 
          ["Machine Learning", "Deep Learning", "Natural Language Processing", 
           "Computer Vision", "TensorFlow"].includes(skill.title)
        ),
        common: common.filter(skill => 
          ["Python", "Problem Solving", "Technical Writing"].includes(skill.title)
        ),
        certifications: certifications.filter(skill => 
          ["AWS Certified Machine Learning - Specialty", 
           "TensorFlow Developer Certificate",
           "Google Cloud Professional Machine Learning Engineer"].includes(skill.title)
        )
      };
    
    case "124": // Backend Engineer
      return {
        title: "Backend Engineer",
        soc: "15-1252",
        specialized: specialized.filter(skill => 
          ["Node.js", "Database Design", "API Development", 
           "System Architecture"].includes(skill.title)
        ),
        common: common.filter(skill => 
          ["Problem Solving", "Code Review", "Git Version Control"].includes(skill.title)
        ),
        certifications: certifications.filter(skill => 
          ["AWS Certified Solutions Architect", 
           "Kubernetes Administrator (CKA)"].includes(skill.title)
        )
      };

    case "125": // Frontend Engineer
      return {
        title: "Frontend Engineer",
        soc: "15-1252",
        specialized: specialized.filter(skill => 
          ["React", "TypeScript", "UI/UX Design", "CSS/SASS", "Next.js"].includes(skill.title)
        ),
        common: common.filter(skill => 
          ["Cross-browser Compatibility", "Responsive Design", 
           "Problem Solving"].includes(skill.title)
        ),
        certifications: certifications.filter(skill => 
          ["AWS Certified Developer - Associate",
           "Google Mobile Web Specialist",
           "Professional Scrum Developer"].includes(skill.title)
        )
      };

    case "126": // Engineering Manager
      return {
        title: "Engineering Manager",
        soc: "11-9041",
        specialized: specialized.filter(skill => 
          ["System Design", "Technical Architecture"].includes(skill.title)
        ),
        common: common.filter(skill => 
          ["Team Leadership", "Project Management", "Risk Management"].includes(skill.title)
        ),
        certifications: certifications.filter(skill => 
          ["Project Management Professional (PMP)",
           "Certified Scrum Master (CSM)"].includes(skill.title)
        )
      };

    case "127": // DevOps Engineer
      return {
        title: "DevOps Engineer",
        soc: "15-1244",
        specialized: specialized.filter(skill => 
          ["Kubernetes", "Docker", "CI/CD", "Infrastructure as Code"].includes(skill.title)
        ),
        common: common.filter(skill => 
          ["Problem Solving", "Shell Scripting", "Monitoring"].includes(skill.title)
        ),
        certifications: certifications.filter(skill => 
          ["AWS Certified DevOps Engineer",
           "Kubernetes Administrator (CKA)",
           "AWS Certified Solutions Architect"].includes(skill.title)
        )
      };

    default:
      console.warn('Unknown role ID:', roleId);
      return {
        title: "Unknown Role",
        soc: "",
        specialized: [],
        common: [],
        certifications: []
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
  skillCounts: {
    specialized: roleSkills[id].specialized.length,
    common: roleSkills[id].common.length,
    certifications: roleSkills[id].certifications.length
  }
})));