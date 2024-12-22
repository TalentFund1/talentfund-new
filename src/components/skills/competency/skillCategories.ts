import { UnifiedSkill } from '../../../types/skillTypes';
import { getUnifiedSkillData } from '../data/skillDatabaseService';
import { roleSkills } from '../data/roleSkills';

export const getSkillCategory = (skillTitle: string): string => {
  console.log('Getting category for skill:', skillTitle);
  const skillData = getUnifiedSkillData(skillTitle);
  
  if (!skillData) {
    console.warn(`No unified data found for skill: ${skillTitle}`);
    return 'common'; // Default fallback
  }

  return skillData.category || 'common';
};

export const filterSkillsByCategory = (
  skills: UnifiedSkill[],
  selectedCategory: string,
  roleId: string = "123"
) => {
  console.log('Filtering skills by category:', {
    totalSkills: skills.length,
    selectedCategory,
    roleId
  });

  if (selectedCategory === "all") return skills;

  const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills];
  if (!currentRoleSkills) {
    console.warn('No role skills found for roleId:', roleId);
    return skills;
  }

  const filteredSkills = skills.filter(skill => {
    const category = getSkillCategory(skill.title);
    const matches = category === selectedCategory;
    
    console.log('Checking skill category:', {
      skill: skill.title,
      category,
      selectedCategory,
      matches
    });
    
    return matches;
  });

  console.log('Filtered skills result:', {
    category: selectedCategory,
    totalFiltered: filteredSkills.length,
    skills: filteredSkills.map(s => s.title)
  });

  return filteredSkills;
};

export const categorizeSkills = (skills: string[], profileId: string) => {
  console.log('Categorizing skills for profile:', profileId);
  
  const categorizedSkills = skills.reduce((acc, skill) => {
    const category = getSkillCategory(skill);
    
    console.log('Categorizing skill:', {
      skill,
      category,
      profileId
    });
    
    switch (category) {
      case 'specialized':
        acc.specialized++;
        break;
      case 'common':
        acc.common++;
        break;
      case 'certification':
        acc.certification++;
        break;
    }
    acc.all++;
    return acc;
  }, {
    all: 0,
    specialized: 0,
    common: 0,
    certification: 0
  });

  console.log('Categorization results:', categorizedSkills);
  
  return categorizedSkills;
};

// Add new export for single skill categorization
export const categorizeSkill = (skill: string, profileId: string): 'specialized' | 'common' | 'certification' => {
  console.log('Categorizing single skill:', {
    skill,
    profileId
  });
  
  const category = getSkillCategory(skill);
  console.log('Category determined:', category);
  
  return category as 'specialized' | 'common' | 'certification';
};