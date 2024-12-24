import { EmployeeSkillAchievement } from '../../employee/types/employeeSkillTypes';
import { useEmployeeSkillsStore } from '../../employee/store/employeeSkillsStore';
import { employees } from '../../employee/EmployeeData';

export const getEmployeeSkills = (id: string): EmployeeSkillAchievement[] => {
  console.log('Getting skills for employee:', id);
  const store = useEmployeeSkillsStore.getState();
  const existingSkills = store.getEmployeeSkills(id);
  
  if (!existingSkills.length) {
    console.log('No existing skills found, initializing from employee data:', id);
    const employee = employees.find(emp => emp.id === id);
    
    if (employee) {
      console.log('Found employee data, initializing skills:', {
        employeeId: id,
        skillCount: employee.skills.length,
        skills: employee.skills.map(s => s.name)
      });
      store.initializeEmployeeSkills(id);
    } else {
      console.warn('No employee data found for ID:', id);
    }
  } else {
    console.log('Found existing skills:', {
      employeeId: id,
      skillCount: existingSkills.length,
      skills: existingSkills.map(s => s.title)
    });
  }
  
  return store.getEmployeeSkills(id);
};

export const getEmployeeSkillLevel = (employeeId: string, skillTitle: string): string => {
  const store = useEmployeeSkillsStore.getState();
  const skillState = store.getSkillState(employeeId, skillTitle);
  console.log('Getting skill level:', { employeeId, skillTitle, level: skillState.level });
  return skillState.level;
};

export const getEmployeeSkillGoalStatus = (employeeId: string, skillTitle: string): string => {
  const store = useEmployeeSkillsStore.getState();
  const skillState = store.getSkillState(employeeId, skillTitle);
  console.log('Getting skill goal status:', { employeeId, skillTitle, goalStatus: skillState.goalStatus });
  return skillState.goalStatus;
};