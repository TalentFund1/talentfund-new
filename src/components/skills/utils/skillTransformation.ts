import { UnifiedSkill } from '../types/SkillTypes';
import { getUnifiedSkillData } from '../data/skillDatabaseService';

export const transformToUnifiedSkill = (skill: { title: string }): UnifiedSkill => {
  const unifiedSkill = getUnifiedSkillData(skill.title);
  console.log('Transforming skill:', {
    title: skill.title,
    original: unifiedSkill.benchmarks,
  });
  
  return {
    ...unifiedSkill,
    benchmarks: {
      B: unifiedSkill.benchmarks?.B || false,
      R: true, // Required benchmark
      M: true, // Market benchmark
      O: unifiedSkill.benchmarks?.O || false
    }
  };
};