import { roleSkills } from '../../skills/data/roleSkills';

export const filterSkillsByCategory = (skills: any[], category: string) => {
  if (category === "all") {
    return skills;
  }

  // Get all role skills for proper categorization
  const allRoleSkills = Object.values(roleSkills).reduce((acc, role) => {
    if (category === 'specialized') {
      acc.push(...role.specialized.map(s => s.title));
    } else if (category === 'common') {
      acc.push(...role.common.map(s => s.title));
    } else if (category === 'certification') {
      acc.push(...role.certifications.map(s => s.title));
    }
    return acc;
  }, [] as string[]);

  // Remove duplicates
  const uniqueRoleSkills = Array.from(new Set(allRoleSkills));

  console.log(`Filtering skills by category ${category}:`, {
    totalSkills: skills.length,
    categorySkills: uniqueRoleSkills.length
  });

  return skills.filter(skill => {
    const isInCategory = uniqueRoleSkills.includes(skill.title);
    
    if (isInCategory) {
      console.log(`Skill "${skill.title}" categorized as ${category}`);
    }
    
    return isInCategory;
  });
};

export const getCategoryCount = (skills: any[], category: string) => {
  return filterSkillsByCategory(skills, category).length;
};

export const categorizeSkill = (skillName: string): string => {
  // Check each role's skill categories
  for (const role of Object.values(roleSkills)) {
    if (role.specialized.some(s => s.title === skillName)) {
      console.log(`${skillName} found in specialized skills`);
      return 'specialized';
    }
    if (role.common.some(s => s.title === skillName)) {
      console.log(`${skillName} found in common skills`);
      return 'common';
    }
    if (role.certifications.some(s => s.title === skillName)) {
      console.log(`${skillName} found in certifications`);
      return 'certification';
    }
  }
  
  // Default to common if not found
  console.log(`${skillName} not found in any category, defaulting to common`);
  return 'common';
};