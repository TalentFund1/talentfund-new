import { Card } from "@/components/ui/card";
import { SkillCategory } from "../types/SkillTypes";
import { getSkillsByCategory } from "../data/skills/categories/skillCategories";

interface CategoryCardsProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  skillCount: {
    all: number;
    critical: number;
    technical: number;
    necessary: number;
  };
}

export const CategoryCards = ({
  selectedCategory,
  onCategorySelect,
  skillCount,
}: CategoryCardsProps) => {
  const categories: SkillCategory[] = ["all", "specialized", "common", "certification"];

  return (
    <div className="grid grid-cols-4 gap-4">
      {categories.map((category) => (
        <Card
          key={category}
          className={`p-4 cursor-pointer transition-colors ${
            selectedCategory === category ? "bg-primary-accent/5 border border-primary-accent" : "bg-background border border-border hover:border-primary-accent/50"
          }`}
          onClick={() => onCategorySelect(category)}
        >
          <h3 className="text-lg font-semibold">{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
          <p className="text-sm text-muted-foreground">{skillCount[category] || 0} skills</p>
        </Card>
      ))}
    </div>
  );
};
