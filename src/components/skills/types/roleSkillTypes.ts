import { SkillLevel, SkillGoalStatus } from './sharedSkillTypes';
import { UnifiedSkill } from './SkillTypes';

export interface RoleSkill extends UnifiedSkill {
  level: SkillLevel;
  goalStatus?: SkillGoalStatus;
}

export interface RoleSkillRequirement {
  title: string;
  level: SkillLevel;
  required: boolean;
}