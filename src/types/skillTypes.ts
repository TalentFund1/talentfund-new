export type SkillCategory = 'specialized' | 'common' | 'certification';
export type SkillWeight = 'critical' | 'technical' | 'necessary';
export type SkillRequirement = 'required' | 'preferred' | 'skill_goal' | 'not_interested' | 'unknown';

export interface BaseSkill {
  id: string;
  title: string;
  subcategory: string;
  category: SkillCategory;
  businessCategory: string;
  weight: SkillWeight;
  level: string;
  growth: string;
  salary: string;
  confidence: string;
  benchmarks?: { B: boolean; R: boolean; M: boolean; O: boolean };
}

export interface UnifiedSkill extends BaseSkill {
  requirement?: SkillRequirement;
}

export interface SkillState {
  id: string;
  level: string;
  requirement: SkillRequirement;
}

export interface RoleState {
  [skillName: string]: {
    [level: string]: SkillState;
  };
}

export interface RoleSkillData {
  title: string;
  soc?: string;
  function?: string;
  mappedTitle?: string;
  occupation?: string;
  description?: string;
  roleTrack?: string;
  specialized: UnifiedSkill[];
  common: UnifiedSkill[];
  certifications: UnifiedSkill[];
  skills: UnifiedSkill[];
}