import { getUnifiedSkillData } from './skillDatabaseService';
import { RoleSkillData } from '../types/SkillTypes';

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
    common: [
      getUnifiedSkillData("Python"),
      getUnifiedSkillData("Problem Solving"),
      getUnifiedSkillData("Technical Writing"),
      getUnifiedSkillData("Git Version Control"),
      getUnifiedSkillData("Communication")
    ],
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
    common: [
      getUnifiedSkillData("Problem Solving"),
      getUnifiedSkillData("Code Review"),
      getUnifiedSkillData("Agile Methodologies"),
      getUnifiedSkillData("Git Version Control"),
      getUnifiedSkillData("Communication")
    ],
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
    common: [
      getUnifiedSkillData("Problem Solving"),
      getUnifiedSkillData("Code Review"),
      getUnifiedSkillData("Agile Methodologies"),
      getUnifiedSkillData("Git Version Control"),
      getUnifiedSkillData("Communication")
    ],
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
    common: [
      getUnifiedSkillData("Strategic Planning"),
      getUnifiedSkillData("Stakeholder Management"),
      getUnifiedSkillData("Agile Methodologies"),
      getUnifiedSkillData("Git Version Control"),
      getUnifiedSkillData("Communication")
    ],
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
    common: [
      getUnifiedSkillData("Linux Administration"),
      getUnifiedSkillData("Shell Scripting"),
      getUnifiedSkillData("Git Version Control"),
      getUnifiedSkillData("Problem Solving"),
      getUnifiedSkillData("Communication")
    ],
    certifications: [
      getUnifiedSkillData("AWS Certified DevOps Engineer"),
      getUnifiedSkillData("Certified Kubernetes Administrator"),
      getUnifiedSkillData("HashiCorp Certified Terraform Associate")
    ]
  }
};