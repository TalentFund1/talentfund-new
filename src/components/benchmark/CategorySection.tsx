import { roleSkills } from '../skills/data/roleSkills';
import { useParams } from 'react-router-dom';
import { useToggledSkills } from '../skills/context/ToggledSkillsContext';

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

  // Get all toggled skills as an array
  const skillsArray = Array.from(toggledSkills);

  console.log('CategorySection render:', {
    roleId: id,
    totalSkills: skillsArray.length,
    toggledSkills: skillsArray
  });

  const getSkillCategory = (skill: string): string => {
    if (currentRoleSkills.specialized.some(s => s.title === skill)) return 'specialized';
    if (currentRoleSkills.common.some(s => s.title === skill)) return 'common';
    if (currentRoleSkills.certifications.some(s => s.title === skill)) return 'certification';
    return 'all';
  };

  const skillCounts: SkillCounts = {
    specialized: skillsArray.filter(skill => getSkillCategory(skill) === 'specialized').length,
    common: skillsArray.filter(skill => getSkillCategory(skill) === 'common').length,
    certification: skillsArray.filter(skill => getSkillCategory(skill) === 'certification').length,
    all: skillsArray.length
  };

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