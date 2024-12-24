import { SkillWeight } from '../../skills/types/SkillTypes';

// Basic skill level types
export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'unspecified';
export type SkillGoalStatus = 'required' | 'preferred' | 'not_interested' | 'unknown' | 'skill_goal';

// Employee-specific skill state
export interface EmployeeSkillState {
  level: SkillLevel;
  requirement: SkillGoalStatus;
  lastUpdated: string;
}

// Pure employee skill achievement record
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
  // Adding UnifiedSkill required properties
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
  requirement?: SkillGoalStatus; // Optional for backward compatibility
}

// Collection of employee skills data
export interface EmployeeSkillsData {
  employeeId: string;
  skills: EmployeeSkillAchievement[];
  states: Record<string, EmployeeSkillState>;
}

// Store interface
export interface EmployeeSkillsStore {
  employeeSkills: Record<string, EmployeeSkillsData>;
  initializeEmployeeSkills: (employeeId: string) => void;
  setSkillLevel: (employeeId: string, skillTitle: string, level: SkillLevel) => void;
  setSkillGoalStatus: (employeeId: string, skillTitle: string, status: SkillGoalStatus) => void;
  getEmployeeSkills: (employeeId: string) => EmployeeSkillAchievement[];
  getSkillState: (employeeId: string, skillTitle: string) => EmployeeSkillState;
}