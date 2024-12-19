import { RoleSkillData } from '../types/SkillTypes';
import { getSkillByTitle } from './skills/allSkills';

const getRoleSkills = (titles: string[]) => {
  return titles
    .map(title => getSkillByTitle(title))
    .filter(skill => skill !== undefined);
};

export const roleSkills: { [key: string]: RoleSkillData } = {
  "123": {
    title: "AI Engineer",
    soc: "15-2051",
    specialized: getRoleSkills([
      "Machine Learning",
      "Deep Learning",
      "Natural Language Processing",
      "Computer Vision",
      "TensorFlow",
      "GraphQL"
    ]),
    common: getRoleSkills([
      "Python",
      "Problem Solving",
      "Technical Writing",
      "Git Version Control",
      "Communication"
    ]),
    certifications: getRoleSkills([
      "AWS Certified Machine Learning - Specialty",
      "TensorFlow Developer Certificate"
    ])
  },
  "124": {
    title: "Backend Engineer",
    soc: "15-1252",
    specialized: getRoleSkills([
      "Node.js",
      "Database Design",
      "API Development",
      "System Architecture",
      "Kubernetes",
      "GraphQL"
    ]),
    common: getRoleSkills([
      "Problem Solving",
      "Code Review",
      "Agile Methodologies",
      "Git Version Control",
      "Communication"
    ]),
    certifications: getRoleSkills([
      "AWS Certified Solutions Architect",
      "Kubernetes Administrator (CKA)"
    ])
  },
  "125": {
    title: "Frontend Engineer",
    soc: "15-1252",
    specialized: getRoleSkills([
      "React",
      "TypeScript",
      "Next.js",
      "CSS/SASS",
      "Performance Optimization",
      "React Native",
      "Flutter",
      "GraphQL"
    ]),
    common: getRoleSkills([
      "Problem Solving",
      "Code Review",
      "Agile Methodologies",
      "Git Version Control",
      "Communication"
    ]),
    certifications: getRoleSkills([
      "AWS Certified Developer - Associate",
      "Google Mobile Web Specialist"
    ])
  },
  "126": {
    title: "Engineering Manager",
    soc: "11-9041",
    specialized: getRoleSkills([
      "System Design",
      "Technical Architecture",
      "Risk Management",
      "Team Leadership",
      "Project Management"
    ]),
    common: getRoleSkills([
      "Strategic Planning",
      "Stakeholder Management",
      "Agile Methodologies",
      "Git Version Control",
      "Communication"
    ]),
    certifications: getRoleSkills([
      "Project Management Professional (PMP)",
      "Certified Scrum Master (CSM)"
    ])
  },
  "127": {
    title: "DevOps Engineer",
    soc: "15-1244",
    specialized: getRoleSkills([
      "Docker",
      "Kubernetes",
      "Jenkins",
      "Terraform",
      "AWS"
    ]),
    common: getRoleSkills([
      "Linux Administration",
      "Shell Scripting",
      "Git Version Control",
      "Problem Solving",
      "Communication"
    ]),
    certifications: getRoleSkills([
      "AWS Certified DevOps Engineer",
      "Certified Kubernetes Administrator",
      "HashiCorp Certified Terraform Associate"
    ])
  }
};