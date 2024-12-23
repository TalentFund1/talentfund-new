import { categorizeSkills } from "../../skills/competency/skillCategories";
import { getSkillProfileId } from "../../EmployeeTable";
import { useSkillsMatrixStore } from "../../benchmark/skills-matrix/SkillsMatrixState";
import { getUnifiedSkillData } from "../../skills/data/skillDatabaseService";

export const processEmployeeSkills = (skills: string, role: string) => {
  // Convert comma-separated string to array and clean up
  const skillsList = skills
    .split(',')
    .map(skill => skill.trim())
    .filter(skill => skill.length > 0);

  // Get role ID for categorization
  const roleId = getSkillProfileId(role);
  
  // Initialize skills with default values
  const skillsMatrixStore = useSkillsMatrixStore.getState();
  
  skillsList.forEach(skillTitle => {
    const skillData = getUnifiedSkillData(skillTitle);
    skillsMatrixStore.initializeState(skillTitle, skillData.id, 'unspecified', 'unknown');
    console.log('Initialized skill:', {
      skill: skillTitle,
      level: 'unspecified',
      requirement: 'unknown'
    });
  });
  
  // Categorize skills
  const categorizedSkills = categorizeSkills(skillsList, roleId);

  console.log('Processed and categorized skills:', {
    roleId,
    totalSkills: skillsList.length,
    categories: categorizedSkills
  });

  return {
    skillsList,
    categorizedSkills
  };
};