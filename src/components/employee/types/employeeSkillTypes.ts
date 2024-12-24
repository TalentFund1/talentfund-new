import { SkillCategory, SkillWeight } from '../../skills/types/SkillTypes';

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'unspecified';
export type SkillGoalStatus = 'skill_goal' | 'not_interested' | 'unknown';

export interface EmployeeSkill {
  id: string;
  title: string;
  level: SkillLevel;
  goalStatus: SkillGoalStatus;
  lastUpdated: string;
  category?: SkillCategory;
  weight?: SkillWeight;
  subcategory?: string;
  businessCategory?: string;
  growth?: string;
  salary?: string;
  confidence?: 'low' | 'medium' | 'high';
  benchmarks?: {
    B: boolean;
    R: boolean;
    M: boolean;
    O: boolean;
  };
}

export interface EmployeeSkillsData {
  employeeId: string;
  skills: EmployeeSkill[];
}

export interface EmployeeSkillState {
  level: SkillLevel;
  requirement: SkillGoalStatus;
  lastUpdated: string;
}