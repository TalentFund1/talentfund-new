import { SkillCategory, SkillWeight } from '../../skills/types/SkillTypes';

export interface EmployeeSkill {
  id: string;
  title: string;
  level: string;
  category: SkillCategory;
  subcategory: string;
  businessCategory?: string;
  weight?: SkillWeight;
  dateAcquired?: string;
  lastUpdated?: string;
}

export interface EmployeeSkillState {
  level: string;
  requirement: string;
}

export interface EmployeeSkillsData {
  skills: EmployeeSkill[];
  states: Record<string, EmployeeSkillState>;
}