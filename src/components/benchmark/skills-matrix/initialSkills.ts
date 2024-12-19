import { UnifiedSkill } from '../../skills/types/SkillTypes';
import { getUnifiedSkillData } from '../../skills/data/skillDatabaseService';
import { getSkillCategory } from '../../skills/data/skills/categories/skillCategories';
import { normalizeSkillTitle } from '../../skills/utils/normalization';

// Define initial skills for each employee using the universal database
const employeeSkills: { [key: string]: UnifiedSkill[] } = {
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
    console.log('Loading employee skill from universal database:', {
      title: normalizedTitle,
      originalCategory: skillData.category,
      universalCategory: getSkillCategory(normalizedTitle),
      growth: skillData.growth,
      salary: skillData.salary
    });
    return {
      ...skillData,
      title: normalizedTitle,
      category: getSkillCategory(normalizedTitle)
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
    console.log('Loading employee skill from universal database:', {
      title: normalizedTitle,
      originalCategory: skillData.category,
      universalCategory: getSkillCategory(normalizedTitle),
      growth: skillData.growth,
      salary: skillData.salary
    });
    return {
      ...skillData,
      title: normalizedTitle,
      category: getSkillCategory(normalizedTitle)
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
    console.log('Loading employee skill from universal database:', {
      title: normalizedTitle,
      originalCategory: skillData.category,
      universalCategory: getSkillCategory(normalizedTitle),
      growth: skillData.growth,
      salary: skillData.salary
    });
    return {
      ...skillData,
      title: normalizedTitle,
      category: getSkillCategory(normalizedTitle)
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
    console.log('Loading employee skill from universal database:', {
      title: normalizedTitle,
      originalCategory: skillData.category,
      universalCategory: getSkillCategory(normalizedTitle),
      growth: skillData.growth,
      salary: skillData.salary
    });
    return {
      ...skillData,
      title: normalizedTitle,
      category: getSkillCategory(normalizedTitle)
    };
  })
};

export const getEmployeeSkills = (employeeId: string): UnifiedSkill[] => {
  console.log('Getting skills for employee:', employeeId);
  const skills = employeeSkills[employeeId] || [];
  console.log('Retrieved skills with full metadata:', skills.map(s => ({
    title: s.title,
    category: s.category,
    growth: s.growth,
    salary: s.salary
  })));
  return skills;
};

// Initialize skills for a new employee or update existing skills
export const initializeEmployeeSkills = (employeeId: string, skills: UnifiedSkill[], update: boolean = false) => {
  console.log('Initializing/updating skills for employee:', employeeId, skills);
  
  if (update && employeeSkills[employeeId]) {
    // Update existing skills
    skills.forEach(newSkill => {
      const existingSkillIndex = employeeSkills[employeeId].findIndex(
        skill => normalizeSkillTitle(skill.title) === normalizeSkillTitle(newSkill.title)
      );
      
      if (existingSkillIndex >= 0) {
        // Update existing skill
        employeeSkills[employeeId][existingSkillIndex] = {
          ...employeeSkills[employeeId][existingSkillIndex],
          ...newSkill
        };
      } else {
        // Add new skill
        employeeSkills[employeeId].push(newSkill);
      }
    });
  } else {
    // Initialize new skills array
    employeeSkills[employeeId] = skills.map(skill => ({
      ...skill,
      title: normalizeSkillTitle(skill.title),
      category: getSkillCategory(skill.title)
    }));
  }
  
  console.log('Updated employee skills:', {
    employeeId,
    skillCount: employeeSkills[employeeId].length,
    skills: employeeSkills[employeeId].map(s => ({
      title: s.title,
      level: s.level,
      requirement: s.requirement
    }))
  });
};

// Load initial skills for an employee
export const loadEmployeeSkills = (employeeId: string) => {
  console.log('Loading skills for employee:', employeeId);
  return getEmployeeSkills(employeeId);
};

// Export the loaded skills for verification
console.log('Loaded employee skills with full metadata:', 
  Object.entries(employeeSkills).map(([id, skills]) => ({
    employeeId: id,
    skillCount: skills.length,
    skills: skills.map(s => ({
      title: s.title,
      category: s.category,
      growth: s.growth,
      salary: s.salary
    }))
  }))
);