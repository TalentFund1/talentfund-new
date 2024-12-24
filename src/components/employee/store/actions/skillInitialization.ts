import { EmployeeSkillData } from '../../types/employeeSkillTypes';
import { employees } from '../../EmployeeData';
import { getUnifiedSkillData } from '../../../skills/data/skillDatabaseService';

export const createInitializationActions = (set: any, get: any) => ({
  initializeEmployeeSkills: (employeeId: string) => {
    console.log('Initializing skills for employee:', employeeId);
    
    const employee = employees.find(emp => emp.id === employeeId);
    if (!employee) {
      console.warn('No employee found for initialization:', employeeId);
      return;
    }

    console.log('Found employee data for initialization:', {
      employeeId,
      skillCount: employee.skills.length,
      skills: employee.skills.map(s => s.title)
    });

    const store = get();
    employee.skills.forEach(skill => {
      const skillData = getUnifiedSkillData(skill.title);
      store.updateSkillState(employeeId, skill.title, {
        level: skill.level,
        goalStatus: 'unknown'
      });
    });
  }
});