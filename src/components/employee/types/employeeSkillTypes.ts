import { SkillCategory, SkillWeight, SkillRequirement } from '../../skills/types/SkillTypes';

export interface EmployeeSkill {
  id: string;
  title: string;
  level: string;
  category: SkillCategory;
  subcategory: string;
  businessCategory: string;
  weight: SkillWeight;
  requirement: SkillRequirement;
  dateAcquired?: string;
  lastUpdated?: string;
}

export interface EmployeeSkillState {
  level: string;
  requirement: SkillRequirement;
}

export interface EmployeeSkillsData {
  skills: EmployeeSkill[];
  states: Record<string, EmployeeSkillState>;
}

export interface EmployeeSkillUpdate {
  employeeId: string;
  skillTitle: string;
  level: string;
  requirement: SkillRequirement;
}