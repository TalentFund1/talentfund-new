import { categorizeSkills } from "../../skills/competency/skillCategories";
import { getSkillProfileId } from "../../EmployeeTable";
import { useSkillsMatrixStore } from "../../benchmark/skills-matrix/SkillsMatrixState";
import { getUnifiedSkillData } from "../../skills/data/skillDatabaseService";
import { SkillState } from "../../skills/competency/state/types";

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
  
  const processedSkills = skillsList.map(skillTitle => {
    const unifiedData = getUnifiedSkillData(skillTitle);
    return {
      ...unifiedData,
      level: 'unspecified',
      goalStatus: 'unknown',
      lastUpdated: new Date().toISOString()
    };
  });
  
  processedSkills.forEach(skill => {
    const initialState: Partial<SkillState> = {
      level: 'unspecified',
      required: 'preferred',
      goalStatus: 'unknown'
    };
    skillsMatrixStore.setSkillState(skill.title, initialState);
    console.log('Initialized skill:', {
      skill: skill.title,
      level: 'unspecified',
      goalStatus: 'unknown'
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
    categorizedSkills,
    processedSkills
  };
};