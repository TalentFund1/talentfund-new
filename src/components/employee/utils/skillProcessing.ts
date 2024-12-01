import { categorizeSkills } from "../../skills/competency/skillCategories";
import { getSkillProfileId } from "../../EmployeeTable";

export const processEmployeeSkills = (skills: string, role: string) => {
  // Convert comma-separated string to array and clean up
  const skillsList = skills
    .split(',')
    .map(skill => skill.trim())
    .filter(skill => skill.length > 0);

  // Get role ID for categorization
  const roleId = getSkillProfileId(role);
  
  // Categorize skills
  const categorizedSkills = categorizeSkills(skillsList, roleId);

  return {
    skillsList,
    categorizedSkills
  };
};