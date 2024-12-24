import { SkillWeight } from '../../skills/types/SkillTypes';
import { EmployeeStore } from '../../types/storeTypes';

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'unspecified';
export type SkillGoalStatus = 'required' | 'preferred' | 'not_interested' | 'unknown' | 'skill_goal';

export interface EmployeeSkillState {
  level: SkillLevel;
  requirement: SkillGoalStatus;
  lastUpdated: string;
}

export interface EmployeeSkillAchievement {
  id: string;
  employeeId: string;
  title: string;
  subcategory: string;
  level: SkillLevel;
  goalStatus: SkillGoalStatus;
  lastUpdated: string;
  weight: SkillWeight;
  confidence: 'low' | 'medium' | 'high';
  category: 'specialized' | 'common' | 'certification';
  businessCategory: string;
  growth: string;
  salary: string;
  benchmarks: {
    B: boolean;
    R: boolean;
    M: boolean;
    O: boolean;
  };
  requirement?: SkillGoalStatus;
}

export interface EmployeeSkillsData {
  employeeId: string;
  skills: EmployeeSkillAchievement[];
  states: Record<string, EmployeeSkillState>;
  lastUpdated?: string;
}

export interface EmployeeSkillsStore {
  employeeSkills: Record<string, EmployeeSkillsData>;
  initializeEmployeeSkills: (employeeId: string, employeeStore?: EmployeeStore) => void;
  setSkillLevel: (employeeId: string, skillTitle: string, level: SkillLevel) => void;
  setSkillGoalStatus: (employeeId: string, skillTitle: string, status: SkillGoalStatus) => void;
  getEmployeeSkills: (employeeId: string) => EmployeeSkillAchievement[];
  getSkillState: (employeeId: string, skillTitle: string) => EmployeeSkillState;
  batchUpdateSkills: (employeeId: string, updates: Record<string, EmployeeSkillState>) => void;
}