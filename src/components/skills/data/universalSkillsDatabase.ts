import { UnifiedSkill } from '../types/SkillTypes';
import { skills } from './skillsData';
import { aiSkills } from './categories/aiSkills';
import { technicalSkills } from './categories/technicalSkills';
import { softSkills } from './categories/softSkills';
import { getUnifiedSkillData } from './centralSkillsDatabase';

// Consolidate all skills from different sources
const getAllUniversalSkills = (): UnifiedSkill[] => {
  const skillSet = new Set<string>();
  const universalSkills: UnifiedSkill[] = [];

  // Helper function to add skills to our universal database
  const addSkillToDatabase = (skill: string | UnifiedSkill) => {
    const skillTitle = typeof skill === 'string' ? skill : skill.title;
    
    // Only add if we haven't seen this skill before
    if (!skillSet.has(skillTitle.toLowerCase())) {
      skillSet.add(skillTitle.toLowerCase());
      
      // If it's already a UnifiedSkill, add it directly
      if (typeof skill !== 'string') {
        universalSkills.push(skill);
      } else {
        // Convert simple skill to UnifiedSkill format
        universalSkills.push(getUnifiedSkillData(skill));
      }
    }
  };

  // Add skills from skillsData.ts
  skills.forEach(skill => addSkillToDatabase(skill.title));

  // Add skills from aiSkills
  aiSkills.forEach(skill => addSkillToDatabase(skill));

  // Add skills from technicalSkills
  technicalSkills.forEach(skill => addSkillToDatabase(skill));

  // Add skills from softSkills
  softSkills.forEach(skill => addSkillToDatabase(skill));

  console.log(`Universal Skills Database loaded with ${universalSkills.length} unique skills`);
  return universalSkills;
};

// Export the consolidated skills
export const universalSkills = getAllUniversalSkills();

// Export just the titles for the dropdown
export const universalSkillTitles = universalSkills.map(skill => skill.title);