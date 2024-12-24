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

    const initializationKey = `skills_initialized_${employeeId}`;
    
    // Check if we've already initialized for this session
    if (sessionStorage.getItem(initializationKey)) {
      console.log('Skills already initialized this session for employee:', employeeId);
      return;
    }

    console.log('Initializing skills for employee:', employeeId);
    
    try {
      initializeEmployeeSkills(employeeId, employeeStore);
      // Mark as initialized for this session
      sessionStorage.setItem(initializationKey, 'true');
      console.log('Successfully initialized skills for employee:', employeeId);
    } catch (error) {
      console.error('Failed to initialize skills:', error);
      // Remove the initialization mark if it failed
      sessionStorage.removeItem(initializationKey);
    }
  }, [employeeId, initializeEmployeeSkills, employeeStore]);
};