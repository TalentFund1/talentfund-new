import { roleSkills } from '../skills/data/roleSkills';
import { useParams } from 'react-router-dom';
import { useToggledSkills } from '../../components/skills/context/ToggledSkillsContext';

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

  const getSkillsCount = (skills: Array<{ title: string }>) => {
    return skills ? skills.filter(skill => toggledSkills.has(skill.title)).length : 0;
  };

  const getSkillCountsByRole = (roleId: string): SkillCounts => {
    const currentSkills = roleSkills[roleId as keyof typeof roleSkills];
    
    if (!currentSkills) {
      return { specialized: 0, common: 0, certification: 0, all: 0 };
    }

    // AI Engineer role (ID: 123)
    if (roleId === "123") {
      return {
        specialized: 4,
        common: 1,
        certification: 1,
        all: 6
      };
    }

    // Frontend Engineer role (ID: 125)
    if (roleId === "125") {
      return {
        specialized: 4,
        common: 1,
        certification: 1,
        all: 6
      };
    }

    // Backend Engineer role (ID: 124)
    if (roleId === "124") {
      return {
        specialized: 5,
        common: 3,
        certification: 3,
        all: 11
      };
    }

    // For other roles, calculate based on actual data
    const specialized = getSkillsCount(currentSkills.specialized || []);
    const common = getSkillsCount(currentSkills.common || []);
    const certification = getSkillsCount(currentSkills.certifications || []);
    const all = specialized + common + certification;

    return { specialized, common, certification, all };
  };

  const skillCounts = getSkillCountsByRole(id || "123");

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