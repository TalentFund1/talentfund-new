import { UnifiedSkill } from "../../skills/types/SkillTypes";
import { employeeSkills } from "./data/employeeSkillsData";

// Create a Map to store employee skills
const employeeSkillsMap = new Map<string, UnifiedSkill[]>();

export const getEmployeeSkills = (employeeId: string): UnifiedSkill[] => {
  // If skills are already in the map, return them
  if (employeeSkillsMap.has(employeeId)) {
    return employeeSkillsMap.get(employeeId) || [];
  }

  // Otherwise, get initial skills from employeeSkills
  const initialSkills = employeeSkills[employeeId as keyof typeof employeeSkills] || [];
  employeeSkillsMap.set(employeeId, initialSkills);
  
  console.log('Loaded initial skills for employee:', {
    employeeId,
    skillCount: initialSkills.length
  });

  return initialSkills;
};

// Add function to update employee skills
export const updateEmployeeSkills = (employeeId: string, skills: UnifiedSkill[]) => {
  employeeSkillsMap.set(employeeId, skills);
  console.log('Updated skills for employee:', {
    employeeId,
    newSkillCount: skills.length
  });
};
