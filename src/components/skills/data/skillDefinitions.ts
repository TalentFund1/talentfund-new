import { UnifiedSkill } from '../../types/SkillTypes';
import { aiSkills } from './categories/aiSkills';
import { developmentSkills } from './categories/developmentSkills';
import { frontendSkills } from './categories/frontendSkills';
import { softSkills } from './categories/softSkills';
import { certificationSkills } from './categories/certificationSkills';

export const skillDefinitions: UnifiedSkill[] = [
  ...aiSkills,
  ...developmentSkills,
  ...frontendSkills,
  ...softSkills,
  ...certificationSkills
].map(skill => ({
  ...skill,
  category: determineCategory(skill)
}));

function determineCategory(skill: UnifiedSkill): 'specialized' | 'common' | 'certification' {
  // Certifications are always in the certification category
  if (skill.subcategory?.toLowerCase().includes('certification')) {
    return 'certification';
  }

  // Technical skills are specialized
  if (
    skill.businessCategory === 'Information Technology' ||
    skill.businessCategory === 'AI & Machine Learning' ||
    skill.weight === 'critical' ||
    skill.weight === 'technical'
  ) {
    return 'specialized';
  }

  // Everything else is common
  return 'common';
}

console.log('Initialized universal skills database:', {
  totalSkills: skillDefinitions.length,
  categories: {
    specialized: skillDefinitions.filter(s => s.category === 'specialized').length,
    common: skillDefinitions.filter(s => s.category === 'common').length,
    certification: skillDefinitions.filter(s => s.category === 'certification').length
  }
});

// Helper functions
export const getSkillByTitle = (title: string): UnifiedSkill | undefined => {
  return skillDefinitions.find(
    skill => skill.title.toLowerCase() === title.toLowerCase()
  );
};

export const getSkillsByCategory = (category: string): UnifiedSkill[] => {
  return skillDefinitions.filter(skill => skill.category === category);
};

export const getSkillCategory = (title: string): UnifiedSkill['category'] => {
  const skill = getSkillByTitle(title);
  return skill?.category || 'common';
};