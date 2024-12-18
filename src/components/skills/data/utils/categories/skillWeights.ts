export const getSkillWeight = (skillTitle: string): 'critical' | 'technical' | 'necessary' => {
  // Critical skills - core competencies and essential skills
  const criticalSkills = [
    'Machine Learning',
    'Deep Learning',
    'System Design',
    'Technical Architecture',
    'AWS Certified Solutions Architect',
    'AWS Certified Machine Learning - Specialty',
    'Cloud Architecture',
    'Git',  // Added Git as a critical skill
    'Team Leadership'
  ];

  // Technical skills - specialized technical competencies
  const technicalSkills = [
    'Node.js',
    'React',
    'TypeScript',
    'Shell Scripting',  // Added Shell Scripting as technical skill
    'CSS/SASS',
    'Database Design',
    'API Development'
  ];

  // Check skill type
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