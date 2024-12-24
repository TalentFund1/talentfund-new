import { SkillStateStore } from '../types/skillStateTypes';
import { EmployeeSkill, EmployeeSkillState, SkillLevel, SkillGoalStatus } from '../../types/employeeSkillTypes';

export const createSkillStateSelectors = (get: () => SkillStateStore) => ({
  getEmployeeSkills: (employeeId: string): EmployeeSkill[] => {
    console.log('Getting skills for employee:', employeeId);
    const employeeData = get().employeeSkills[employeeId];
    if (!employeeData) {
      console.log('No skills found for employee:', employeeId);
      return [];
    }
    return employeeData.skills;
  },

  getSkillState: (employeeId: string, skillTitle: string): EmployeeSkillState => {
    console.log('Getting skill state:', { employeeId, skillTitle });
    const employeeData = get().employeeSkills[employeeId];
    const defaultState: EmployeeSkillState = {
      level: 'unspecified' as SkillLevel,
      requirement: 'unknown' as SkillGoalStatus,
      lastUpdated: new Date().toISOString()
    };

    if (!employeeData?.states?.[skillTitle]) {
      console.log('No existing state found for skill:', {
        employeeId,
        skillTitle,
        usingDefault: true
      });
      return defaultState;
    }

    console.log('Retrieved skill state:', {
      employeeId,
      skillTitle,
      state: employeeData.states[skillTitle]
    });
    
    return employeeData.states[skillTitle];
  }
});