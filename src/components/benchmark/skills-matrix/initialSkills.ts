import { UnifiedSkill } from '../../skills/types/SkillTypes';
import { useEmployeeStore } from '../../employee/store/employeeStore';

export const getEmployeeSkills = (id: string): UnifiedSkill[] => {
  console.log('Getting skills for employee:', id);
  const store = useEmployeeStore.getState();
  const skills = store.getEmployeeSkills(id);
  
  console.log('Retrieved skills for employee:', {
    id,
    skillCount: skills.length,
    skills: skills.map(s => s.title)
  });
  
  return skills;
};

export const getEmployeeSkillLevel = (employeeId: string, skillTitle: string): string => {
  return useEmployeeStore.getState().getSkillState(employeeId, skillTitle).level;
};

export const getEmployeeSkillRequirement = (employeeId: string, skillTitle: string): string => {
  return useEmployeeStore.getState().getSkillState(employeeId, skillTitle).requirement;
};