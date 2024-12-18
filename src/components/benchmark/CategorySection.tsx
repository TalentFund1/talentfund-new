import { roleSkills } from '../skills/data/roleSkills';
import { useParams } from 'react-router-dom';
import { useToggledSkills } from '../skills/context/ToggledSkillsContext';
import { useRoleStore } from './RoleBenchmark';
import { normalizeSkillTitle } from '../skills/utils/normalization';

interface CategorySectionProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export const CategorySection = ({ selectedCategory, setSelectedCategory }: CategorySectionProps) => {
  const { id } = useParams<{ id: string }>();
  const { toggledSkills } = useToggledSkills();
  const { selectedRole } = useRoleStore();
  const currentRoleSkills = roleSkills[selectedRole as keyof typeof roleSkills];

  // Create sets of normalized titles for deduplication
  const specializedTitles = new Set(currentRoleSkills.specialized.map(skill => 
    normalizeSkillTitle(skill.title)
  ));
  const commonTitles = new Set(currentRoleSkills.common.map(skill => 
    normalizeSkillTitle(skill.title)
  ));
  const certificationTitles = new Set(currentRoleSkills.certifications.map(skill => 
    normalizeSkillTitle(skill.title)
  ));

  // Get counts of unique toggled skills per category
  const specializedCount = Array.from(toggledSkills)
    .filter(skill => specializedTitles.has(normalizeSkillTitle(skill)))
    .length;

  const commonCount = Array.from(toggledSkills)
    .filter(skill => commonTitles.has(normalizeSkillTitle(skill)))
    .length;

  const certificationCount = Array.from(toggledSkills)
    .filter(skill => certificationTitles.has(normalizeSkillTitle(skill)))
    .length;

  // Total count is the sum of all categories (already deduplicated)
  const totalCount = specializedCount + commonCount + certificationCount;

  console.log('CategorySection - Counts:', {
    roleId: selectedRole,
    specialized: {
      count: specializedCount,
      skills: Array.from(toggledSkills)
        .filter(skill => specializedTitles.has(normalizeSkillTitle(skill)))
    },
    common: {
      count: commonCount,
      skills: Array.from(toggledSkills)
        .filter(skill => commonTitles.has(normalizeSkillTitle(skill)))
    },
    certification: {
      count: certificationCount,
      skills: Array.from(toggledSkills)
        .filter(skill => certificationTitles.has(normalizeSkillTitle(skill)))
    },
    total: totalCount
  });

  const categories = [
    { id: "all", name: "All Categories", count: totalCount },
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