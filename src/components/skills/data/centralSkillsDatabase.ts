import { UnifiedSkill } from '../types/SkillTypes';
import { backendSkills } from './skills/backendSkills';
import { infrastructureSkills } from './skills/infrastructureSkills';
import { softSkills } from './skills/softSkills';
import { certificationSkills } from './skills/certificationSkills';
import { frontendSkills } from './skills/frontendSkills';
import { aiSkills } from './skills/aiSkills';
import { managementSkills } from './skills/managementSkills';
import { commonSkills } from './skills/commonSkills';

// Export the normalize function
export const normalizeSkillTitle = (title: string): string => {
  console.log('Normalizing skill title:', title);
  
  const normalizations: { [key: string]: string } = {
    // Version Control
    'Git': 'Git Version Control',
    'Version Control': 'Git Version Control',
    'Git/Version Control': 'Git Version Control',
    
    // Cloud Services
    'AWS': 'Amazon Web Services',
    'Amazon AWS': 'Amazon Web Services',
    'Amazon Web Service': 'Amazon Web Services',
    'Cloud Computing': 'Amazon Web Services',
    
    // Certifications
    'TensorFlow Developer Certificate': 'TensorFlow Developer Certification',
    'AWS Certified Machine Learning - Specialty': 'AWS Certified Machine Learning Specialty',
    'AWS DevOps': 'AWS Certified DevOps Engineer',
    'Kubernetes Administrator': 'Certified Kubernetes Administrator',
    'Terraform Associate': 'HashiCorp Certified Terraform Associate',
    'Project Management Professional': 'Project Management Professional (PMP)',
    'Scrum Master': 'Certified Scrum Master (CSM)',
    'PMP': 'Project Management Professional (PMP)',
    'CSM': 'Certified Scrum Master (CSM)',
    
    // Programming Languages & Frameworks
    'Node': 'Node.js',
    'NodeJS': 'Node.js',
    'React JS': 'React',
    'ReactJS': 'React',
    'Next': 'Next.js',
    'NextJS': 'Next.js',
    'TypeScript': 'TypeScript',
    'TS': 'TypeScript',
    'JavaScript': 'JavaScript',
    'JS': 'JavaScript',
    
    // AI/ML
    'Machine Learning': 'Machine Learning',
    'ML': 'Machine Learning',
    'Artificial Intelligence': 'Artificial Intelligence',
    'AI': 'Artificial Intelligence',
    'NLP': 'Natural Language Processing',
    
    // Frontend
    'CSS3': 'CSS/SASS',
    'SASS': 'CSS/SASS',
    'SCSS': 'CSS/SASS',
    'CSS': 'CSS/SASS',
    
    // Infrastructure
    'Docker Container': 'Docker',
    'Kubernetes Container': 'Kubernetes',
    'K8s': 'Kubernetes',
    
    // Development Practices
    'Agile': 'Agile Methodologies',
    'Scrum': 'Agile Methodologies',
    'Code Reviews': 'Code Review',
    
    // Management
    'Team Management': 'Team Leadership',
    'Leadership': 'Team Leadership',
    'Project Manager': 'Project Management',
  };
  
  const normalized = normalizations[title] || title;
  console.log('Normalized title:', normalized);
  return normalized;
};

// Helper function to generate consistent IDs
const generateSkillId = (skill: UnifiedSkill): string => {
  const prefix = (() => {
    switch (skill.category) {
      case 'specialized':
        if (skill.subcategory.includes('AI') || skill.subcategory.includes('Machine Learning')) return 'AI';
        if (skill.subcategory.includes('Frontend')) return 'FE';
        if (skill.subcategory.includes('Backend')) return 'BE';
        if (skill.subcategory.includes('Infrastructure')) return 'INF';
        if (skill.subcategory.includes('Management')) return 'MGT';
        return 'SPEC';
      case 'common':
        return 'COM';
      case 'certification':
        return 'CERT';
      default:
        return 'SKILL';
    }
  })();

  // Use existing ID if it follows our convention
  if (skill.id && skill.id.startsWith(prefix)) {
    return skill.id;
  }

  // Generate new ID based on normalized title
  const normalizedTitle = normalizeSkillTitle(skill.title);
  console.log('Generating ID for skill:', { title: normalizedTitle, category: skill.category });
  return `${prefix}${Date.now().toString().slice(-4)}`;
};

// Combine all skills into the centralized database with normalized titles and consistent IDs
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
  title: normalizeSkillTitle(skill.title),
  id: generateSkillId(skill)
}))
// Remove duplicates based on normalized titles
.filter((skill, index, self) => {
  const normalizedTitle = normalizeSkillTitle(skill.title);
  const firstIndex = self.findIndex(s => normalizeSkillTitle(s.title) === normalizedTitle);
  const isDuplicate = index !== firstIndex;
  
  if (isDuplicate) {
    console.log('Removing duplicate skill:', { 
      title: skill.title, 
      normalizedTitle,
      originalId: skill.id,
      keepingId: self[firstIndex].id 
    });
  }
  
  return !isDuplicate;
});

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