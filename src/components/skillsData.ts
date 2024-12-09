import { 
  aiSkills, 
  infrastructureSkills, 
  developmentSkills, 
  generalSkills, 
  managementSkills,
  SkillCategory 
} from './skills/data/skills/skillCategories';

// Combine all skills into one array
export const skills: SkillCategory[] = [
  ...aiSkills,
  ...infrastructureSkills,
  ...developmentSkills,
  ...generalSkills,
  ...managementSkills
];

// Helper function to get unique skills by title
const getUniqueSkills = (skillsArray: SkillCategory[]) => {
  const seen = new Set();
  return skillsArray.filter(skill => {
    const duplicate = seen.has(skill.title);
    seen.add(skill.title);
    return !duplicate;
  });
};

// Categorize skills into technical and soft skills and map to titles
export const technicalSkills = getUniqueSkills(skills
  .filter(skill => 
    ['AI & ML', 'AI Applications', 'Container Technology', 'CI/CD',
     'Infrastructure as Code', 'Cloud Platforms', 'Frontend Frameworks',
     'Backend Development', 'Development Tools'].includes(skill.subcategory)
  ))
  .map(skill => skill.title);

export const softSkills = getUniqueSkills(skills
  .filter(skill => 
    ['Soft Skills', 'Leadership', 'Management'].includes(skill.subcategory)
  ))
  .map(skill => skill.title);

// Export full skill objects for when we need the complete data
export const technicalSkillObjects = getUniqueSkills(skills.filter(skill => 
  ['AI & ML', 'AI Applications', 'Container Technology', 'CI/CD',
   'Infrastructure as Code', 'Cloud Platforms', 'Frontend Frameworks',
   'Backend Development', 'Development Tools'].includes(skill.subcategory)
));

export const softSkillObjects = getUniqueSkills(skills.filter(skill => 
  ['Soft Skills', 'Leadership', 'Management'].includes(skill.subcategory)
));

console.log('Loaded skills:', {
  total: skills.length,
  technical: technicalSkills.length,
  soft: softSkills.length
});