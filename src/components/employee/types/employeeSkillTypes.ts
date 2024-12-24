import { SkillCategory, SkillWeight } from '../../skills/types/SkillTypes';

export type SkillRequirement = 'required' | 'preferred' | 'not_interested' | 'unknown';

export interface EmployeeSkill {
  id: string;
  title: string;
  subcategory: string;
  category: SkillCategory;
  businessCategory: string;
  weight: SkillWeight;
  level: string;
  growth: string;
  salary: string;
  confidence: 'low' | 'medium' | 'high';
  requirement?: SkillRequirement;
  lastUpdated: string;
  benchmarks: {
    B: boolean;
    R: boolean;
    M: boolean;
    O: boolean;
  };
}

export interface EmployeeSkillState {
  level: string;
  requirement: SkillRequirement;
  lastUpdated: string;
}

export interface EmployeeSkillsData {
  skills: EmployeeSkill[];
  states: Record<string, EmployeeSkillState>;
}