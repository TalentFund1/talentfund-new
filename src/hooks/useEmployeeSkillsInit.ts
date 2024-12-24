import { useEffect } from 'react';
import { useEmployeeSkillsStore } from '../components/employee/store/employeeSkillsStore';

export const useEmployeeSkillsInit = (employeeId: string) => {
  const initializeEmployeeSkills = useEmployeeSkillsStore((state) => state.initializeEmployeeSkills);

  useEffect(() => {
    if (!employeeId) {
      console.log('No employee ID provided for initialization');
      return;
    }

    console.log('Starting employee skills initialization:', employeeId);
    
    try {
      initializeEmployeeSkills(employeeId);
      console.log('Successfully initialized empty skills container for employee:', employeeId);
    } catch (error) {
      console.error('Failed to initialize skills:', error);
    }
  }, [employeeId, initializeEmployeeSkills]);
};