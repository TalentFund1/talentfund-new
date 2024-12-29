import { Card } from "@/components/ui/card";
import { getUnifiedSkillData } from '../data/skillDatabaseService';

interface SkillCategoryCardsProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  employeeSkills: any[];
}

export const SkillCategoryCards = ({ 
  selectedCategory, 
  setSelectedCategory,
  employeeSkills
}: SkillCategoryCardsProps) => {
  const getSkillCountByCategory = (category: string) => {
    return employeeSkills.filter(skill => {
      const skillData = getUnifiedSkillData(skill.title);
      return category === 'all' || skillData.category === category;
    }).length;
  };

  const categories = [
    { id: "all", name: "All Categories", count: employeeSkills.length },
    { id: "specialized", name: "Specialized Skills", count: getSkillCountByCategory('specialized') },
    { id: "common", name: "Common Skills", count: getSkillCountByCategory('common') },
    { id: "certification", name: "Certification", count: getSkillCountByCategory('certification') }
  ];

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => setSelectedCategory(category.id)}
          className="w-full text-left"
        >
          <Card 
            className={`
              p-4 
              transition-colors 
              ${selectedCategory === category.id
                ? 'bg-primary-accent/5 border border-primary-accent'
                : 'bg-background border border-border hover:border-primary-accent/50'
              }
            `}
          >
            <div className="flex flex-col gap-1">
              <span className={`text-sm font-semibold ${
                selectedCategory === category.id ? 'text-primary-accent' : 'text-foreground'
              }`}>
                {category.name}
              </span>
              <span className="text-xs text-muted-foreground">
                {category.count} {category.count === 1 ? 'skill' : 'skills'}
              </span>
            </div>
          </Card>
        </button>
      ))}
    </div>
  );
};