import { Card } from "@/components/ui/card";

interface CategoryCardsProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryCards = ({ selectedCategory, onCategoryChange }: CategoryCardsProps) => {
  const categories = [
    {
      id: "all",
      title: "All Categories",
      count: 28,
      description: "skills"
    },
    {
      id: "specialized",
      title: "Specialized Skills",
      count: 15,
      description: "skills"
    },
    {
      id: "common",
      title: "Common Skills",
      count: 10,
      description: "skills"
    },
    {
      id: "certification",
      title: "Certification",
      count: 3,
      description: "skills"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {categories.map((category) => (
        <Card
          key={category.id}
          className={`p-4 cursor-pointer transition-all duration-200 hover:border-primary-accent ${
            selectedCategory === category.id
              ? "border-2 border-primary-accent bg-primary-accent/5"
              : "border border-border hover:bg-background/80"
          }`}
          onClick={() => onCategoryChange(category.id)}
        >
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-foreground">
                {category.title}
              </h3>
              <span className="bg-[#8073ec]/10 text-[#1F2144] rounded-full px-2 py-0.5 text-xs font-medium">
                {category.count}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {category.description}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
};