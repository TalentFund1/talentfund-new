import { useEffect } from 'react';
import { useEmployeeSkillsStore } from '@/components/employee/store/employeeSkillsStore';
import { employees } from '@/components/employee/EmployeeData';

export const useEmployeeSkillsInit = (employeeId: string) => {
  const initializeEmployeeSkills = useEmployeeSkillsStore(state => state.initializeEmployeeSkills);
  
  useEffect(() => {
    if (!employeeId) return;

    const employee = employees.find(emp => emp.id === employeeId);
    if (!employee) {
      console.warn('Employee not found for initialization:', employeeId);
      return;
    }

    console.log('Found employee data for initialization:', {
      employeeId,
      skillCount: employee.skills.length,
      skills: employee.skills.map(s => s.title)
    });

    initializeEmployeeSkills(employeeId);
  }, [employeeId, initializeEmployeeSkills]);
};