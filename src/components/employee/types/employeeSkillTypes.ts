import { SkillCategory, SkillWeight } from '../../skills/types/SkillTypes';

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
  lastUpdated: string;
}

export interface EmployeeSkillState {
  level: string;
  requirement: 'required' | 'preferred' | 'not_interested' | 'unknown';
  lastUpdated: string;
}

export interface EmployeeSkillsData {
  skills: EmployeeSkill[];
  states: Record<string, EmployeeSkillState>;
}