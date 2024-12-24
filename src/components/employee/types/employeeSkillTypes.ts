import { SkillCategory, SkillWeight } from '../../skills/types/SkillTypes';

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'unspecified';
export type SkillGoalStatus = 'required' | 'preferred' | 'not_interested' | 'unknown' | 'skill_goal';

export interface EmployeeSkillState {
  level: SkillLevel;
  goalStatus: SkillGoalStatus;
  lastUpdated: string;
}

export interface EmployeeSkill {
  id: string;
  employeeId: string;
  title: string;
  subcategory: string;
  level: SkillLevel;
  goalStatus: SkillGoalStatus;
  lastUpdated: string;
  weight: SkillWeight;
  confidence: 'low' | 'medium' | 'high';
  category: SkillCategory;
  businessCategory: string;
  growth: string;
  salary: string;
  benchmarks: {
    B: boolean;
    R: boolean;
    M: boolean;
    O: boolean;
  };
}

export type EmployeeSkillAchievement = EmployeeSkill;

export interface EmployeeSkillsData {
  employeeId: string;
  skills: EmployeeSkill[];
  states: Record<string, EmployeeSkillState>;
  lastUpdated?: string;
}

export interface EmployeeSkillsStore {
  employeeSkills: Record<string, EmployeeSkillsData>;
  initializeEmployeeSkills: (employeeId: string) => void;
  setSkillLevel: (employeeId: string, skillTitle: string, level: SkillLevel) => void;
  setSkillGoalStatus: (employeeId: string, skillTitle: string, status: SkillGoalStatus) => void;
  getEmployeeSkills: (employeeId: string) => EmployeeSkill[];
  getSkillState: (employeeId: string, skillTitle: string) => EmployeeSkillState;
  batchUpdateSkills: (employeeId: string, updates: Record<string, EmployeeSkillState>) => void;
}