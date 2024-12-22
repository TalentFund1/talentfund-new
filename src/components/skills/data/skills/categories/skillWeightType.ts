import { UnifiedSkill } from '../../../types/SkillTypes';

export type SkillWeight = 'critical' | 'technical' | 'necessary';
export type SkillType = 'specialized' | 'common' | 'certification';

const weightPatterns: Record<SkillWeight, RegExp[]> = {
  critical: [
    /aws/i,
    /machine learning/i,
    /deep learning/i,
    /ai/i,
    /cloud/i
  ],
  technical: [
    /development/i,
    /programming/i,
    /engineering/i,
    /architecture/i
  ],
  necessary: []  // Default category
};

export const getSkillWeight = (skill: UnifiedSkill): SkillWeight => {
  console.log('Determining weight for skill:', skill.title);

  // Check explicit critical skills
  if (skill.category === 'certification' || 
      skill.subcategory?.toLowerCase().includes('cloud') ||
      skill.subcategory?.toLowerCase().includes('ai & ml')) {
    return 'critical';
  }

  // Check patterns
  for (const [weight, patterns] of Object.entries(weightPatterns)) {
    if (patterns.some(pattern => pattern.test(skill.title))) {
      return weight as SkillWeight;
    }
  }

  // Default to necessary
  return 'necessary';
};

export const getSkillType = (skill: UnifiedSkill): SkillType => {
  console.log('Determining type for skill:', skill.title);
  
  if (skill.subcategory?.toLowerCase().includes('certification')) {
    return 'certification';
  }
  
  if (skill.subcategory?.toLowerCase().includes('ai & ml') ||
      skill.subcategory?.toLowerCase().includes('backend') ||
      skill.subcategory?.toLowerCase().includes('frontend')) {
    return 'specialized';
  }
  
  return 'common';
};

export const getWeightColor = (weight: SkillWeight): string => {
  switch (weight) {
    case 'critical':
      return 'bg-red-100 text-red-800';
    case 'technical':
      return 'bg-blue-100 text-blue-800';
    case 'necessary':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getTypeColor = (type: SkillType): string => {
  switch (type) {
    case 'specialized':
      return 'bg-blue-100 text-blue-800';
    case 'certification':
      return 'bg-purple-100 text-purple-800';
    case 'common':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};