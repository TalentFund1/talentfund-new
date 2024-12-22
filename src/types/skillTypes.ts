export type SkillCategory = 'specialized' | 'common' | 'certification';
export type SkillWeight = 'critical' | 'technical' | 'necessary';

export type EmployeeSkillRequirement = 'skill_goal' | 'not_interested' | 'unknown';
export type RoleSkillRequirement = 'required' | 'preferred';

export interface BaseSkill {
  name: string;
  category?: SkillCategory;
  weight?: SkillWeight;
}

export interface UnifiedSkill extends BaseSkill {
  title: string;
  subcategory: string;
  level?: string;
  growth: string;
  confidence: string;
  requirement?: RoleSkillRequirement;
  category?: string;
  weight?: string;
}

export interface SkillState {
  level: string;
  requirement: EmployeeSkillRequirement;
}

export interface RoleSkillState {
  level: string;
  requirement: RoleSkillRequirement;
  id: string;
}

export interface RoleState {
  [skillName: string]: {
    [level: string]: RoleSkillState;
  };
}

export interface EmployeeSkillState {
  [skillName: string]: {
    level: string;
    requirement: EmployeeSkillRequirement;
  };
}