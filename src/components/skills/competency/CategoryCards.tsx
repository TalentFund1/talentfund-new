import { getSkillsByCategory } from "../data/skills/categories/skillCategories";
import { useToggledSkills } from "../context/ToggledSkillsContext";
import { getSkillCategory } from '../data/skills/categories/skillCategories';
import { getUnifiedSkillData } from '../data/skillDatabaseService';

interface CategoryCardsProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryCards = ({ selectedCategory, onCategoryChange }: CategoryCardsProps) => {
  const { toggledSkills } = useToggledSkills();
  
  // Get all toggled skills as an array
  const skillsArray = Array.from(toggledSkills);

  console.log('CategoryCards - Toggled skills:', skillsArray);

  // Use the universal database to get skill categories
  const getCategoryCount = (category: string) => {
    return skillsArray.filter(skillTitle => {
      const skillData = getUnifiedSkillData(skillTitle);
      return category === 'all' || skillData.category === category;
    }).length;
  };

  const categories = [
    { 
      id: "all", 
      name: "All Skill Type", 
      count: skillsArray.length 
    },
    { 
      id: "specialized", 
      name: "Specialized Skills", 
      count: getCategoryCount('specialized')
    },
    { 
      id: "common", 
      name: "Common Skills", 
      count: getCategoryCount('common')
    },
    { 
      id: "certification", 
      name: "Certifications", 
      count: getCategoryCount('certification')
    }
  ];

  console.log('CategoryCards - Category counts:', categories.map(cat => ({
    name: cat.name,
    count: cat.count
  })));

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
