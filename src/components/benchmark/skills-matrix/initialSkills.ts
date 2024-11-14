import { aiEngineerSkills } from './roles/aiEngineer';
import { backendEngineerSkills } from './roles/backendEngineer';
import { frontendDeveloperSkills } from './roles/frontendDeveloper';
import { engineeringManagerSkills } from './roles/engineeringManager';

export const initialSkills = {
  "123": aiEngineerSkills,
  "124": backendEngineerSkills,
  "125": frontendDeveloperSkills,
  "126": engineeringManagerSkills
};

export const getEmployeeSkills = (employeeId: string) => {
  // Convert skills data to the expected format
  const roleSkills = initialSkills[employeeId as keyof typeof initialSkills] || [];
  
  // Combine all skills (specialized, common, certifications)
  const allSkills = [
    ...(roleSkills.specialized || []),
    ...(roleSkills.common || []),
    ...(roleSkills.certifications || [])
  ];

  return allSkills.map(skill => ({
    ...skill,
    requirement: skill.requirement || 'unknown',
    level: skill.level || 'unspecified',
    confidence: 'high', // Default confidence level
    isCompanySkill: true // Default company skill status
  }));
};