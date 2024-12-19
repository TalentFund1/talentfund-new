import { UnifiedSkill } from '../../skills/types/SkillTypes';
import { getUnifiedSkillData } from '../../skills/data/skillDatabaseService';

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
  ].map(title => getUnifiedSkillData(title)),

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
  ].map(title => getUnifiedSkillData(title)),

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
  ].map(title => getUnifiedSkillData(title)),

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
  ].map(title => getUnifiedSkillData(title))
};

export const getEmployeeSkills = (employeeId: string): UnifiedSkill[] => {
  console.log('Getting skills for employee:', employeeId);
  const skills = employeeSkills[employeeId] || [];
  console.log('Retrieved skills:', skills);
  return skills;
};

// Initialize skills for a new employee
export const initializeEmployeeSkills = (employeeId: string, skills: string[]) => {
  console.log('Initializing skills for employee:', employeeId, skills);
  employeeSkills[employeeId] = skills.map(title => getUnifiedSkillData(title));
};

// Load initial skills for an employee
export const loadEmployeeSkills = (employeeId: string) => {
  console.log('Loading skills for employee:', employeeId);
  return getEmployeeSkills(employeeId);
};

// Export the loaded skills for verification
console.log('Loaded employee skills:', employeeSkills);