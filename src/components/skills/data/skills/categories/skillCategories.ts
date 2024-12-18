import { SkillCategory } from '../../../types/SkillTypes';
import { normalizeSkillTitle } from '../../../utils/normalization';

const specializedSkills = new Set([
  'Machine Learning',
  'Deep Learning',
  'Natural Language Processing',
  'Computer Vision',
  'TensorFlow',
  'Node.js',
  'API Development',
  'Database Design',
  'System Architecture',
  'Kubernetes',
  'React',
  'TypeScript',
  'Next.js',
  'CSS/SASS',
  'Performance Optimization'
]);

const certificationSkills = new Set([
  'AWS Certified Solutions Architect',
  'Kubernetes Administrator (CKA)',
  'AWS Certified Machine Learning - Specialty',
  'TensorFlow Developer Certificate',
  'Project Management Professional (PMP)',
  'Certified Scrum Master (CSM)'
]);

export const getSkillCategory = (skillTitle: string): SkillCategory => {
  const normalizedTitle = normalizeSkillTitle(skillTitle);
  
  if (specializedSkills.has(normalizedTitle)) {
    return 'specialized';
  }
  
  if (certificationSkills.has(normalizedTitle)) {
    return 'certification';
  }
  
  return 'common';
};

export const isSpecializedSkill = (skillTitle: string): boolean => {
  return getSkillCategory(skillTitle) === 'specialized';
};

export const isCommonSkill = (skillTitle: string): boolean => {
  return getSkillCategory(skillTitle) === 'common';
};

export const isCertificationSkill = (skillTitle: string): boolean => {
  return getSkillCategory(skillTitle) === 'certification';
};

export const categorizeSkills = (skills: string[]) => {
  console.log('Categorizing skills:', skills);
  
  const categories = skills.reduce((acc, skill) => {
    const category = getSkillCategory(skill);
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {} as Record<SkillCategory, number>);

  console.log('Categorization results:', categories);

  return {
    all: skills.length,
    specialized: categories.specialized || 0,
    common: categories.common || 0,
    certification: categories.certification || 0
  };
};