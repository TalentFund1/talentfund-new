import { roleSkills } from '../skills/data/roleSkills';
import { useParams } from 'react-router-dom';
import { useToggledSkills } from '../skills/context/ToggledSkillsContext';
import { useRoleStore } from './RoleBenchmark';

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
  const { selectedRole } = useRoleStore();
  const currentRoleSkills = roleSkills[selectedRole as keyof typeof roleSkills];

  // Get all toggled skills that exist in the specialized category
  const specializedCount = currentRoleSkills.specialized
    .filter(skill => toggledSkills.has(skill.title))
    .length;

  // Get all toggled skills that exist in the common category
  const commonCount = currentRoleSkills.common
    .filter(skill => toggledSkills.has(skill.title))
    .length;

  // Get all toggled skills that exist in the certifications category
  const certificationCount = currentRoleSkills.certifications
    .filter(skill => toggledSkills.has(skill.title))
    .length;

  // Total count is the sum of all categories
  const totalCount = specializedCount + commonCount + certificationCount;

  console.log('CategorySection - Counts:', {
    roleId: selectedRole,
    specialized: {
      count: specializedCount,
      skills: currentRoleSkills.specialized
        .filter(skill => toggledSkills.has(skill.title))
        .map(s => s.title)
    },
    common: {
      count: commonCount,
      skills: currentRoleSkills.common
        .filter(skill => toggledSkills.has(skill.title))
        .map(s => s.title)
    },
    certification: {
      count: certificationCount,
      skills: currentRoleSkills.certifications
        .filter(skill => toggledSkills.has(skill.title))
        .map(s => s.title)
    },
    total: totalCount
  });

  const categories = [
    { id: "all", name: "All Types", count: totalCount },
    { id: "specialized", name: "Specialized Skills", count: specializedCount },
    { id: "common", name: "Common Skills", count: commonCount },
    { id: "certification", name: "Certification", count: certificationCount }
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
              {category.count} {category.count === 1 ? 'skill' : 'skills'}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
};