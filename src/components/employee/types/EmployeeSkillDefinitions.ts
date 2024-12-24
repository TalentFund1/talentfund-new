export type EmployeeSkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'unspecified';
export type EmployeeSkillStatus = 'active' | 'archived' | 'planned';
export type EmployeeSkillConfidence = 'low' | 'medium' | 'high';

export interface EmployeeSkillRecord {
  id: string;
  employeeId: string;
  skillName: string;
  level: EmployeeSkillLevel;
  status: EmployeeSkillStatus;
  confidence: EmployeeSkillConfidence;
  lastUpdated: string;
  notes?: string;
}

export interface EmployeeSkillsState {
  skills: Record<string, EmployeeSkillRecord>;
  lastUpdated: string;
}

console.log('Employee skill definitions loaded');