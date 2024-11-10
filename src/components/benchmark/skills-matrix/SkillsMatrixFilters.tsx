import { CategorySelect } from "@/components/skills/competency/CategorySelect";

interface SkillsMatrixFiltersProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export const SkillsMatrixFilters = ({ 
  selectedCategory, 
  setSelectedCategory 
}: SkillsMatrixFiltersProps) => {
  return (
    <div className="flex justify-between items-center -mt-1">
      <CategorySelect
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
    </div>
  );
};