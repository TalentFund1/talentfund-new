import { categorizeSkills } from "../../skills/competency/skillCategories";
import { getSkillProfileId } from "../../EmployeeTable";
import { useEmployeeSkillsStore } from "../store/employeeSkillsStore";
import { getUnifiedSkillData } from "../../skills/data/skillDatabaseService";

export const processEmployeeSkills = (skills: string, role: string) => {
  const skillsList = skills
    .split(',')
    .map(skill => skill.trim())
    .filter(skill => skill.length > 0);

  const roleId = getSkillProfileId(role);
  const employeeStore = useEmployeeSkillsStore.getState();
  
  const processedSkills = skillsList.map(skillTitle => {
    const unifiedData = getUnifiedSkillData(skillTitle);
    return {
      ...unifiedData,
      level: 'unspecified',
      requirement: 'unknown',
      lastUpdated: new Date().toISOString()
    };
  });
  
  processedSkills.forEach(skill => {
    employeeStore.setSkillLevel(role, skill.title, 'unspecified');
    console.log('Initialized skill:', {
      skill: skill.title,
      level: 'unspecified',
      requirement: 'unknown'
    });
  });
  
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