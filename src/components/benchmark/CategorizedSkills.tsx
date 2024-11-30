import { RequirementSection } from "./RequirementSection";
import { useParams } from "react-router-dom";
import { roleSkills } from "../skills/data/roleSkills";

interface CategorySectionProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  toggledSkills: Set<string>;
  skillCounts?: {
    specialized: number;
    common: number;
    certification: number;
    all: number;
  };
}

export const CategorizedSkills = ({ 
  selectedCategory, 
  onCategorySelect,
  toggledSkills,
  skillCounts
}: CategorySectionProps) => {
  const { id } = useParams<{ id: string }>();
  
  console.log('Rendering CategorizedSkills with:', {
    selectedCategory,
    toggledSkillsCount: toggledSkills.size,
    skillCounts
  });

  const counts = skillCounts || {
    specialized: 0,
    common: 0,
    certification: 0,
    all: 0
  };

  const categories = [
    { id: "all", title: "All Categories", count: counts.all },
    { id: "specialized", title: "Specialized Skills", count: counts.specialized },
    { id: "common", title: "Common Skills", count: counts.common },
    { id: "certification", title: "Certification", count: counts.certification }
  ];

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {categories.map((category) => (
        <RequirementSection
          key={category.id}
          title={category.title}
          count={category.count}
          skills={[]}
          isSelected={selectedCategory === category.id}
          onClick={() => onCategorySelect(category.id)}
        />
      ))}
    </div>
  );
};