import { UnifiedSkill } from '../../skills/types/SkillTypes';
import { getUnifiedSkillData } from '../../skills/data/skillDatabaseService';
import { normalizeSkillTitle } from '../../skills/utils/normalization';
import { getSkillCategory } from '../../skills/data/skills/categories/skillCategories';
import { roleSkills } from '../../skills/data/roleSkills';

// Define initial skills for each employee based on their role
export const getEmployeeSkills = (employeeId: string): UnifiedSkill[] => {
  console.log('Getting initial skills for employee:', employeeId);
  
  // Get role ID based on employee ID
  const roleId = employeeId;
  const roleData = roleSkills[roleId as keyof typeof roleSkills];
  
  if (!roleData) {
    console.warn('No role data found for employee:', employeeId);
    return [];
  }

  // Combine all skills for the role
  const allSkills = [
    ...roleData.specialized,
    ...roleData.common,
    ...roleData.certifications
  ].map(skill => {
    const normalizedTitle = normalizeSkillTitle(skill.title);
    const skillData = getUnifiedSkillData(normalizedTitle);
    
    console.log('Initializing skill for employee:', {
      employeeId,
      skill: normalizedTitle,
      category: getSkillCategory(normalizedTitle)
    });
    
    return {
      ...skillData,
      title: normalizedTitle,
      category: getSkillCategory(normalizedTitle),
      level: 'unspecified',
      requirement: 'preferred'
    };
  });

  return allSkills;
};

// Helper function to get skill level for an employee
export const getEmployeeSkillLevel = (employeeId: string, skillTitle: string): string => {
  const skills = getEmployeeSkills(employeeId);
  const skill = skills.find(s => s.title === skillTitle);
  return skill?.level || 'unspecified';
};

// Helper function to get skill requirement for an employee
export const getEmployeeSkillRequirement = (employeeId: string, skillTitle: string): string => {
  const skills = getEmployeeSkills(employeeId);
  const skill = skills.find(s => s.title === skillTitle);
  return skill?.requirement || 'preferred';
};