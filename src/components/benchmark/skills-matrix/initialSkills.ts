import { UnifiedSkill } from '../../skills/types/SkillTypes';
import { useEmployeeStore } from '../../employee/store/employeeStore';

export const getEmployeeSkills = (id: string): UnifiedSkill[] => {
  console.log('Getting skills for employee:', id);
  const store = useEmployeeStore.getState();
  
  // Get stored skills for this employee
  const storedSkills = store.getEmployeeSkills(id);
  
  console.log('Retrieved skills for employee:', {
    id,
    skillCount: storedSkills.length,
    skills: storedSkills.map(s => s.title)
  });
  
  return storedSkills;
};

export const getEmployeeSkillLevel = (employeeId: string, skillTitle: string): string => {
  const store = useEmployeeStore.getState();
  const skillState = store.getSkillState(employeeId, skillTitle);
  console.log('Getting skill level:', { employeeId, skillTitle, level: skillState.level });
  return skillState.level;
};

export const getEmployeeSkillRequirement = (employeeId: string, skillTitle: string): string => {
  const store = useEmployeeStore.getState();
  const skillState = store.getSkillState(employeeId, skillTitle);
  console.log('Getting skill requirement:', { employeeId, skillTitle, requirement: skillState.requirement });
  return skillState.requirement;
};