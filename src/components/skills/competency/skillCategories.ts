import { Skills } from '../data/skills/allSkills';

export const isSpecializedSkill = (skill: string): boolean => {
  const skillData = Skills.all.find(s => s.title.toLowerCase() === skill.toLowerCase());
  return skillData?.category === 'specialized';
};

export const isCommonSkill = (skill: string): boolean => {
  const skillData = Skills.all.find(s => s.title.toLowerCase() === skill.toLowerCase());
  return skillData?.category === 'common';
};

export const isCertificationSkill = (skill: string): boolean => {
  const skillData = Skills.all.find(s => s.title.toLowerCase() === skill.toLowerCase());
  return skillData?.category === 'certification';
};

export const categorizeSkills = (skills: string[]) => {
  console.log('Categorizing skills using universal database');
  
  const categorized = skills.reduce((acc, skill) => {
    const skillData = Skills.all.find(s => s.title.toLowerCase() === skill.toLowerCase());
    if (skillData) {
      acc[skillData.category]++;
    } else {
      console.warn(`Skill not found in universal database: ${skill}`);
      acc.common++; // Default to common if not found
    }
    return acc;
  }, {
    all: skills.length,
    specialized: 0,
    common: 0,
    certification: 0
  });
  
  console.log('Categorization results:', categorized);
  return categorized;
};

// Add new export for single skill categorization
export const categorizeSkill = (skill: string): 'specialized' | 'common' | 'certification' => {
  console.log('Categorizing skill:', skill);
  
  const skillData = Skills.all.find(s => s.title.toLowerCase() === skill.toLowerCase());
  if (skillData) {
    console.log(`Found skill category in universal database: ${skillData.category}`);
    return skillData.category;
  }
  
  console.warn(`Skill not found in universal database: ${skill}, defaulting to common`);
  return 'common';
};

console.log('Skill categorization utilities initialized - using universal database only');