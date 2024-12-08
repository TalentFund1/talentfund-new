import { getEmployeeSkills } from "./benchmark/skills-matrix/initialSkills";
import { roleSkills } from "./skills/data/roleSkills";

// Extract unique skills from all sources after roleSkills is initialized
const getAllSkills = () => {
  console.log('Getting all skills from employees and roles...');
  
  try {
    // Get skills from all employees
    const employeeSkills = Object.keys(roleSkills).flatMap(id => {
      const skills = getEmployeeSkills(id).map(skill => skill.title);
      console.log(`Found ${skills.length} skills for employee ${id}`);
      return skills;
    });

    // Get skills from all roles
    const roleBasedSkills = Object.values(roleSkills).flatMap(role => {
      const skills = [
        ...role.specialized.map(skill => skill.title),
        ...role.common.map(skill => skill.title),
        ...role.certifications.map(skill => skill.title)
      ];
      console.log(`Found ${skills.length} skills for role ${role.title}`);
      return skills;
    });

    // Combine and deduplicate
    const uniqueSkills = [...new Set([...employeeSkills, ...roleBasedSkills])];
    console.log(`Total unique skills found: ${uniqueSkills.length}`);
    return uniqueSkills;
  } catch (error) {
    console.error('Error getting all skills:', error);
    return [];
  }
};

// Initialize skills after roleSkills is imported
const matrixSkills = getAllSkills();

// Universal skill categorization mapping
export const skillCategorization = {
  // AI & ML
  "Machine Learning": { category: "specialized", subcategory: "AI & ML" },
  "Deep Learning": { category: "specialized", subcategory: "AI & ML" },
  "Natural Language Processing": { category: "specialized", subcategory: "AI Applications" },
  "Computer Vision": { category: "specialized", subcategory: "AI Applications" },
  "TensorFlow": { category: "specialized", subcategory: "ML Frameworks" },
  "PyTorch": { category: "specialized", subcategory: "ML Frameworks" },
  
  // Programming & Development
  "Python": { category: "common", subcategory: "Programming Languages" },
  "JavaScript": { category: "common", subcategory: "Programming Languages" },
  "TypeScript": { category: "common", subcategory: "Programming Languages" },
  "React": { category: "specialized", subcategory: "Frontend Frameworks" },
  "Next.js": { category: "specialized", subcategory: "Frontend Frameworks" },
  "Node.js": { category: "specialized", subcategory: "Backend Development" },
  "CSS/SASS": { category: "specialized", subcategory: "Frontend Development" },
  "Git Version Control": { category: "common", subcategory: "Development Tools" },
  "API Development": { category: "specialized", subcategory: "Backend Development" },
  "System Architecture": { category: "specialized", subcategory: "Software Architecture" },
  "Code Review": { category: "common", subcategory: "Development Practices" },
  "Agile Methodologies": { category: "common", subcategory: "Project Management" },
  
  // DevOps & Cloud
  "Docker": { category: "specialized", subcategory: "Container Technology" },
  "Kubernetes": { category: "specialized", subcategory: "Container Orchestration" },
  "AWS": { category: "specialized", subcategory: "Cloud Platforms" },
  
  // Soft Skills & Communication
  "Problem Solving": { category: "common", subcategory: "Soft Skills" },
  "Technical Writing": { category: "common", subcategory: "Communication" },
  "Team Leadership": { category: "common", subcategory: "Leadership" },
  
  // Certifications
  "AWS Certified Machine Learning - Specialty": { category: "certification", subcategory: "Cloud Certification" },
  "TensorFlow Developer Certificate": { category: "certification", subcategory: "AI Certification" },
  "AWS Certified Developer - Associate": { category: "certification", subcategory: "Cloud Certification" },
  "Google Mobile Web Specialist": { category: "certification", subcategory: "Web Development Certification" },
  "Kubernetes Administrator (CKA)": { category: "certification", subcategory: "Container Certification" }
};

export const getSkillCategorization = (skillTitle: string) => {
  const defaultCategorization = {
    category: "common",
    subcategory: "General Skills"
  };

  return skillCategorization[skillTitle] || defaultCategorization;
};

// Export matrixSkills after initialization
export { matrixSkills };
