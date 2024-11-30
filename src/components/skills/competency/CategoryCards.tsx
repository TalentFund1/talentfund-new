import { Card } from "@/components/ui/card";
import { useToggledSkills } from "../context/ToggledSkillsContext";

interface CategoryCardsProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryCards = ({ selectedCategory, onCategoryChange }: CategoryCardsProps) => {
  const { toggledSkills } = useToggledSkills();
  
  // Get all toggled skills as an array
  const skillsArray = Array.from(toggledSkills);

  const categories = [
    { id: "all", name: "All Skill Type", count: skillsArray.length },
    { 
      id: "specialized", 
      name: "Specialized Skills", 
      count: skillsArray.filter(skill => 
        getSkillCategory(skill) === 'specialized'
      ).length 
    },
    { 
      id: "common", 
      name: "Common Skills", 
      count: skillsArray.filter(skill => 
        getSkillCategory(skill) === 'common'
      ).length 
    },
    { 
      id: "certification", 
      name: "Certifications", 
      count: skillsArray.filter(skill => 
        getSkillCategory(skill) === 'certification'
      ).length 
    }
  ];

  console.log('CategoryCards render:', {
    totalSkills: skillsArray.length,
    categories: categories.map(cat => ({
      name: cat.name,
      count: cat.count
    }))
  });

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

const getSkillCategory = (skill: string): string => {
  const specializedSkills = ['Amazon Web Services', 'Machine Learning', 'Artificial Intelligence'];
  const commonSkills = ['Python', 'JavaScript', 'Communication'];
  const certifications = ['AWS Certified', 'Google Cloud', 'Azure'];

  if (specializedSkills.some(s => skill.includes(s))) return 'specialized';
  if (commonSkills.some(s => skill.includes(s))) return 'common';
  if (certifications.some(s => skill.includes(s))) return 'certification';
  return 'all';
};