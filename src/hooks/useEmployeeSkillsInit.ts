import { useEffect } from 'react';
import { useEmployeeSkillsStore } from '../components/employee/store/employeeSkillsStore';
import { useEmployeeStore } from '../components/employee/store/employeeStore';

export const useEmployeeSkillsInit = (employeeId: string) => {
  const initializeEmployeeSkills = useEmployeeSkillsStore((state) => state.initializeEmployeeSkills);
  const employeeStore = useEmployeeStore();

  useEffect(() => {
    if (!employeeId) {
      console.log('No employee ID provided for initialization');
      return;
    }

    console.log('Starting employee skills initialization check:', employeeId);
    
    try {
      initializeEmployeeSkills(employeeId);
      console.log('Successfully initialized skills for employee:', employeeId);
    } catch (error) {
      console.error('Failed to initialize skills:', error);
    }
  }, [employeeId, initializeEmployeeSkills]);
};