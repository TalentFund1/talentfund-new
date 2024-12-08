import { skillsDatabase, getAllSkills, Skill } from './skills/data/skillsDatabase';
import { getEmployeeSkills } from "./benchmark/skills-matrix/initialSkills";
import { roleSkills } from "./skills/data/roleSkills";

// Initialize skills after roleSkills is imported
const matrixSkills = getAllSkills().map(skill => skill.title);

// Split skills into technical and soft skills based on centralized database
export const technicalSkills = getAllSkills()
  .filter(skill => skill.category === 'technical' || skill.category === 'critical')
  .map(skill => skill.title);

export const softSkills = getAllSkills()
  .filter(skill => skill.category === 'necessary')
  .map(skill => skill.title);

// Universal skill categorization mapping
export const skillCategorization = Object.fromEntries(
  getAllSkills().map(skill => [
    skill.title,
    {
      category: skill.category === 'necessary' ? 'common' : 'specialized',
      subcategory: skill.subcategory
    }
  ])
);

export const getSkillCategorization = (skillTitle: string) => {
  const defaultCategorization = {
    category: "common",
    subcategory: "General Skills"
  };

  return skillCategorization[skillTitle] || defaultCategorization;
};

// Export matrixSkills after initialization
export { matrixSkills };