import { SkillCategory, SkillWeight, SkillRequirement } from '../../skills/types/SkillTypes';

export interface EmployeeSkill {
  id: string;
  title: string;
  level: string;
  category: SkillCategory;
  subcategory: string;
  businessCategory?: string;
  weight?: SkillWeight;
  requirement?: SkillRequirement;
  growth: string;
  salary: string;
  confidence: 'low' | 'medium' | 'high';
  benchmarks: {
    B: boolean;
    R: boolean;
    M: boolean;
    O: boolean;
  };
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