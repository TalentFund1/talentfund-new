import { Card } from "@/components/ui/card";
import { SkillCategory } from "../types/sharedSkillTypes";

interface CategoryCardsProps {
  selectedCategory: SkillCategory | "all";
  onCategorySelect: (category: SkillCategory | "all") => void;
  roleId: string;
}

export const CategoryCards = ({
  selectedCategory,
  onCategorySelect,
  roleId
}: CategoryCardsProps) => {
  const categories: SkillCategory[] = ["specialized", "common", "certification"];

  return (
    <div className="flex space-x-4">
      {categories.map((category) => (
        <Card
          key={category}
          className={`p-4 cursor-pointer ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
          onClick={() => onCategorySelect(category)}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </Card>
      ))}
      <Card
        className={`p-4 cursor-pointer ${selectedCategory === "all" ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
        onClick={() => onCategorySelect("all")}
      >
        All
      </Card>
    </div>
  );
};
