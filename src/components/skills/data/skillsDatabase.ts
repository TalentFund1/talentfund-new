import { ConsolidatedSkill } from '../types/SkillTypes';
import { roleSkills } from './roleSkills';

// Helper function to determine skill category based on growth and type
export const determineCategory = (growth: string, type: string): 'critical' | 'technical' | 'necessary' => {
  const growthValue = parseFloat(growth);
  console.log('Determining category:', { growth: growthValue, type });
  
  if (growthValue >= 25) {
    return 'critical';
  }
  if (type === 'specialized' || type === 'common') {
    return 'technical';
  }
  return 'necessary';
};

// Convert role skills to consolidated format
const convertSkill = (skill: any, type: 'specialized' | 'common' | 'certification'): ConsolidatedSkill => {
  console.log('Converting skill:', { title: skill.title, type });
  
  return {
    title: skill.title,
    category: determineCategory(skill.growth || '0%', type),
    subcategory: skill.subcategory,
    type,
    growth: skill.growth || '0%',
    level: skill.level || 'unspecified',
    requirement: skill.requirement || 'preferred',
    salary: skill.salary,
    benchmarks: skill.benchmarks
  };
};

// Combine and convert all skills from roleSkills
const consolidateSkills = (): ConsolidatedSkill[] => {
  console.log('Starting skills consolidation...');
  const allSkills: ConsolidatedSkill[] = [];
  
  Object.values(roleSkills).forEach(role => {
    // Add specialized skills
    role.specialized?.forEach(skill => {
      if (!allSkills.some(s => s.title === skill.title)) {
        allSkills.push(convertSkill(skill, 'specialized'));
      }
    });

    // Add common skills
    role.common?.forEach(skill => {
      if (!allSkills.some(s => s.title === skill.title)) {
        allSkills.push(convertSkill(skill, 'common'));
      }
    });

    // Add certification skills
    role.certifications?.forEach(skill => {
      if (!allSkills.some(s => s.title === skill.title)) {
        allSkills.push(convertSkill(skill, 'certification'));
      }
    });
  });

  console.log('Consolidated skills count:', allSkills.length);
  return allSkills;
};

export const skillsDatabase = consolidateSkills();

// Helper functions
export const getSkillByTitle = (title: string): ConsolidatedSkill | undefined => {
  return skillsDatabase.find(skill => skill.title === title);
};

export const getSkillsByCategory = (category: 'critical' | 'technical' | 'necessary'): ConsolidatedSkill[] => {
  return skillsDatabase.filter(skill => skill.category === category);
};

export const getSkillsByType = (type: 'specialized' | 'common' | 'certification'): ConsolidatedSkill[] => {
  return skillsDatabase.filter(skill => skill.type === type);
};