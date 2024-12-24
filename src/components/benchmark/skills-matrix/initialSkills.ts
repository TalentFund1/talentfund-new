import { EmployeeSkillAchievement } from '../../employee/types/employeeSkillTypes';
import { useEmployeeSkillsStore } from '../../employee/store/employeeSkillsStore';

export const getEmployeeSkills = (id: string): EmployeeSkillAchievement[] => {
  console.log('Getting skills for employee:', id);
  return useEmployeeSkillsStore.getState().getEmployeeSkills(id);
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