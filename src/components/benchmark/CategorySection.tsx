import { roleSkills } from '../skills/data/roleSkills';
import { useParams } from 'react-router-dom';
import { useToggledSkills } from '../skills/context/ToggledSkillsContext';
import { filterSkillsByCategory } from './skills-matrix/skillCategories';

interface CategorySectionProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  toggledSkills: Set<string>;
}

interface SkillCounts {
  specialized: number;
  common: number;
  certification: number;
  all: number;
}

export const CategorySection = ({ 
  selectedCategory, 
  onCategorySelect,
  toggledSkills
}: CategorySectionProps) => {
  const { id } = useParams<{ id: string }>();
  const currentRoleSkills = roleSkills[id as keyof typeof roleSkills] || roleSkills["123"];

  // Get all skills for the current role
  const allSkills = [
    ...currentRoleSkills.specialized,
    ...currentRoleSkills.common,
    ...currentRoleSkills.certifications
  ];

  // Filter skills by category and count them
  const skillCounts: SkillCounts = {
    specialized: filterSkillsByCategory(allSkills, "specialized").length,
    common: filterSkillsByCategory(allSkills, "common").length,
    certification: filterSkillsByCategory(allSkills, "certification").length,
    all: allSkills.length
  };

  const categories = [
    { id: "all", title: "All Categories", count: skillCounts.all },
    { id: "specialized", title: "Specialized Skills", count: skillCounts.specialized },
    { id: "common", title: "Common Skills", count: skillCounts.common },
    { id: "certification", title: "Certification", count: skillCounts.certification }
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
              {category.title}
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