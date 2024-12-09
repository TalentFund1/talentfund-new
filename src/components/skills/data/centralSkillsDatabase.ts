import { UnifiedSkill } from '../types/SkillTypes';
import { backendSkills } from './skills/backendSkills';
import { infrastructureSkills } from './skills/infrastructureSkills';
import { softSkills } from './skills/softSkills';
import { certificationSkills } from './skills/certificationSkills';
import { frontendSkills } from './skills/frontendSkills';
import { aiSkills } from './skills/aiSkills';
import { managementSkills } from './skills/managementSkills';
import { commonSkills } from './skills/commonSkills';

// Normalize skill titles to ensure consistency
const normalizeSkillTitle = (title: string): string => {
  console.log('Normalizing skill title:', title);
  
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
    'Node': 'Node.js',
    'NodeJS': 'Node.js',
    'React JS': 'React',
    'ReactJS': 'React',
    'Next': 'Next.js',
    'NextJS': 'Next.js',
    'TypeScript': 'TypeScript',
    'TS': 'TypeScript',
    'Machine Learning': 'Machine Learning',
    'ML': 'Machine Learning',
    'Artificial Intelligence': 'Artificial Intelligence',
    'AI': 'Artificial Intelligence',
    'CSS3': 'CSS/SASS',
    'SASS': 'CSS/SASS',
    'SCSS': 'CSS/SASS',
    'Docker Container': 'Docker',
    'Kubernetes Container': 'Kubernetes',
    'K8s': 'Kubernetes',
    'Amazon Web Service': 'Amazon Web Services',
  };
  
  const normalized = normalizations[title] || title;
  console.log('Normalized title:', normalized);
  return normalized;
};

// Combine all skills into the centralized database with normalized titles
export const centralizedSkills: UnifiedSkill[] = [
  ...backendSkills,
  ...infrastructureSkills,
  ...softSkills,
  ...certificationSkills,
  ...frontendSkills,
  ...aiSkills,
  ...managementSkills,
  ...commonSkills
].map(skill => ({
  ...skill,
  title: normalizeSkillTitle(skill.title)
}));

// Helper functions to access the centralized database
export const getSkillByTitle = (title: string): UnifiedSkill | undefined => {
  const normalizedTitle = normalizeSkillTitle(title);
  console.log('Getting skill data for:', normalizedTitle);
  const skill = centralizedSkills.find(skill => normalizeSkillTitle(skill.title) === normalizedTitle);
  console.log('Found skill data:', skill || 'Not found');
  return skill;
};

export const getSkillsByCategory = (category: 'specialized' | 'common' | 'certification'): UnifiedSkill[] => {
  console.log('Getting skills for category:', category);
  return centralizedSkills.filter(skill => skill.category === category);
};

export const getSkillsByType = (type: 'critical' | 'technical' | 'necessary'): UnifiedSkill[] => {
  console.log('Getting skills by type:', type);
  return centralizedSkills.filter(skill => skill.type === type);
};

// Function to ensure skill data consistency
export const getUnifiedSkillData = (skillTitle: string): UnifiedSkill => {
  console.log('Fetching unified skill data for:', skillTitle);
  const skill = getSkillByTitle(skillTitle);
  
  if (!skill) {
    console.warn(`Skill "${skillTitle}" not found in centralized database, using default values`);
    return {
      id: `UNKNOWN-${Date.now()}`,
      title: skillTitle,
      subcategory: "General Skills",
      category: "common",
      type: "necessary",
      growth: "0%",
      salary: "$0",
      confidence: "low",
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

// Re-export the UnifiedSkill type
export type { UnifiedSkill };