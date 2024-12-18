import { SkillWeight } from '../../../types/SkillTypes';

export const getSkillWeight = (skillTitle: string): SkillWeight => {
  const criticalSkills = [
    'Machine Learning',
    'Deep Learning',
    'System Design',
    'Technical Architecture',
    'AWS Certified Solutions Architect',
    'AWS Certified Machine Learning - Specialty',
    'Cloud Architecture',
    'Git',
    'Git Version Control',
    'Team Leadership',
    'AWS',
    'Kubernetes',
    'Docker',
    'Jenkins',
    'Terraform',
    'Node.js',
    'Database Design',
    'API Development'
  ];

  const technicalSkills = [
    'React',
    'TypeScript',
    'Shell Scripting',
    'CSS/SASS',
    'Flutter',
    'GraphQL',
    'Linux Administration',
    'Python',
    'TensorFlow',
    'Natural Language Processing',
    'Computer Vision',
    'System Architecture',
    'Microservices'
  ];

  if (criticalSkills.includes(skillTitle)) {
    console.log(`${skillTitle} categorized as critical skill`);
    return 'critical';
  }
  
  if (technicalSkills.includes(skillTitle)) {
    console.log(`${skillTitle} categorized as technical skill`);
    return 'technical';
  }
  
  console.log(`${skillTitle} categorized as necessary skill`);
  return 'necessary';
};