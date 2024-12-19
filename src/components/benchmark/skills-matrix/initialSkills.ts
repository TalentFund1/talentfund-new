import { UnifiedSkill } from '../../skills/types/SkillTypes';
import { getUnifiedSkillData } from '../../skills/data/skillDatabaseService';
import { getSkillCategory } from '../../skills/data/skills/categories/skillCategories';
import { normalizeSkillTitle } from '../../skills/utils/normalization';
import { Skills, getAllSkills } from '../../skills/data/skills/allSkills';

// Initialize with all available skills from the universal database
const allAvailableSkills = getAllSkills().map(skill => ({
  ...skill,
  title: normalizeSkillTitle(skill.title),
  category: getSkillCategory(skill.title)
}));

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
  // If employee doesn't have skills initialized, return all available skills
  if (!employeeSkills[employeeId]) {
    console.log('No specific skills found for employee, returning all available skills');
    return allAvailableSkills;
  }
  
  // Get employee's specific skills
  const specificSkills = employeeSkills[employeeId];
  
  // Get all skills that aren't already in the employee's specific skills
  const missingSkills = allAvailableSkills.filter(skill => 
    !specificSkills.some(s => normalizeSkillTitle(s.title) === normalizeSkillTitle(skill.title))
  );
  
  // Combine specific and missing skills
  const combinedSkills = [...specificSkills, ...missingSkills];
  
  console.log('Retrieved skills with full metadata:', {
    employeeId,
    specificSkillsCount: specificSkills.length,
    missingSkillsCount: missingSkills.length,
    totalSkills: combinedSkills.length
  });
  
  return combinedSkills;
};

// Initialize skills for a new employee
export const initializeEmployeeSkills = (employeeId: string, skills: string[]) => {
  console.log('Initializing skills for employee:', employeeId, skills);
  
  // Ensure all skills exist in the database
  const validatedSkills = skills.map(title => {
    const normalizedTitle = normalizeSkillTitle(title);
    const skillData = getUnifiedSkillData(normalizedTitle);
    return {
      ...skillData,
      title: normalizedTitle,
      category: getSkillCategory(normalizedTitle)
    };
  });

  // Add any missing skills from the matrix
  const existingSkillTitles = new Set(validatedSkills.map(s => s.title.toLowerCase()));
  const missingSkills = allAvailableSkills.filter(
    skill => !existingSkillTitles.has(skill.title.toLowerCase())
  );

  employeeSkills[employeeId] = [...validatedSkills, ...missingSkills];
  console.log('Initialized employee skills:', {
    employeeId,
    totalSkills: employeeSkills[employeeId].length,
    validatedSkills: validatedSkills.length,
    addedMissingSkills: missingSkills.length
  });
};

// Load initial skills for an employee
export const loadEmployeeSkills = (employeeId: string) => {
  console.log('Loading skills for employee:', employeeId);
  if (!employeeSkills[employeeId]) {
    // Initialize with all available skills if none exist
    initializeEmployeeSkills(employeeId, []);
  }
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