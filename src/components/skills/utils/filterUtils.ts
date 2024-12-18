import { UnifiedSkill } from "../types/SkillTypes";

export const filterSkillsByType = (
  skills: UnifiedSkill[],
  skillType: string,
  selectedCategory: string
): UnifiedSkill[] => {
  console.log('Filtering skills by type:', { skillType, selectedCategory, skillsCount: skills.length });
  
  if (!skills) {
    console.warn('No skills provided to filter');
    return [];
  }

  let filteredSkills = [...skills];

  if (skillType !== 'all') {
    filteredSkills = filteredSkills.filter(skill => {
      if (skillType === 'technical') {
        return !skill.subcategory.toLowerCase().includes('soft');
      } else if (skillType === 'soft') {
        return skill.subcategory.toLowerCase().includes('soft');
      }
      return true;
    });
  }

  if (selectedCategory !== 'all') {
    filteredSkills = filteredSkills.filter(skill =>
      skill.subcategory.toLowerCase() === selectedCategory.toLowerCase()
    );
  }

  console.log('Filtered skills result:', filteredSkills.length);
  return filteredSkills;
};