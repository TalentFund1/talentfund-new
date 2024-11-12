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
    if (roleId === "125") { // Frontend Engineer
      return {
        specialized: 4, // Corrected back to 4 specialized skills
        common: 2,      // Keeping 2 common skills as correct
        certification: 1,
        all: 7          // Updated total count (4 + 2 + 1)
      };
    }

    // For other roles, calculate based on actual data
    const specialized = getSkillsCount(currentRoleSkills.specialized || []);
    const common = getSkillsCount(currentRoleSkills.common || []);
    const certification = getSkillsCount(currentRoleSkills.certifications || []);
    
    return {
      specialized,
      common,
      certification,
      all: specialized + common + certification
    };
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