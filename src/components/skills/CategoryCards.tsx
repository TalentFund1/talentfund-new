import { Card } from "@/components/ui/card";
import { roleSkills } from './data/roleSkills';
import { useParams } from 'react-router-dom';

interface CategoryCardsProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  roleId: string;
}

export const CategoryCards = ({ selectedCategory, onCategorySelect, roleId }: CategoryCardsProps) => {
  const categories = [
    { id: "all", name: "All Skill Type", count: 0 },
    { id: "critical", name: "Critical Skills", count: 0 },
    { id: "technical", name: "Technical Skills", count: 0 },
    { id: "necessary", name: "Necessary Skills", count: 0 }
  ];

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategorySelect(category.id)}
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