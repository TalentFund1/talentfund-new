import { Card } from "@/components/ui/card";
import { roleSkills } from '../skills/data/roleSkills';
import { useParams } from 'react-router-dom';
import { useToggledSkills } from '../skills/context/ToggledSkillsContext';

interface CategoryCardsProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryCards = ({ selectedCategory, onCategoryChange }: CategoryCardsProps) => {
  const { id } = useParams<{ id: string }>();
  const { toggledSkills } = useToggledSkills();
  const currentRoleSkills = roleSkills[id as keyof typeof roleSkills] || roleSkills["123"];

  const getToggledSkillsCount = (skills: Array<{ title: string }>) => {
    return skills.filter(skill => toggledSkills.has(skill.title)).length;
  };

  const skillCounts = {
    specialized: getToggledSkillsCount(currentRoleSkills.specialized || []),
    common: getToggledSkillsCount(currentRoleSkills.common || []),
    certification: getToggledSkillsCount(currentRoleSkills.certifications || []),
    all: 0 // Will be calculated below
  };

  // Calculate total count
  skillCounts.all = skillCounts.specialized + skillCounts.common + skillCounts.certification;

  console.log('Category skill counts:', skillCounts);

  const categories = [
    { id: "all", name: "All Categories", count: skillCounts.all },
    { id: "specialized", name: "Specialized Skills", count: skillCounts.specialized },
    { id: "common", name: "Common Skills", count: skillCounts.common },
    { id: "certification", name: "Certifications", count: skillCounts.certification }
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