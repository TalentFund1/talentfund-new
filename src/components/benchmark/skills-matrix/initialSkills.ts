import { getUnifiedSkillData } from '../../skills/data/centralSkillsDatabase';

export const initialSkills = {
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
  const skills = initialSkills[id as keyof typeof initialSkills] || [];
  console.log('Found employee skills:', skills);
  return skills;
};