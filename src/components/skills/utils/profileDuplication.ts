import { roleSkills } from '../data/roleSkills';
import { initialSkills } from '../../benchmark/skills-matrix/initialSkills';
import { jobTitles } from '../competency/skillProfileData';

interface ProfileData {
  id: string;
  name: string;
  role: string;
  department: string;
  skillCount: number;
  benchmark: number;
  lastUpdated: string;
  location: string;
  sex: 'male' | 'female';
  category: string;
  manager?: string;
  startDate?: string;
  office: string;
  termDate: string;
}

export const duplicateProfileData = (sourceId: string, targetId: string) => {
  console.log('Duplicating profile data from', sourceId, 'to', targetId);

  // Duplicate role skills
  if (roleSkills[sourceId as keyof typeof roleSkills]) {
    roleSkills[targetId] = JSON.parse(JSON.stringify(roleSkills[sourceId as keyof typeof roleSkills]));
    console.log('Role skills duplicated successfully');
  }

  // Duplicate initial skills
  if (initialSkills[sourceId as keyof typeof initialSkills]) {
    initialSkills[targetId] = JSON.parse(JSON.stringify(initialSkills[sourceId as keyof typeof initialSkills]));
    console.log('Initial skills duplicated successfully');
  }

  return true;
};

export const validateProfileStructure = (profile: ProfileData): boolean => {
  console.log('Validating profile structure:', profile);
  
  const requiredFields = [
    'id', 'name', 'role', 'department', 'skillCount',
    'benchmark', 'lastUpdated', 'location', 'sex',
    'category', 'office', 'termDate'
  ];

  return requiredFields.every(field => {
    const hasField = field in profile;
    if (!hasField) {
      console.error(`Missing required field: ${field}`);
    }
    return hasField;
  });
};