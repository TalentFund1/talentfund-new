import { EmployeeSkill, EmployeeSkillState } from '../../employee/types/employeeSkillTypes';
import { useEmployeeSkillsStore } from '../../employee/store/employeeSkillsStore';

export const getEmployeeSkills = (id: string): EmployeeSkill[] => {
  console.log('Getting skills for employee:', id);
  const skills = useEmployeeSkillsStore.getState().getEmployeeSkills(id);
  return skills.map(skill => ({
    title: skill.title || '',
    subcategory: skill.subcategory || '',
    level: skill.level || 'unspecified',
    growth: skill.growth || '0%',
    confidence: skill.confidence || 'medium',
    requirement: skill.requirement,
    category: skill.category,
    weight: skill.weight
  }));
};

export const getEmployeeSkillLevel = (employeeId: string, skillTitle: string): string => {
  const store = useEmployeeSkillsStore.getState();
  const skillState = store.getSkillState(employeeId, skillTitle);
  console.log('Getting skill level:', { employeeId, skillTitle, level: skillState.level });
  return skillState.level;
};

export const getEmployeeSkillRequirement = (employeeId: string, skillTitle: string): string => {
  const store = useEmployeeSkillsStore.getState();
  const skillState = store.getSkillState(employeeId, skillTitle);
  console.log('Getting skill requirement:', { employeeId, skillTitle, requirement: skillState.requirement });
  return skillState.requirement;
};