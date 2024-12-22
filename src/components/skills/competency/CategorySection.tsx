import { roleSkills } from '../data/roleSkills';
import { useParams } from 'react-router-dom';
import { useToggledSkills } from '../context/ToggledSkillsContext';
import { UnifiedSkill } from '../types/SkillTypes';
import { getSkillCategory } from '../data/skills/categories/skillCategories';

interface CategorySectionProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

interface SkillCounts {
  specialized: number;
  common: number;
  certification: number;
  all: number;
}

export const CategorySection = ({ selectedCategory, setSelectedCategory }: CategorySectionProps) => {
  const { id } = useParams<{ id: string }>();
  const { toggledSkills } = useToggledSkills();
  const currentRoleSkills = roleSkills[id as keyof typeof roleSkills] || roleSkills["123"];

  const getToggledSkillsCount = (category: string) => {
    return currentRoleSkills.skills
      .filter(skill => skill.title && toggledSkills.has(skill.title))
      .filter(skill => category === 'all' || getSkillCategory(skill.title) === category)
      .length;
  };

  const skillCounts: SkillCounts = {
    specialized: getToggledSkillsCount('specialized'),
    common: getToggledSkillsCount('common'),
    certification: getToggledSkillsCount('certification'),
    all: getToggledSkillsCount('all')
  };

  console.log('CategorySection - Skill counts:', {
    roleId: id,
    counts: skillCounts,
    toggledSkills: Array.from(toggledSkills)
  });

  const categories = [
    { id: "all", name: "All Categories", count: skillCounts.all },
    { id: "specialized", name: "Specialized Skills", count: skillCounts.specialized },
    { id: "common", name: "Common Skills", count: skillCounts.common },
    { id: "certification", name: "Certification", count: skillCounts.certification }
  ];

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => setSelectedCategory(category.id)}
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