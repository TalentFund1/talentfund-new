import { useEffect } from 'react';
import { useEmployeeSkillsStore } from '../components/employee/store/employeeSkillsStore';
import { employees } from '../components/employee/EmployeeData';

export const useEmployeeSkillsInit = (employeeId: string) => {
  const initializeEmployeeSkills = useEmployeeSkillsStore((state) => state.initializeEmployeeSkills);

  useEffect(() => {
    if (!employeeId) {
      console.log('No employee ID provided for initialization');
      return;
    }

    console.log('Starting employee skills initialization:', employeeId);
    
    try {
      // Only initialize with employee's existing skills
      const employee = employees.find(emp => emp.id === employeeId);
      if (employee) {
        console.log('Found employee data for initialization:', {
          employeeId,
          skillCount: employee.skills.length,
          skills: employee.skills.map(s => s.name)
        });
        initializeEmployeeSkills(employeeId);
      } else {
        console.warn('No employee data found for initialization:', employeeId);
      }
    } catch (error) {
      console.error('Failed to initialize employee skills:', error);
    }
  }, [employeeId, initializeEmployeeSkills]);
};