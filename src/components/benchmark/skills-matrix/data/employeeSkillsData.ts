import { UnifiedSkill } from '../../../skills/types/SkillTypes';
import { getUnifiedSkillData } from '../../../skills/data/skillDatabaseService';
import { normalizeSkillTitle } from '../../../skills/utils/normalization';
import { getSkillCategory } from '../../../skills/data/skills/categories/skillCategories';

// Define initial skills for each employee based on their role
export const employeeSkills: { [key: string]: UnifiedSkill[] } = {
  "123": [
    "Machine Learning",
    "Deep Learning", 
    "Natural Language Processing",
    "Computer Vision",
    "TensorFlow",
    "Python",
    "Problem Solving",
    "Technical Writing",
    "Git Version Control",
    "Communication"
  ].map(title => {
    const normalizedTitle = normalizeSkillTitle(title);
    const skillData = getUnifiedSkillData(normalizedTitle);
    console.log('Loading AI Engineer skill:', {
      title: normalizedTitle,
      category: getSkillCategory(normalizedTitle)
    });
    return {
      ...skillData,
      title: normalizedTitle,
      category: getSkillCategory(normalizedTitle),
      level: 'intermediate',  // Set default level
      requirement: 'required' // Set default requirement
    };
  }),

  "124": [
    "Node.js",
    "Database Design",
    "API Development", 
    "System Architecture",
    "Kubernetes",
    "Problem Solving",
    "Code Review",
    "Agile Methodologies",
    "Git Version Control",
    "Communication"
  ].map(title => {
    const normalizedTitle = normalizeSkillTitle(title);
    const skillData = getUnifiedSkillData(normalizedTitle);
    console.log('Loading Backend Engineer skill:', {
      title: normalizedTitle,
      category: getSkillCategory(normalizedTitle)
    });
    return {
      ...skillData,
      title: normalizedTitle,
      category: getSkillCategory(normalizedTitle),
      level: 'intermediate',  // Set default level
      requirement: 'required' // Set default requirement
    };
  }),

  "125": [
    "React",
    "TypeScript",
    "Next.js",
    "CSS/SASS",
    "Performance Optimization",
    "Problem Solving",
    "Code Review",
    "Agile Methodologies",
    "Git Version Control",
    "Communication"
  ].map(title => {
    const normalizedTitle = normalizeSkillTitle(title);
    const skillData = getUnifiedSkillData(normalizedTitle);
    console.log('Loading Frontend Engineer skill:', {
      title: normalizedTitle,
      category: getSkillCategory(normalizedTitle)
    });
    return {
      ...skillData,
      title: normalizedTitle,
      category: getSkillCategory(normalizedTitle),
      level: 'intermediate',  // Set default level
      requirement: 'required' // Set default requirement
    };
  }),

  "126": [
    "System Design",
    "Technical Architecture",
    "Risk Management",
    "Team Leadership",
    "Project Management",
    "Strategic Planning",
    "Stakeholder Management",
    "Agile Methodologies",
    "Git Version Control",
    "Communication"
  ].map(title => {
    const normalizedTitle = normalizeSkillTitle(title);
    const skillData = getUnifiedSkillData(normalizedTitle);
    console.log('Loading Engineering Manager skill:', {
      title: normalizedTitle,
      category: getSkillCategory(normalizedTitle)
    });
    return {
      ...skillData,
      title: normalizedTitle,
      category: getSkillCategory(normalizedTitle),
      level: 'intermediate',  // Set default level
      requirement: 'required' // Set default requirement
    };
  })
};

// Export helper functions
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
        requirement: s.requirement
      }))
    });
    return employeeSkills[employeeId];
  }
  
  // Initialize with empty skills if none exist
  console.log('No specific skills found for employee, initializing empty skills array');
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
      requirement: s.requirement
    }))
  }))
);