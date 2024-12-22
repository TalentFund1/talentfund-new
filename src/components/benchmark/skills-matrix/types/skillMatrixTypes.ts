import { SkillRequirement, UnifiedSkill } from '../../../skills/types/SkillTypes';

export interface SkillState {
  level: string;
  requirement: SkillRequirement;
}

export interface SkillsMatrixState {
  currentStates: { [key: string]: SkillState };
  originalStates: { [key: string]: SkillState };
  hasChanges: boolean;
  setSkillState: (skillTitle: string, level: string, requirement: SkillRequirement) => void;
  resetSkills: () => void;
  initializeState: (skillTitle: string, level: string, requirement: SkillRequirement) => void;
  saveChanges: () => void;
  cancelChanges: () => void;
}

export interface MappedSkill extends UnifiedSkill {
  level: string;
  requirement: SkillRequirement;
  roleLevel: any;
  isCompanySkill: boolean;
}