// Split into separate files for better organization
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
  return initialSkills[employeeId as keyof typeof initialSkills] || [];
};