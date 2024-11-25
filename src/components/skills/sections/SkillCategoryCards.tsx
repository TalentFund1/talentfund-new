import { Card } from "@/components/ui/card";

interface SkillCategoryCardsProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  categoryCounts: {
    all: number;
    critical: number;
    technical: number;
    necessary: number;
  };
}

export const SkillCategoryCards = ({
  selectedCategory,
  onCategorySelect,
  categoryCounts
}: SkillCategoryCardsProps) => {
  const categories = [
    { id: "all", title: "All Categories", count: categoryCounts.all },
    { id: "critical", title: "Critical Skills", count: categoryCounts.critical },
    { id: "technical", title: "Technical Skills", count: categoryCounts.technical },
    { id: "necessary", title: "Necessary Skills", count: categoryCounts.necessary }
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
                {category.title}
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