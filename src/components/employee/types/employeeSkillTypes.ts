export interface EmployeeSkillState {
  level: string;
  requirement: 'required' | 'preferred' | 'not_interested' | 'unknown' | 'skill_goal';
  lastUpdated: string;
}

export interface EmployeeSkills {
  id: string;
  skills: {
    [skillTitle: string]: EmployeeSkillState;
  };
  lastUpdated: string;
}

export interface EmployeeSkillsData {
  skills: EmployeeSkills[];
  states: Record<string, EmployeeSkillState>;
}

export interface EmployeeSkillUpdate {
  employeeId: string;
  skillTitle: string;
  level: string;
  requirement: EmployeeSkillState['requirement'];
}