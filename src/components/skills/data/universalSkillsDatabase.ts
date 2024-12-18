import { UnifiedSkill, SkillCategory } from '../types/SkillTypes';
import { skills } from './skillsData';
import { aiSkills } from './categories/aiSkills';
import { technicalSkills } from './categories/technicalSkills';
import { softSkills } from './categories/softSkills';
import { getSkillCategory } from './utils/categories';
import { getBusinessCategory } from './utils/categories/businessCategories';
import { getSkillWeight } from './utils/categories/skillWeights';
import { generateSkillId } from './utils/categories/skillLists';

// Helper function to normalize and deduplicate skills
const normalizeSkill = (skillInput: Partial<UnifiedSkill>): UnifiedSkill => {
  // Ensure we have a title
  const title = typeof skillInput === 'string' ? skillInput : skillInput.title || '';
  
  // Get categorization data
  const category = getSkillCategory(title) as SkillCategory;
  const businessCategory = getBusinessCategory(title);
  const weight = getSkillWeight(title);
  
  console.log(`Normalizing skill: ${title}`, {
    category,
    businessCategory,
    weight
  });

  return {
    id: generateSkillId(title),
    title,
    subcategory: skillInput.subcategory || category,
    category: category,
    businessCategory: businessCategory,
    weight: weight,
    level: skillInput.level || 'intermediate',
    growth: skillInput.growth || '20%',
    salary: skillInput.salary || '$150,000',
    confidence: skillInput.confidence || 'high',
    benchmarks: skillInput.benchmarks || { B: true, R: true, M: true, O: true }
  };
};

// Combine all skills from different sources
const getAllUniversalSkills = (): UnifiedSkill[] => {
  const skillSet = new Set<string>();
  const universalSkills: UnifiedSkill[] = [];

  // Helper function to add skills to our universal database
  const addSkillToDatabase = (skill: any) => {
    // Convert skillsData.ts format to UnifiedSkill format
    const skillToAdd = typeof skill === 'string' ? { title: skill } : {
      title: skill.title,
      subcategory: skill.subcategory,
      level: skill.level,
      growth: skill.growth
    };
    
    const normalizedSkill = normalizeSkill(skillToAdd);
    
    // Only add if we haven't seen this skill before
    if (!skillSet.has(normalizedSkill.title.toLowerCase())) {
      skillSet.add(normalizedSkill.title.toLowerCase());
      universalSkills.push(normalizedSkill);
      
      console.log(`Added skill to universal database:`, {
        title: normalizedSkill.title,
        id: normalizedSkill.id,
        category: normalizedSkill.category,
        weight: normalizedSkill.weight
      });
    }
  };

  // Add skills from skillsData.ts
  skills.forEach(skill => addSkillToDatabase(skill));

  // Add skills from aiSkills
  aiSkills.forEach(skill => addSkillToDatabase(skill));

  // Add skills from technicalSkills
  technicalSkills.forEach(skill => addSkillToDatabase(skill));

  // Add skills from softSkills
  softSkills.forEach(skill => addSkillToDatabase(skill));

  console.log(`Universal Skills Database loaded with ${universalSkills.length} unique skills`);
  
  // Log category distribution
  const categoryDistribution = universalSkills.reduce((acc, skill) => {
    acc[skill.category] = (acc[skill.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  console.log('Skills distribution by category:', categoryDistribution);

  return universalSkills;
};

// Export the consolidated skills
export const universalSkills = getAllUniversalSkills();

// Export just the titles for backward compatibility
export const universalSkillTitles = universalSkills.map(skill => skill.title);

// Helper function to find a skill by title
export const findSkillByTitle = (title: string): UnifiedSkill | undefined => {
  return universalSkills.find(skill => 
    skill.title.toLowerCase() === title.toLowerCase()
  );
};

// Helper function to get skills by category
export const getSkillsByCategory = (category: string): UnifiedSkill[] => {
  return universalSkills.filter(skill => skill.category === category);
};

// Helper function to get skills by weight
export const getSkillsByWeight = (weight: string): UnifiedSkill[] => {
  return universalSkills.filter(skill => skill.weight === weight);
};