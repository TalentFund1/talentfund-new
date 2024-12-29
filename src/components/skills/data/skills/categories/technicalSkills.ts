import { UnifiedSkill } from '../../../types/SkillTypes';
import { aiSkills } from './technical/aiSkills';
import { webSkills } from './technical/webSkills';
import { devopsSkills } from './technical/devopsSkills';

export const technicalSkills: UnifiedSkill[] = [
  ...aiSkills,
  ...webSkills,
  ...devopsSkills
];