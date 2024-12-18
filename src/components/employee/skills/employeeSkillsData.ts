import { UnifiedSkill } from '../../skills/types/SkillTypes';
import { getUnifiedSkillData } from '../../skills/data/skillDatabaseService';

// Employee-specific skills database
const employeeSkills = {
  "124": [
    { ...getUnifiedSkillData("Node.js"), requirement: "preferred", isCompanySkill: true },
    { ...getUnifiedSkillData("Database Design"), requirement: "preferred", isCompanySkill: true },
    { ...getUnifiedSkillData("API Development"), requirement: "preferred", isCompanySkill: true }
  ],
  "123": [
    { ...getUnifiedSkillData("Machine Learning"), level: "advanced", requirement: "required", isCompanySkill: true },
    { ...getUnifiedSkillData("Deep Learning"), level: "advanced", requirement: "required", isCompanySkill: true },
    { ...getUnifiedSkillData("Natural Language Processing"), level: "beginner", requirement: "unknown", isCompanySkill: true },
    { ...getUnifiedSkillData("TensorFlow"), level: "beginner", requirement: "skill_goal", isCompanySkill: true }
  ],
  "125": [
    { ...getUnifiedSkillData("React"), requirement: "preferred", isCompanySkill: true },
    { ...getUnifiedSkillData("TypeScript"), requirement: "preferred", isCompanySkill: true }
  ],
  "126": [
    { ...getUnifiedSkillData("Team Leadership"), requirement: "preferred", isCompanySkill: true },
    { ...getUnifiedSkillData("Project Management"), requirement: "preferred", isCompanySkill: true }
  ]
};

export const getEmployeeSkills = (id: string) => {
  console.log('Getting skills for employee:', id);
  const skills = employeeSkills[id as keyof typeof employeeSkills] || [];
  console.log('Found employee skills:', skills);
  return skills;
};

// Helper functions for employee skills
export const getEmployeeSkillLevel = (employeeId: string, skillTitle: string): string => {
  const skills = getEmployeeSkills(employeeId);
  const skill = skills.find(s => s.title === skillTitle);
  return skill?.level || 'unspecified';
};

export const getEmployeeSkillRequirement = (employeeId: string, skillTitle: string): string => {
  const skills = getEmployeeSkills(employeeId);
  const skill = skills.find(s => s.title === skillTitle);
  return skill?.requirement || 'unknown';
};