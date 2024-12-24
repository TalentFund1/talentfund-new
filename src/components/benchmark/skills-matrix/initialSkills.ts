import { UnifiedSkill } from '../../skills/types/SkillTypes';
import { useEmployeeStore } from '../../employee/store/employeeStore';
import { roleSkills } from '../../skills/data/roleSkills';
import { getSkillProfileId } from '../../EmployeeTable';

export const getEmployeeSkills = (id: string): UnifiedSkill[] => {
  console.log('Getting skills for employee:', id);
  const store = useEmployeeStore.getState();
  const employee = store.getEmployeeById(id);
  
  if (!employee) {
    console.warn('Employee not found:', id);
    return [];
  }

  // Get role ID to find default skills
  const roleId = getSkillProfileId(employee.role);
  console.log('Found role ID:', roleId);

  // Get default role skills
  const roleData = roleSkills[roleId as keyof typeof roleSkills];
  if (!roleData) {
    console.warn('No role skills found for:', roleId);
    return [];
  }

  // Combine all skills from role
  const defaultSkills = [
    ...(roleData.specialized || []),
    ...(roleData.common || []),
    ...(roleData.certifications || [])
  ];

  console.log('Default skills for role:', {
    roleId,
    skillCount: defaultSkills.length,
    skills: defaultSkills.map(s => s.title)
  });

  // Get any stored skills for this employee
  const storedSkills = store.getEmployeeSkills(id);
  
  // If we have stored skills, use those, otherwise use defaults
  const skills = storedSkills.length > 0 ? storedSkills : defaultSkills;
  
  console.log('Retrieved skills for employee:', {
    id,
    skillCount: skills.length,
    skills: skills.map(s => s.title)
  });
  
  return skills;
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