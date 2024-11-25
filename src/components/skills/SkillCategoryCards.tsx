import { Card } from "@/components/ui/card";

interface SkillCategoryCardsProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  skills: any[];
}

export const SkillCategoryCards = ({ 
  selectedCategory, 
  onCategorySelect,
  skills
}: SkillCategoryCardsProps) => {
  const getCategoryCount = (category: string) => {
    if (category === 'all') return skills.length;
    
    const categoryMap: { [key: string]: string[] } = {
      critical: ['Machine Learning', 'Deep Learning', 'Natural Language Processing', 'Computer Vision', 'TensorFlow'],
      technical: ['Python', 'Technical Writing'],
      necessary: ['Problem Solving', 'AWS Certified Machine Learning - Specialty', 'TensorFlow Developer Certificate']
    };

    return skills.filter(skill => 
      categoryMap[category]?.includes(skill.title)
    ).length;
  };

  const categories = [
    { id: "all", name: "All Categories", count: getCategoryCount('all') },
    { id: "critical", name: "Critical Skills", count: getCategoryCount('critical') },
    { id: "technical", name: "Technical Skills", count: getCategoryCount('technical') },
    { id: "necessary", name: "Necessary Skills", count: getCategoryCount('necessary') }
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