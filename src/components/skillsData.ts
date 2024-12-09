import { technicalSkills } from './skills/data/categories/technicalSkills';
import { aiSkills } from './skills/data/categories/aiSkills';
import { softSkills } from './skills/data/categories/softSkills';
import { UnifiedSkill } from './skills/types/SkillTypes';

// Helper function to normalize skill titles
const normalizeSkillTitle = (title: string): string => {
  const normalizations: { [key: string]: string } = {
    'Git': 'Git Version Control',
    'Version Control': 'Git Version Control',
    'AWS': 'Amazon Web Services',
    'Amazon AWS': 'Amazon Web Services',
    'TensorFlow Developer Certificate': 'TensorFlow Developer Certification',
    'AWS Certified Machine Learning - Specialty': 'AWS Certified Machine Learning Specialty',
    'AWS DevOps': 'AWS Certified DevOps Engineer',
    'Kubernetes Administrator': 'Certified Kubernetes Administrator',
    'Terraform Associate': 'HashiCorp Certified Terraform Associate',
    'Project Management Professional': 'Project Management Professional (PMP)',
    'Scrum Master': 'Certified Scrum Master (CSM)',
  };
  
  return normalizations[title] || title;
};

// Combine all skills with normalized titles
const skills: UnifiedSkill[] = [
  ...technicalSkills,
  ...aiSkills,
  ...softSkills
].map(skill => ({
  ...skill,
  title: normalizeSkillTitle(skill.title)
}));

// Helper function to get unique skills by title
const getUniqueSkills = (skillsArray: UnifiedSkill[]) => {
  const seen = new Set();
  return skillsArray.filter(skill => {
    const normalizedTitle = normalizeSkillTitle(skill.title);
    const duplicate = seen.has(normalizedTitle);
    seen.add(normalizedTitle);
    return !duplicate;
  });
};

// Categorize skills into technical and soft skills
export const technicalSkillsList = getUniqueSkills(skills.filter(skill => 
  skill.category === 'specialized' && skill.type === 'technical'
));

export const softSkillsList = getUniqueSkills(skills.filter(skill => 
  skill.category === 'common' && skill.type === 'necessary'
));

// Export skill titles for backward compatibility
export const technicalSkills = technicalSkillsList.map(skill => skill.title);
export const softSkills = softSkillsList.map(skill => skill.title);

// Export full skill objects
export const technicalSkillObjects = technicalSkillsList;
export const softSkillObjects = softSkillsList;

console.log('Loaded skills:', {
  total: skills.length,
  technical: technicalSkills.length,
  soft: softSkills.length
});