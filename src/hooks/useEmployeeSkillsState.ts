import { useState, useEffect } from 'react';
import { useEmployeeSkillsStore } from '../components/employee/store/employeeSkillsStore';
import { Employee } from '../components/types/employeeTypes';

export const useEmployeeSkillsState = (baseEmployees: Employee[]) => {
  const [skillsVersion, setSkillsVersion] = useState(0);
  const { getEmployeeSkills } = useEmployeeSkillsStore();

  useEffect(() => {
    console.log('Setting up skills state subscription');
    const unsubscribe = useEmployeeSkillsStore.subscribe(
      (state) => {
        console.log('Skills state changed, updating version');
        setSkillsVersion(prev => prev + 1);
      }
    );

    return () => {
      console.log('Cleaning up skills state subscription');
      unsubscribe();
    };
  }, []);

  const employeesWithSkills = baseEmployees.map(emp => {
    const skills = getEmployeeSkills(emp.id);
    console.log(`Employee ${emp.id} skills:`, skills);
    return {
      ...emp,
      skills
    };
  });

  console.log('Employees with skills:', employeesWithSkills.map(emp => ({
    id: emp.id,
    name: emp.name,
    skillCount: emp.skills.length,
    skills: skills.map(s => s.title)
  })));

  return { employeesWithSkills, skillsVersion };
};