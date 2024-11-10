import { Card } from "@/components/ui/card";
import { skillsByCategory } from "./skillsData";

interface CategoryCardsProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  currentTrack: "Professional" | "Managerial";
}

type Skill = {
  name: string;
  level: string;
  required: string;
};

type SkillLevels = {
  [key: string]: Skill[];
};

export const CategoryCards = ({ selectedCategory, onCategoryChange, currentTrack = "Professional" }: CategoryCardsProps) => {
  const getSkillCount = (category: string) => {
    if (!currentTrack) return 0;
    
    const trackKey = currentTrack.toLowerCase();
    const categoryData = skillsByCategory[category]?.[trackKey] as SkillLevels | undefined;
    if (!categoryData) return 0;

    const uniqueSkills = new Set<string>();
    Object.values(categoryData).forEach((levelSkills: Skill[]) => {
      levelSkills.forEach(skill => uniqueSkills.add(skill.name));
    });
    return uniqueSkills.size;
  };

  const categories = [
    { id: "all", name: "All Categories", count: getSkillCount("all") },
    { id: "specialized", name: "Specialized Skills", count: getSkillCount("specialized") },
    { id: "common", name: "Common Skills", count: getSkillCount("common") },
    { id: "certification", name: "Certifications", count: getSkillCount("certification") } // Updated here
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