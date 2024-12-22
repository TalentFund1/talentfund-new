import { Card } from "@/components/ui/card";
import { roleSkills } from '../skills/data/roleSkills';
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";
import { getSkillCategory } from "../skills/data/skills/categories/skillCategories";

interface CategoryCardsProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  roleId: string;
  selectedLevel: string;
}

export const CategoryCards = ({ 
  selectedCategory, 
  onCategorySelect,
  roleId,
  selectedLevel 
}: CategoryCardsProps) => {
  const { toggledSkills } = useToggledSkills();
  const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills] || roleSkills["123"];

  // Get counts for each category based on toggled skills
  const getSkillCount = (category: string) => {
    const allSkills = [
      ...currentRoleSkills.specialized,
      ...currentRoleSkills.common,
      ...currentRoleSkills.certifications
    ];

    return allSkills
      .filter(skill => toggledSkills.has(skill.title))
      .filter(skill => category === 'all' || getSkillCategory(skill.title) === category)
      .length;
  };

  const skillCounts = {
    all: getSkillCount('all'),
    specialized: getSkillCount('specialized'),
    common: getSkillCount('common'),
    certification: getSkillCount('certification')
  };

  console.log('Category counts calculated:', {
    total: skillCounts.all,
    specialized: skillCounts.specialized,
    common: skillCounts.common,
    certification: skillCounts.certification,
    toggledSkills: Array.from(toggledSkills)
  });

  const categories = [
    { id: "all", name: "All Categories", count: skillCounts.all },
    { id: "specialized", name: "Specialized Skills", count: skillCounts.specialized },
    { id: "common", name: "Common Skills", count: skillCounts.common },
    { id: "certification", name: "Certification", count: skillCounts.certification }
  ];

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