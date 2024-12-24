// Core skill types
export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'unspecified';
export type SkillGoalStatus = 'required' | 'preferred' | 'not_interested' | 'unknown' | 'skill_goal';
export type SkillConfidence = 'low' | 'medium' | 'high';
export type SkillCategory = 'specialized' | 'common' | 'certification';
export type SkillWeight = 'critical' | 'technical' | 'necessary';

// Employee-specific skill state
export interface EmployeeSkillState {
  level: SkillLevel;
  goalStatus: SkillGoalStatus;
  lastUpdated: string;
  confidence: SkillConfidence;
}

// Update for a single skill
export interface EmployeeSkillUpdate {
  level?: SkillLevel;
  goalStatus?: SkillGoalStatus;
  confidence?: SkillConfidence;
}

// Complete employee skill data
export interface EmployeeSkillData {
  id: string;
  employeeId: string;
  skillId: string;
  title: string;
  level: SkillLevel;
  goalStatus: SkillGoalStatus;
  lastUpdated: string;
  confidence: SkillConfidence;
  // Metadata (not role-dependent)
  subcategory: string;
  category: SkillCategory;
  businessCategory: string;
  weight: SkillWeight;
  growth: string;
  salary: string;
  benchmarks: {
    B: boolean;
    R: boolean;
    M: boolean;
    O: boolean;
  };
}

// Achievement type for skill comparisons
export interface EmployeeSkillAchievement {
  id: string;
  employeeId: string;
  title: string;
  level: SkillLevel;
  goalStatus: SkillGoalStatus;
  lastUpdated: string;
  confidence: SkillConfidence;
  category: SkillCategory;
  subcategory: string;
  businessCategory: string;
  weight: SkillWeight;
  growth: string;
  salary: string;
  benchmarks: {
    B: boolean;
    R: boolean;
    M: boolean;
    O: boolean;
  };
}

// Complete employee skills data structure
export interface EmployeeSkillsData {
  employeeId: string;
  skills: Record<string, EmployeeSkillData>;
  lastUpdated: string;
}

// State management for employee skills
export interface EmployeeSkillsState {
  skills: Record<string, EmployeeSkillData>;
  lastUpdated: string;
}

console.log('Employee skill types loaded with complete interfaces');