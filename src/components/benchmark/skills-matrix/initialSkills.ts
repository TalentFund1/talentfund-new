import { UnifiedSkill } from '../../skills/types/SkillTypes';
import { Employee } from '../../types/employeeTypes';

// Initial employee skills mapping
const initialEmployeeSkills: { [key: string]: string[] } = {
  "123": [
    "Machine Learning",
    "Deep Learning"
  ],
  "124": [
    "Node.js",
    "Database Design",
    "API Development"
  ],
  "125": [
    "React"
  ],
  "126": [
    "Team Leadership"
  ]
};

export const getInitialSkills = (id: string): string[] => {
  console.log('Getting initial skills for employee:', id);
  return initialEmployeeSkills[id] || [];
};

export const getEmployeeSkills = (id: string): UnifiedSkill[] => {
  console.log('Getting skills for employee:', id);
  // This will now be handled by the store
  return [];
};

export const getEmployeeSkillLevel = (employeeId: string, skillTitle: string): string => {
  return 'unspecified';
};

export const getEmployeeSkillRequirement = (employeeId: string, skillTitle: string): string => {
  return 'unknown';
};