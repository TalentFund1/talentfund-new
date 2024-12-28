import { Skill, SkillWeight, SkillCategory } from '../types/SkillTypes';
import { Skills, getAllSkills } from './skills/allSkills';

// Helper function to determine skill weight based on growth and category
const determineWeight = (growth: string, category: string): SkillWeight => {
  const growthValue = parseFloat(growth);
  if (growthValue >= 25) return 'critical';
  if (category === 'specialized' || category === 'common') return 'technical';
  return 'necessary';
};

// Helper function to determine business category
const getBusinessCategory = (skillTitle: string): string => {
  const categories: { [key: string]: string } = {
    'AWS': 'Information Technology',
    'Docker': 'Information Technology',
    'Kubernetes': 'Information Technology',
    'Machine Learning': 'Information Technology',
    'React': 'Information Technology',
    'Node.js': 'Information Technology',
    'Communication': 'Media and Communications',
    'Leadership': 'Initiative and Leadership',
    'Project Management': 'Project Management',
    'Data Science': 'Analysis',
    'Risk Management': 'Risk and Compliance'
  };
  
  return categories[skillTitle] || 'Information Technology';
};

// Use the consolidated skills directly
const skillsDatabase = getAllSkills().map(skill => ({
  ...skill,
  id: `SKILL_${skill.title.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`,
  weight: skill.weight || determineWeight(skill.growth, skill.category || 'common'),
  salary: skill.salary || '$0',
  confidence: skill.confidence || 'medium',
  benchmarks: skill.benchmarks || { B: false, R: false, M: false, O: false }
})) as Skill[];

// Helper functions
export const getSkillByTitle = (title: string): Skill | undefined => {
  return skillsDatabase.find(skill => skill.title === title);
};

export const getSkillsByWeight = (weight: SkillWeight): Skill[] => {
  return skillsDatabase.filter(skill => skill.weight === weight);
};

export const getSkillsByCategory = (category: SkillCategory): Skill[] => {
  return skillsDatabase.filter(skill => skill.category === category);
};

export { skillsDatabase };