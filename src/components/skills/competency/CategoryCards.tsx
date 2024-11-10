import { Card } from "@/components/ui/card";

interface CategoryCardsProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryCards = ({ selectedCategory, onCategoryChange }: CategoryCardsProps) => {
  const categories = [
    { id: "all", name: "All Categories", count: 28 },
    { id: "specialized", name: "Specialized Skills", count: 15 },
    { id: "common", name: "Common Skills", count: 10 },
    { id: "certification", name: "Certifications", count: 3 }
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