import { Card } from "@/components/ui/card";
import { technicalSkills, softSkills } from "../../skillsData";

interface CategoryCardsProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  skills: string[];
}

const getSkillCategory = (skill: string): string => {
  // Specialized skills are technical skills related to AI/ML, Cloud, or specialized domains
  const specializedKeywords = [
    'Machine Learning', 'Artificial Intelligence', 'Deep Learning', 
    'Neural Networks', 'Cloud', 'AWS', 'Azure', 'Computer Vision',
    'Natural Language Processing', 'Data Science'
  ];
  
  // Common skills are general programming languages and soft skills
  const commonKeywords = [
    'Python', 'JavaScript', 'Java', 'SQL', 'Communication',
    'Leadership', 'Project Management', 'Problem Solving'
  ];
  
  // Certification related skills
  const certificationKeywords = [
    'Certified', 'Certificate', 'Certification', 'AWS Certified',
    'Professional Certification', 'Licensed'
  ];

  if (specializedKeywords.some(keyword => skill.includes(keyword))) {
    return 'specialized';
  }
  if (certificationKeywords.some(keyword => skill.includes(keyword))) {
    return 'certification';
  }
  if (commonKeywords.some(keyword => skill.includes(keyword))) {
    return 'common';
  }
  return 'common'; // Default to common if no specific category is matched
};

export const CategoryCards = ({ selectedCategory, onCategoryChange, skills }: CategoryCardsProps) => {
  const categorizedSkills = {
    all: skills.length,
    specialized: skills.filter(skill => getSkillCategory(skill) === 'specialized').length,
    common: skills.filter(skill => getSkillCategory(skill) === 'common').length,
    certification: skills.filter(skill => getSkillCategory(skill) === 'certification').length
  };

  const categories = [
    { id: "all", name: "All Categories", count: categorizedSkills.all },
    { id: "specialized", name: "Specialized Skills", count: categorizedSkills.specialized },
    { id: "common", name: "Common Skills", count: categorizedSkills.common },
    { id: "certification", name: "Certifications", count: categorizedSkills.certification }
  ];

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`rounded-lg p-4 transition-colors ${
            selectedCategory === category.id
              ? 'bg-primary-accent/5 border border-primary-accent'
              : 'bg-background border border-border hover:border-primary-accent/50'
          }`}
        >
          <div className="flex flex-col items-start">
            <span className={`text-sm font-semibold mb-1 ${
              selectedCategory === category.id
                ? 'text-primary-accent'
                : 'text-foreground group-hover:text-primary-accent'
            }`}>
              {category.name}
            </span>
            <span className="text-xs text-muted-foreground">
              {category.count} skills
            </span>
          </div>
        </button>
      ))}
    </div>
  );
};