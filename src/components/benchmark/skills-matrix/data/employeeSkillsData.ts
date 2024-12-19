import { UnifiedSkill } from '../../../skills/types/SkillTypes';
import { getUnifiedSkillData } from '../../../skills/data/skillDatabaseService';
import { normalizeSkillTitle } from '../../../skills/utils/normalization';
import { getSkillCategory } from '../../../skills/data/skills/categories/skillCategories';

// Define initial skills for each employee
export const employeeSkills: { [key: string]: UnifiedSkill[] } = {
  "123": [
    "Machine Learning",
    "Deep Learning", 
    "Natural Language Processing",
    "Computer Vision",
    "TensorFlow",
    "Python",
    "Problem Solving",
    "Technical Writing",
    "Git Version Control",
    "Communication"
  ].map(title => {
    const normalizedTitle = normalizeSkillTitle(title);
    const skillData = getUnifiedSkillData(normalizedTitle);
    console.log('Loading employee skill:', {
      title: normalizedTitle,
      category: getSkillCategory(normalizedTitle)
    });
    return {
      ...skillData,
      title: normalizedTitle,
      category: getSkillCategory(normalizedTitle)
    };
  }),

  "124": [
    "Node.js",
    "Database Design",
    "API Development", 
    "System Architecture",
    "Kubernetes",
    "Problem Solving",
    "Code Review",
    "Agile Methodologies",
    "Git Version Control",
    "Communication"
  ].map(title => {
    const normalizedTitle = normalizeSkillTitle(title);
    const skillData = getUnifiedSkillData(normalizedTitle);
    return {
      ...skillData,
      title: normalizedTitle,
      category: getSkillCategory(normalizedTitle)
    };
  }),

  "125": [
    "React",
    "TypeScript",
    "Next.js",
    "CSS/SASS",
    "Performance Optimization",
    "Problem Solving",
    "Code Review",
    "Agile Methodologies",
    "Git Version Control",
    "Communication"
  ].map(title => {
    const normalizedTitle = normalizeSkillTitle(title);
    const skillData = getUnifiedSkillData(normalizedTitle);
    return {
      ...skillData,
      title: normalizedTitle,
      category: getSkillCategory(normalizedTitle)
    };
  }),

  "126": [
    "System Design",
    "Technical Architecture",
    "Risk Management",
    "Team Leadership",
    "Project Management",
    "Strategic Planning",
    "Stakeholder Management",
    "Agile Methodologies",
    "Git Version Control",
    "Communication"
  ].map(title => {
    const normalizedTitle = normalizeSkillTitle(title);
    const skillData = getUnifiedSkillData(normalizedTitle);
    return {
      ...skillData,
      title: normalizedTitle,
      category: getSkillCategory(normalizedTitle)
    };
  })
};