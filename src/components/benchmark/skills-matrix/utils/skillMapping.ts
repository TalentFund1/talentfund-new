import { UnifiedSkill, SkillRequirement } from '../../../skills/types/SkillTypes';
import { getUnifiedSkillData } from '../../../skills/data/skillDatabaseService';
import { MappedSkill } from '../types/skillMatrixTypes';

export const mapSkillWithState = (
  skill: UnifiedSkill, 
  currentState: { level?: string; requirement?: SkillRequirement } | undefined
): MappedSkill => {
  const universalSkillData = getUnifiedSkillData(skill.title);
  
  return {
    ...universalSkillData,
    level: currentState?.level || skill.level || 'unspecified',
    requirement: (currentState?.requirement || skill.requirement || 'preferred') as SkillRequirement,
    roleLevel: null as any,
    isCompanySkill: false,
    id: universalSkillData.id,
    title: universalSkillData.title,
    subcategory: universalSkillData.subcategory,
    category: universalSkillData.category,
    businessCategory: universalSkillData.businessCategory,
    weight: universalSkillData.weight,
    growth: universalSkillData.growth,
    salary: universalSkillData.salary,
    confidence: universalSkillData.confidence,
    benchmarks: universalSkillData.benchmarks
  };
};