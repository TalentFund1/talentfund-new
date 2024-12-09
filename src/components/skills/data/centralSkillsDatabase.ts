import { UnifiedSkill } from '../types/SkillTypes';
import { backendSkills } from './skills/backendSkills';
import { infrastructureSkills } from './skills/infrastructureSkills';
import { softSkills } from './skills/softSkills';
import { certificationSkills } from './skills/certificationSkills';
import { frontendSkills } from './skills/frontendSkills';
import { aiSkills } from './skills/aiSkills';
import { managementSkills } from './skills/managementSkills';

// Helper function to determine the category based on skill characteristics
const determineCategory = (skill: UnifiedSkill): UnifiedSkill['category'] => {
  // Technical skills are typically Information Technology
  const techSkills = ['Programming', 'Development', 'Engineering', 'Cloud', 'Database', 'Security'];
  if (techSkills.some(tech => skill.subcategory.includes(tech))) {
    return 'Information Technology';
  }

  // Analysis skills
  const analysisSkills = ['Data', 'Analytics', 'Research', 'Problem Solving', 'Strategy'];
  if (analysisSkills.some(analysis => skill.subcategory.includes(analysis))) {
    return 'Analysis';
  }

  // Sales skills
  const salesSkills = ['Sales', 'Marketing', 'Business Development'];
  if (salesSkills.some(sales => skill.subcategory.includes(sales))) {
    return 'Sales';
  }

  // Physical and Inherent Abilities
  const physicalSkills = ['Physical', 'Manual', 'Hands-on'];
  if (physicalSkills.some(physical => skill.subcategory.includes(physical))) {
    return 'Physical and Inherent Abilities';
  }

  // Media and Communications skills
  const communicationSkills = ['Communication', 'Writing', 'Design', 'Media'];
  if (communicationSkills.some(comm => skill.subcategory.includes(comm))) {
    return 'Media and Communications';
  }

  // Default to Information Technology if no other category matches
  return 'Information Technology';
};

// Combine all skills into the centralized database with proper categories
export const centralizedSkills: UnifiedSkill[] = [
  ...backendSkills,
  ...infrastructureSkills,
  ...softSkills,
  ...certificationSkills,
  ...frontendSkills,
  ...aiSkills,
  ...managementSkills
].map(skill => ({
  ...skill,
  category: determineCategory(skill)
}));

// Helper functions to access the centralized database
export const getSkillByTitle = (title: string): UnifiedSkill | undefined => {
  console.log('Getting skill data for:', title);
  const skill = centralizedSkills.find(skill => skill.title === title);
  console.log('Found skill data:', skill || 'Not found');
  return skill;
};

export const getSkillsByCategory = (category: UnifiedSkill['category']): UnifiedSkill[] => {
  console.log('Getting skills for category:', category);
  return centralizedSkills.filter(skill => skill.category === category);
};

export const getSkillsByWeight = (weight: 'critical' | 'technical' | 'necessary'): UnifiedSkill[] => {
  console.log('Getting skills by weight:', weight);
  return centralizedSkills.filter(skill => skill.weight === weight);
};

// Function to ensure skill data consistency with proper category information
export const getUnifiedSkillData = (skillTitle: string): UnifiedSkill => {
  console.log('Fetching unified skill data for:', skillTitle);
  const skill = getSkillByTitle(skillTitle);
  
  if (!skill) {
    console.warn(`Skill "${skillTitle}" not found in centralized database, using default values`);
    return {
      id: `GEN_${Date.now()}`,
      title: skillTitle,
      subcategory: "Software Development",
      category: "Information Technology",
      weight: "necessary",
      growth: "15%",
      salary: "$150,000",
      confidence: "medium",
      benchmarks: {
        B: false,
        R: false,
        M: false,
        O: false
      }
    };
  }
  
  console.log('Found unified skill data:', skill);
  return skill;
};