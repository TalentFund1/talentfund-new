import { EmployeeSkill, EmployeeSkillState, SkillRequirement } from '../../employee/types/employeeSkillTypes';
import { useEmployeeSkillsStore } from '../../employee/store/employeeSkillsStore';
import { getUnifiedSkillData } from '../../skills/data/skillDatabaseService';

export const getEmployeeSkills = (id: string): EmployeeSkill[] => {
  console.log('Getting skills for employee:', id);
  const skills = useEmployeeSkillsStore.getState().getEmployeeSkills(id);
  
  return skills.map(skill => {
    const unifiedData = getUnifiedSkillData(skill.title);
    return {
      ...skill,
      id: `${id}-${skill.title}`,
      businessCategory: unifiedData.businessCategory || 'Information Technology',
      salary: unifiedData.salary || 'N/A',
      benchmarks: unifiedData.benchmarks || {
        B: false,
        R: false,
        M: false,
        O: false
      },
      level: skill.level || 'unspecified',
      growth: skill.growth || '0%',
      confidence: skill.confidence || 'medium',
      category: skill.category || unifiedData.category,
      weight: skill.weight || unifiedData.weight
    };
  });
};

export const getEmployeeSkillLevel = (employeeId: string, skillTitle: string): string => {
  const store = useEmployeeSkillsStore.getState();
  const skillState = store.getSkillState(employeeId, skillTitle);
  console.log('Getting skill level:', { employeeId, skillTitle, level: skillState.level });
  return skillState.level;
};

export const getEmployeeSkillRequirement = (employeeId: string, skillTitle: string): SkillRequirement => {
  const store = useEmployeeSkillsStore.getState();
  const skillState = store.getSkillState(employeeId, skillTitle);
  console.log('Getting skill requirement:', { employeeId, skillTitle, requirement: skillState.requirement });
  return skillState.requirement;
};