import { Card } from "@/components/ui/card";
import { useToggledSkills } from "./context/ToggledSkillsContext";
import { roleSkills } from "./data/roleSkills";
import { useParams } from "react-router-dom";

interface CategoryCardsProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  skillCount: {
    specialized: number;
    common: number;
    certification: number;
    all: number;
  };
}

export const CategoryCards = ({
  selectedCategory,
  onCategorySelect,
  skillCount,
}: CategoryCardsProps) => {
  const { id } = useParams<{ id: string }>();
  const { toggledSkills } = useToggledSkills();
  const currentRoleSkills = roleSkills[id as keyof typeof roleSkills];

  const getToggledSkillsCount = (skills: Array<{ title: string }>) => {
    return skills.filter(skill => toggledSkills.has(skill.title)).length;
  };

  const counts = {
    specialized: getToggledSkillsCount(currentRoleSkills?.specialized || []),
    common: getToggledSkillsCount(currentRoleSkills?.common || []),
    certification: getToggledSkillsCount(currentRoleSkills?.certifications || []),
  };

  const totalToggled = counts.specialized + counts.common + counts.certification;

  console.log('Toggled skills count:', {
    specialized: counts.specialized,
    common: counts.common,
    certification: counts.certification,
    total: totalToggled,
    allSkills: Array.from(toggledSkills)
  });

  const categories = [
    { id: "all", name: "All Categories", count: totalToggled },
    { id: "specialized", name: "Specialized Skills", count: counts.specialized },
    { id: "common", name: "Common Skills", count: counts.common },
    { id: "certification", name: "Certification", count: counts.certification }
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