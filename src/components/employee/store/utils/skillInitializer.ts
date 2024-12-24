import { roleSkills } from '../../../skills/data/roleSkills';
import { getSkillProfileId } from '../../../EmployeeTable';
import { getUnifiedSkillData } from '../../../skills/data/skillDatabaseService';
import { EmployeeSkillAchievement, SkillLevel, SkillGoalStatus } from '../../types/employeeSkillTypes';

export const initializeEmployeeSkills = (employeeId: string, role: string): EmployeeSkillAchievement[] => {
  console.log('Initializing skills for employee:', { employeeId, role });
  
  const roleId = getSkillProfileId(role);
  const roleData = roleSkills[roleId];
  
  if (!roleData) {
    console.warn('No role data found for:', { roleId, role });
    return [];
  }

  // Combine all skills from role
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

  // Create initial skill achievements with correct types
  const initialSkills: EmployeeSkillAchievement[] = allRoleSkills.map(skill => {
    const unifiedData = getUnifiedSkillData(skill.title);
    return {
      id: `${employeeId}-${skill.title}`,
      employeeId,
      title: skill.title,
      subcategory: unifiedData.subcategory,
      level: 'unspecified' as SkillLevel,
      goalStatus: 'unknown' as SkillGoalStatus,
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