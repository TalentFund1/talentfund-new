import { roleSkills } from '../data/roleSkills';
import { useParams } from 'react-router-dom';
import { useToggledSkills } from '../context/ToggledSkillsContext';
import { getSkillCategory } from '../data/skills/categories/skillCategories';
import { getUnifiedSkillData } from '../data/skillDatabaseService';

interface CategorySectionProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export const CategorySection = ({ selectedCategory, setSelectedCategory }: CategorySectionProps) => {
  const { id } = useParams<{ id: string }>();
  const { toggledSkills } = useToggledSkills();
  const currentRoleSkills = roleSkills[id as keyof typeof roleSkills] || roleSkills["123"];

  // Get all skills for the role
  const allRoleSkills = [
    ...currentRoleSkills.specialized,
    ...currentRoleSkills.common,
    ...currentRoleSkills.certifications
  ];

  // Filter to only include toggled skills
  const toggledRoleSkills = allRoleSkills.filter(skill => toggledSkills.has(skill.title));

  const getToggledSkillsCount = (category: string) => {
    if (category === 'all') {
      return toggledRoleSkills.length;
    }

    return toggledRoleSkills.filter(skill => {
      const skillData = getUnifiedSkillData(skill.title);
      console.log('Checking skill category:', {
        skill: skill.title,
        category: skillData.category,
        matchesFilter: category === 'all' || skillData.category === category
      });
      return category === 'all' || skillData.category === category;
    }).length;
  };

  const skillCounts = {
    all: getToggledSkillsCount('all'),
    specialized: getToggledSkillsCount('specialized'),
    common: getToggledSkillsCount('common'),
    certification: getToggledSkillsCount('certification')
  };

  console.log('CategorySection - Skill counts:', {
    roleId: id,
    counts: skillCounts,
    toggledSkills: Array.from(toggledSkills),
    totalRoleSkills: toggledRoleSkills.length
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