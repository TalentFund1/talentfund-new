export type RoleRequirementLevel = 'required' | 'preferred';
export type EmployeeSkillGoalStatus = 'skill_goal' | 'not_interested' | 'unknown';
export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'unspecified';

// Role requirement state
export interface RoleSkillState {
  level: SkillLevel;
  required: RoleRequirementLevel;
  lastUpdated: string;
}

// Employee skill goal state
export interface EmployeeSkillState {
  level: SkillLevel;
  goalStatus: EmployeeSkillGoalStatus;
  lastUpdated: string;
  confidence: 'low' | 'medium' | 'high';
}

// Combined state for benchmark analysis
export interface BenchmarkSkillState {
  employeeState: EmployeeSkillState;
  roleState: RoleSkillState;
}