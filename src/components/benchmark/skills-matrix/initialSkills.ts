import { UnifiedSkill, SkillCategory } from '../../skills/types/SkillTypes';
import { getSkillByTitle } from '../../skills/data/skills/allSkills';

// Employee skills database - using universal skills database
const employeeSkills: { [key: string]: string[] } = {
  "123": [
    "Machine Learning",
    "Deep Learning",
    "Natural Language Processing",
    "Computer Vision",
    "Python",
    "TensorFlow"
  ],
  "124": [
    "Node.js",
    "Database Design",
    "API Development",
    "System Architecture",
    "Kubernetes",
    "GraphQL",
    "Problem Solving",
    "Code Review",
    "Agile Methodologies",
    "Git Version Control",
    "Communication"
  ],
  "125": [
    "React",
    "TypeScript",
    "HTML",
    "CSS",
    "JavaScript",
    "Web Development",
    "UI/UX Design",
    "Frontend Architecture",
    "Performance Optimization"
  ],
  "126": [
    "Team Leadership",
    "Project Management",
    "Agile Methodologies",
    "Strategic Planning",
    "Performance Management",
    "Communication",
    "Problem Solving",
    "Decision Making"
  ]
};

const determineDefaultCategory = (skillTitle: string): SkillCategory => {
  const technicalSkills = ['Node.js', 'React', 'TypeScript', 'Python', 'Machine Learning'];
  const certificationSkills = ['AWS Certified', 'Kubernetes Administrator', 'Professional Certification'];
  
  if (certificationSkills.some(cert => skillTitle.includes(cert))) {
    return 'certification';
  }
  if (technicalSkills.includes(skillTitle)) {
    return 'specialized';
  }
  return 'common';
};

export const getEmployeeSkills = (id: string): UnifiedSkill[] => {
  console.log('Getting skills for employee:', id);
  
  // Get skill titles for this employee
  const skillTitles = employeeSkills[id] || [];
  
  // Convert skill titles to UnifiedSkill objects using the universal database
  const skills = skillTitles.map(title => {
    const universalSkill = getSkillByTitle(title);
    if (universalSkill) {
      console.log('Found skill in universal database:', {
        title,
        category: universalSkill.category
      });
      return universalSkill;
    } else {
      console.warn('Skill not found in universal database:', title);
      // Return a default skill object if not found, with proper SkillCategory type
      return {
        id: `default-${title}`,
        title,
        category: determineDefaultCategory(title),
        businessCategory: 'Information Technology',
        subcategory: 'General',
        weight: 'necessary',
        level: 'unspecified',
        growth: '0%',
        salary: '$0',
        confidence: 'low',
        benchmarks: { B: false, R: false, M: false, O: false }
      } as UnifiedSkill;
    }
  });

  console.log('Retrieved skills:', {
    employeeId: id,
    skillCount: skills.length,
    skills: skills.map(s => ({
      title: s.title,
      category: s.category
    }))
  });

  return skills;
};