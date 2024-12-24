import { SkillCategory, SkillWeight } from '../../skills/types/SkillTypes';

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'unspecified';
export type SkillGoalStatus = 'skill_goal' | 'not_interested' | 'unknown';

export interface EmployeeSkill {
  id: string;
  title: string;
  subcategory: string; // Made required to match UnifiedSkill
  level: SkillLevel;
  goalStatus: SkillGoalStatus;
  lastUpdated: string;
  category: SkillCategory; // Made required
  weight: SkillWeight; // Made required
  businessCategory: string;
  growth: string;
  salary: string;
  confidence: 'low' | 'medium' | 'high';
  benchmarks: {
    B: boolean;
    R: boolean;
    M: boolean;
    O: boolean;
  };
}

export interface EmployeeSkillsData {
  employeeId: string;
  skills: EmployeeSkill[];
  states: Record<string, EmployeeSkillState>; // Added states
}

export interface EmployeeSkillState {
  level: SkillLevel;
  requirement: SkillGoalStatus;
  lastUpdated: string;
}