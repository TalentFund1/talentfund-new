import { getUnifiedSkillData } from '../../skills/data/skillDatabaseService';
import { roleSkills } from '../../skills/data/roleSkills';

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
  
  // Get base skills
  const baseSkills = initialSkills[id as keyof typeof initialSkills] || [];
  
  // Get role skills for categorization
  const currentRole = roleSkills[id as keyof typeof roleSkills];
  
  // Map skills with correct categorization from roleSkills
  const categorizedSkills = baseSkills.map(skill => {
    let category = 'common'; // default
    
    if (currentRole) {
      if (currentRole.specialized.some(s => s.title === skill.title)) {
        category = 'specialized';
      } else if (currentRole.certifications.some(s => s.title === skill.title)) {
        category = 'certification';
      }
    }
    
    console.log(`Categorized skill "${skill.title}" as ${category}`);
    
    return {
      ...skill,
      category
    };
  });

  console.log('Found employee skills:', categorizedSkills);
  return categorizedSkills;
};