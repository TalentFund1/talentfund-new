import { RoleSkillData } from '../types/SkillTypes';
import { loadRoleSkills, saveRoleSkills, initializeRoleSkills } from './roles/roleStorage';
import { getSkillCategory } from './skills/categories/skillCategories';
import { getUnifiedSkillData } from './skillDatabaseService';

// Initialize roleSkills object
export const roleSkills: { [key: string]: RoleSkillData } = {
  "123": {
    title: "AI Engineer",
    roleTrack: "Professional",
    specialized: [
      getUnifiedSkillData("Machine Learning"),
      getUnifiedSkillData("Deep Learning"),
      getUnifiedSkillData("Natural Language Processing"),
      getUnifiedSkillData("Computer Vision"),
      getUnifiedSkillData("TensorFlow"),
      getUnifiedSkillData("Python")
    ],
    common: [
      getUnifiedSkillData("Problem Solving"),
      getUnifiedSkillData("Code Review"),
      getUnifiedSkillData("Git Version Control"),
      getUnifiedSkillData("Team Collaboration")
    ],
    certifications: [
      getUnifiedSkillData("AWS Certified Machine Learning - Specialty"),
      getUnifiedSkillData("TensorFlow Developer Certificate")
    ],
    skills: []
  },
  "124": {
    title: "Frontend Developer",
    roleTrack: "Professional",
    specialized: [
      getUnifiedSkillData("React"),
      getUnifiedSkillData("TypeScript"),
      getUnifiedSkillData("JavaScript"),
      getUnifiedSkillData("HTML/CSS"),
      getUnifiedSkillData("UI/UX Design")
    ],
    common: [
      getUnifiedSkillData("Problem Solving"),
      getUnifiedSkillData("Code Review"),
      getUnifiedSkillData("Git Version Control"),
      getUnifiedSkillData("Team Collaboration")
    ],
    certifications: [
      getUnifiedSkillData("AWS Certified Developer - Associate"),
      getUnifiedSkillData("Professional Scrum Developer")
    ],
    skills: []
  },
  "125": {
    title: "Backend Developer",
    roleTrack: "Professional",
    specialized: [
      getUnifiedSkillData("Node.js"),
      getUnifiedSkillData("Database Design"),
      getUnifiedSkillData("API Development"),
      getUnifiedSkillData("System Architecture"),
      getUnifiedSkillData("Python")
    ],
    common: [
      getUnifiedSkillData("Problem Solving"),
      getUnifiedSkillData("Code Review"),
      getUnifiedSkillData("Git Version Control"),
      getUnifiedSkillData("Team Collaboration")
    ],
    certifications: [
      getUnifiedSkillData("AWS Certified Developer - Associate"),
      getUnifiedSkillData("Professional Scrum Developer")
    ],
    skills: []
  },
  "126": {
    title: "Engineering Manager",
    roleTrack: "Managerial",
    specialized: [
      getUnifiedSkillData("Team Leadership"),
      getUnifiedSkillData("Project Management"),
      getUnifiedSkillData("Performance Management"),
      getUnifiedSkillData("Technical Architecture")
    ],
    common: [
      getUnifiedSkillData("Communication"),
      getUnifiedSkillData("Problem Solving"),
      getUnifiedSkillData("Strategic Planning"),
      getUnifiedSkillData("Team Collaboration")
    ],
    certifications: [
      getUnifiedSkillData("Project Management Professional (PMP)"),
      getUnifiedSkillData("Professional Scrum Master")
    ],
    skills: []
  },
  "127": {
    title: "DevOps Engineer",
    roleTrack: "Professional",
    specialized: [
      getUnifiedSkillData("Docker"),
      getUnifiedSkillData("Kubernetes"),
      getUnifiedSkillData("CI/CD"),
      getUnifiedSkillData("Cloud Architecture"),
      getUnifiedSkillData("Infrastructure as Code")
    ],
    common: [
      getUnifiedSkillData("Problem Solving"),
      getUnifiedSkillData("System Administration"),
      getUnifiedSkillData("Security Best Practices"),
      getUnifiedSkillData("Team Collaboration")
    ],
    certifications: [
      getUnifiedSkillData("AWS Certified DevOps Engineer"),
      getUnifiedSkillData("Kubernetes Administrator (CKA)")
    ],
    skills: []
  },
  "128": {
    title: "Product Manager",
    roleTrack: "Professional",
    specialized: [
      getUnifiedSkillData("Product Strategy"),
      getUnifiedSkillData("Market Analysis"),
      getUnifiedSkillData("User Research"),
      getUnifiedSkillData("Product Development"),
      getUnifiedSkillData("Agile Methodologies")
    ],
    common: [
      getUnifiedSkillData("Communication"),
      getUnifiedSkillData("Problem Solving"),
      getUnifiedSkillData("Team Leadership"),
      getUnifiedSkillData("Strategic Planning")
    ],
    certifications: [
      getUnifiedSkillData("Professional Scrum Product Owner"),
      getUnifiedSkillData("Project Management Professional (PMP)")
    ],
    skills: []
  }
};

// Initialize all roles
const roleIds = ["123", "124", "125", "126", "127", "128"];

roleIds.forEach(id => {
  const savedSkills = loadRoleSkills(id);
  roleSkills[id] = savedSkills || roleSkills[id] || initializeRoleSkills(id);
  
  console.log(`Initialized role ${id}:`, {
    title: roleSkills[id].title,
    specialized: roleSkills[id].specialized.length,
    common: roleSkills[id].common.length,
    certifications: roleSkills[id].certifications.length
  });
});

// Export helper functions
export { saveRoleSkills, loadRoleSkills };

// Helper function to get category for a skill in a role
export const getRoleSkillCategory = (skillTitle: string, roleId: string): string => {
  console.log(`Getting category for skill "${skillTitle}" in role ${roleId}`);
  return getSkillCategory(skillTitle);
};