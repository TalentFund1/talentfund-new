import { getUnifiedSkillData } from './centralSkillsDatabase';
import { RoleSkillData } from '../types/SkillTypes';

// Helper function to ensure Git Version Control is only added once
const getCommonSkillsWithoutDuplicateGit = (skills: string[]) => {
  const hasGitVersionControl = skills.includes("Git Version Control");
  return skills.filter(skill => 
    skill !== "Git Version Control" || 
    (skill === "Git Version Control" && !hasGitVersionControl)
  ).map(getUnifiedSkillData);
};

export const roleSkills: { [key: string]: RoleSkillData } = {
  "123": {
    title: "AI Engineer",
    soc: "15-2051",
    specialized: [
      getUnifiedSkillData("Machine Learning"),
      getUnifiedSkillData("Deep Learning"),
      getUnifiedSkillData("Natural Language Processing"),
      getUnifiedSkillData("Computer Vision"),
      getUnifiedSkillData("TensorFlow"),
      getUnifiedSkillData("GraphQL")
    ],
    common: getCommonSkillsWithoutDuplicateGit([
      "Python",
      "Problem Solving",
      "Technical Writing",
      "Git Version Control",
      "Communication"
    ]),
    certifications: [
      getUnifiedSkillData("AWS Certified Machine Learning - Specialty"),
      getUnifiedSkillData("TensorFlow Developer Certificate")
    ]
  },
  "124": {
    title: "Backend Engineer",
    soc: "15-1252",
    specialized: [
      getUnifiedSkillData("Node.js"),
      getUnifiedSkillData("Database Design"),
      getUnifiedSkillData("API Development"),
      getUnifiedSkillData("System Architecture"),
      getUnifiedSkillData("Kubernetes"),
      getUnifiedSkillData("GraphQL")
    ],
    common: getCommonSkillsWithoutDuplicateGit([
      "Problem Solving",
      "Code Review",
      "Agile Methodologies",
      "Git Version Control",
      "Communication"
    ]),
    certifications: [
      getUnifiedSkillData("AWS Certified Solutions Architect"),
      getUnifiedSkillData("Kubernetes Administrator (CKA)")
    ]
  },
  "125": {
    title: "Frontend Engineer",
    soc: "15-1252",
    specialized: [
      getUnifiedSkillData("React"),
      getUnifiedSkillData("TypeScript"),
      getUnifiedSkillData("Next.js"),
      getUnifiedSkillData("CSS/SASS"),
      getUnifiedSkillData("Performance Optimization"),
      getUnifiedSkillData("React Native"),
      getUnifiedSkillData("Flutter"),
      getUnifiedSkillData("GraphQL")
    ],
    common: getCommonSkillsWithoutDuplicateGit([
      "Problem Solving",
      "Code Review",
      "Agile Methodologies",
      "Git Version Control",
      "Communication"
    ]),
    certifications: [
      getUnifiedSkillData("AWS Certified Developer - Associate"),
      getUnifiedSkillData("Google Mobile Web Specialist")
    ]
  },
  "126": {
    title: "Engineering Manager",
    soc: "11-9041",
    specialized: [
      getUnifiedSkillData("System Design"),
      getUnifiedSkillData("Technical Architecture"),
      getUnifiedSkillData("Risk Management"),
      getUnifiedSkillData("Team Leadership"),
      getUnifiedSkillData("Project Management")
    ],
    common: getCommonSkillsWithoutDuplicateGit([
      "Strategic Planning",
      "Stakeholder Management",
      "Agile Methodologies",
      "Git Version Control",
      "Communication"
    ]),
    certifications: [
      getUnifiedSkillData("Project Management Professional (PMP)"),
      getUnifiedSkillData("Certified Scrum Master (CSM)")
    ]
  },
  "127": {
    title: "DevOps Engineer",
    soc: "15-1244",
    specialized: [
      getUnifiedSkillData("Docker"),
      getUnifiedSkillData("Kubernetes"),
      getUnifiedSkillData("Jenkins"),
      getUnifiedSkillData("Terraform"),
      getUnifiedSkillData("AWS")
    ],
    common: getCommonSkillsWithoutDuplicateGit([
      "Linux Administration",
      "Shell Scripting",
      "Git Version Control",
      "Problem Solving",
      "Communication"
    ]),
    certifications: [
      getUnifiedSkillData("AWS Certified DevOps Engineer"),
      getUnifiedSkillData("Certified Kubernetes Administrator"),
      getUnifiedSkillData("HashiCorp Certified Terraform Associate")
    ]
  }
};

console.log('Role skills loaded:', Object.keys(roleSkills).length, 'roles');
console.log('Git Version Control occurrences:', 
  Object.values(roleSkills).reduce((count, role) => 
    count + role.common.filter(skill => skill.title === "Git Version Control").length, 0
  )
);