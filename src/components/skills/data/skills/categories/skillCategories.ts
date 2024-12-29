export const skillCategories = {
  specialized: {
    label: 'Specialized Skills',
    description: 'Core technical skills specific to the role'
  },
  common: {
    label: 'Common Skills',
    description: 'General skills applicable across roles'
  },
  certification: {
    label: 'Certifications',
    description: 'Professional certifications and qualifications'
  }
};

export type SkillCategoryKey = keyof typeof skillCategories;