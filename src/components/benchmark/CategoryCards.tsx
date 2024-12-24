import { Card } from "@/components/ui/card";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";
import { getUnifiedSkillData } from "../skills/data/skillDatabaseService";

interface CategoryCardsProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  roleId: string;
}

export const CategoryCards = ({ 
  selectedCategory, 
  onCategorySelect,
  roleId,
}: CategoryCardsProps) => {
  const { toggledSkills } = useToggledSkills();
  
  const getSkillCountByCategory = (category: string) => {
    const skillsArray = Array.from(toggledSkills);
    
    console.log('Calculating skill count for category:', {
      category,
      totalSkills: skillsArray.length,
      toggledSkills: Array.from(toggledSkills)
    });

    return skillsArray.filter(skillTitle => {
      if (!skillTitle) {
        console.warn('Found undefined skill title in toggled skills');
        return false;
      }
      const skillData = getUnifiedSkillData(skillTitle);
      return category === 'all' || skillData.category === category;
    }).length;
  };

  const categories = [
    { id: "all", name: "All Categories", count: Array.from(toggledSkills).length },
    { id: "specialized", name: "Specialized Skills", count: getSkillCountByCategory("specialized") },
    { id: "common", name: "Common Skills", count: getSkillCountByCategory("common") },
    { id: "certification", name: "Certification", count: getSkillCountByCategory("certification") }
  ];

  console.log('CategoryCards - Category counts:', {
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
          onClick={() => onCategorySelect(category.id)}
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