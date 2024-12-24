import { roleSkills } from '../../../skills/data/roleSkills';
import { getSkillProfileId } from '../../../EmployeeTable';
import { getUnifiedSkillData } from '../../../skills/data/skillDatabaseService';
import { EmployeeSkillAchievement } from '../../types/employeeSkillTypes';
import { useEmployeeStore } from '../employeeStore';

export const initializeSkillsForEmployee = (employeeId: string): EmployeeSkillAchievement[] => {
  console.log('Initializing skills for employee:', employeeId);
  
  const employee = useEmployeeStore.getState().getEmployeeById(employeeId);
  if (!employee) {
    console.warn('Employee not found:', employeeId);
    return [];
  }

  const roleId = getSkillProfileId(employee.role);
  const roleData = roleSkills[roleId];
  
  if (!roleData) {
    console.warn('No role data found:', { roleId, role: employee.role });
    return [];
  }

  // Combine all role skills
  const allRoleSkills = [
    ...(roleData.specialized || []),
    ...(roleData.common || []),
    ...(roleData.certifications || [])
  ];

  console.log('Found role skills:', {
    roleId,
    skillCount: allRoleSkills.length,
    skills: allRoleSkills.map(s => s.title)
  });

  // Create initial achievements
  const initialSkills = allRoleSkills.map(skill => {
    const unifiedData = getUnifiedSkillData(skill.title);
    return {
      id: `${employeeId}-${skill.title}`,
      employeeId,
      title: skill.title,
      subcategory: unifiedData.subcategory,
      level: 'unspecified',
      goalStatus: 'unknown',
      lastUpdated: new Date().toISOString(),
      category: unifiedData.category,
      businessCategory: unifiedData.businessCategory,
      weight: unifiedData.weight,
      growth: unifiedData.growth,
      salary: unifiedData.salary,
      confidence: 'medium',
      benchmarks: unifiedData.benchmarks
    };
  });

  console.log('Created initial skills:', {
    employeeId,
    skillCount: initialSkills.length,
    skills: initialSkills.map(s => s.title)
  });

  return initialSkills;
};