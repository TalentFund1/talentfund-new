import { UnifiedSkill, SkillCategory, SkillWeight } from '../../types/SkillTypes';

export const defineSkills = (): UnifiedSkill[] => {
  const skills: UnifiedSkill[] = [
    {
      id: 'skill_1',
      title: 'React',
      name: 'React',
      subcategory: 'Frontend Development',
      category: 'specialized',
      businessCategory: 'Information Technology',
      weight: 'critical',
      level: 'intermediate',
      growth: '25%',
      salary: '120000',
      confidence: 'high',
      benchmarks: { B: true, R: true, M: true, O: true }
    },
    {
      id: 'skill_2',
      title: 'Node.js',
      name: 'Node.js',
      subcategory: 'Backend Development',
      category: 'specialized',
      businessCategory: 'Information Technology',
      weight: 'critical',
      level: 'intermediate',
      growth: '20%',
      salary: '110000',
      confidence: 'high',
      benchmarks: { B: true, R: true, M: true, O: true }
    },
    {
      id: 'skill_3',
      title: 'AWS Certified Solutions Architect',
      name: 'AWS Certified Solutions Architect',
      subcategory: 'Certification',
      category: 'certification',
      businessCategory: 'Information Technology',
      weight: 'necessary',
      level: 'advanced',
      growth: '15%',
      salary: '130000',
      confidence: 'high',
      benchmarks: { B: true, R: true, M: true, O: true }
    },
    {
      id: 'skill_4',
      title: 'Project Management',
      name: 'Project Management',
      subcategory: 'Management',
      category: 'common',
      businessCategory: 'Business',
      weight: 'necessary',
      level: 'intermediate',
      growth: '10%',
      salary: '90000',
      confidence: 'medium',
      benchmarks: { B: true, R: true, M: true, O: true }
    },
    {
      id: 'skill_5',
      title: 'Machine Learning',
      name: 'Machine Learning',
      subcategory: 'Data Science',
      category: 'specialized',
      businessCategory: 'Information Technology',
      weight: 'critical',
      level: 'beginner',
      growth: '30%',
      salary: '115000',
      confidence: 'medium',
      benchmarks: { B: true, R: true, M: true, O: true }
    }
  ];

  return skills;
};
