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

// Split skills into technical and soft skills
export const technicalSkills = [
  "Machine Learning",
  "Deep Learning",
  "Natural Language Processing",
  "Computer Vision",
  "TensorFlow",
  "PyTorch",
  "Python",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "CSS/SASS",
  "Git Version Control",
  "API Development",
  "System Architecture",
  "Docker",
  "Kubernetes",
  "AWS",
  "System Design",
  "Technical Architecture",
  "Risk Management",
  "Team Leadership",
  "Project Management",
  "Strategic Planning",
  "Stakeholder Management",
  "Jenkins",
  "Terraform",
  "Linux Administration",
  "Shell Scripting"
];

export const softSkills = [
  "Problem Solving",
  "Technical Writing",
  "Team Leadership",
  "Communication",
  "Project Management",
  "Agile Methodologies"
];

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
  
  // DevOps & Infrastructure
  "Docker": { category: "specialized", subcategory: "Container Technology" },
  "Kubernetes": { category: "specialized", subcategory: "Container Orchestration" },
  "Jenkins": { category: "specialized", subcategory: "CI/CD" },
  "Terraform": { category: "specialized", subcategory: "Infrastructure as Code" },
  "AWS": { category: "specialized", subcategory: "Cloud Platforms" },
  "Linux Administration": { category: "specialized", subcategory: "System Administration" },
  "Shell Scripting": { category: "common", subcategory: "System Administration" },
  
  // Common Skills
  "Problem Solving": { category: "common", subcategory: "Soft Skills" },
  "Technical Writing": { category: "common", subcategory: "Communication" },
  "Team Leadership": { category: "common", subcategory: "Leadership" },
  "Code Review": { category: "common", subcategory: "Development Practices" },
  "Agile Methodologies": { category: "common", subcategory: "Project Management" },
  
  // Certifications
  "AWS Certified DevOps Engineer": { category: "certification", subcategory: "Cloud Certification" },
  "Certified Kubernetes Administrator": { category: "certification", subcategory: "Container Certification" },
  "HashiCorp Certified Terraform Associate": { category: "certification", subcategory: "Infrastructure Certification" },
  "AWS Certified Machine Learning - Specialty": { category: "certification", subcategory: "AI/ML Certification" },
  "TensorFlow Developer Certificate": { category: "certification", subcategory: "AI/ML Certification" },
  "AWS Certified Developer - Associate": { category: "certification", subcategory: "Cloud Certification" },
  "Google Mobile Web Specialist": { category: "certification", subcategory: "Web Development Certification" },
  "Kubernetes Administrator (CKA)": { category: "certification", subcategory: "Container Certification" },
  "Project Management Professional (PMP)": { category: "certification", subcategory: "Project Management Certification" },
  "Certified Scrum Master (CSM)": { category: "certification", subcategory: "Agile Certification" },
  
  // Management skills
  "System Design": { category: "specialized", subcategory: "Software Architecture" },
  "Technical Architecture": { category: "specialized", subcategory: "Software Architecture" },
  "Risk Management": { category: "specialized", subcategory: "Management" },
  "Stakeholder Management": { category: "specialized", subcategory: "Management" },
  "Project Management": { category: "specialized", subcategory: "Management" },
  "Strategic Planning": { category: "specialized", subcategory: "Management" },
};

// Export matrixSkills after initialization
export { matrixSkills };