import { UnifiedSkill } from '../../../skills/types/SkillTypes';
import { getUnifiedSkillData } from '../../../skills/data/skillDatabaseService';
import { normalizeSkillTitle } from '../../../skills/utils/normalization';
import { getSkillCategory } from '../../../skills/data/skills/categories/skillCategories';

// Define skills for each employee independently
export const employeeSkills: { [key: string]: UnifiedSkill[] } = {
  "123": [
    "Python",
    "Machine Learning",
    "Deep Learning",
    "TensorFlow",
    "Problem Solving",
    "Communication"
  ].map(title => {
    const normalizedTitle = normalizeSkillTitle(title);
    const skillData = getUnifiedSkillData(normalizedTitle);
    console.log('Loading employee 123 skill:', {
      title: normalizedTitle,
      category: getSkillCategory(normalizedTitle)
    });
    return {
      ...skillData,
      title: normalizedTitle,
      category: getSkillCategory(normalizedTitle),
      employeeId: "123", // Add employeeId to track ownership
      level: 'intermediate',
      requirement: 'required'
    };
  }),

  "124": [
    "Node.js",
    "MongoDB",
    "Express.js",
    "SQL",
    "Problem Solving",
    "Communication"
  ].map(title => {
    const normalizedTitle = normalizeSkillTitle(title);
    const skillData = getUnifiedSkillData(normalizedTitle);
    console.log('Loading employee 124 skill:', {
      title: normalizedTitle,
      category: getSkillCategory(normalizedTitle)
    });
    return {
      ...skillData,
      title: normalizedTitle,
      category: getSkillCategory(normalizedTitle),
      employeeId: "124", // Add employeeId to track ownership
      level: 'intermediate',
      requirement: 'required'
    };
  }),

  "125": [
    "React",
    "TypeScript",
    "CSS",
    "HTML",
    "Problem Solving",
    "Communication"
  ].map(title => {
    const normalizedTitle = normalizeSkillTitle(title);
    const skillData = getUnifiedSkillData(normalizedTitle);
    console.log('Loading employee 125 skill:', {
      title: normalizedTitle,
      category: getSkillCategory(normalizedTitle)
    });
    return {
      ...skillData,
      title: normalizedTitle,
      category: getSkillCategory(normalizedTitle),
      employeeId: "125", // Add employeeId to track ownership
      level: 'intermediate',
      requirement: 'required'
    };
  }),

  "126": [
    "Project Management",
    "Team Leadership",
    "Agile Methodologies",
    "Strategic Planning",
    "Problem Solving",
    "Communication"
  ].map(title => {
    const normalizedTitle = normalizeSkillTitle(title);
    const skillData = getUnifiedSkillData(normalizedTitle);
    console.log('Loading employee 126 skill:', {
      title: normalizedTitle,
      category: getSkillCategory(normalizedTitle)
    });
    return {
      ...skillData,
      title: normalizedTitle,
      category: getSkillCategory(normalizedTitle),
      employeeId: "126", // Add employeeId to track ownership
      level: 'intermediate',
      requirement: 'required'
    };
  })
};

// Export helper function
export const getEmployeeSkills = (employeeId: string): UnifiedSkill[] => {
  console.log('Getting skills for employee:', employeeId);
  
  // Get employee's specific skills if they exist
  if (employeeSkills[employeeId]) {
    console.log('Found specific skills for employee:', {
      employeeId,
      skillCount: employeeSkills[employeeId].length,
      skills: employeeSkills[employeeId].map(s => ({
        title: s.title,
        level: s.level,
        requirement: s.requirement,
        employeeId: s.employeeId
      }))
    });
    return employeeSkills[employeeId];
  }
  
  // Return empty array if no skills found
  console.log('No specific skills found for employee, returning empty array');
  return [];
};

// Export the loaded skills for verification
console.log('Loaded employee skills:', 
  Object.entries(employeeSkills).map(([id, skills]) => ({
    employeeId: id,
    skillCount: skills.length,
    skills: skills.map(s => ({
      title: s.title,
      category: s.category,
      level: s.level,
      requirement: s.requirement,
      employeeId: s.employeeId
    }))
  }))
);