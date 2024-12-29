import { roleSkills } from '../data/roleSkills';
import { useParams } from 'react-router-dom';
import { useToggledSkills } from '../context/ToggledSkillsContext';
import { getUnifiedSkillData } from '../data/skillDatabaseService';

interface CategorySectionProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export const CategorySection = ({ selectedCategory, setSelectedCategory }: CategorySectionProps) => {
  const { id } = useParams<{ id: string }>();
  const { toggledSkills } = useToggledSkills();
  const currentRoleSkills = roleSkills[id as keyof typeof roleSkills] || roleSkills["123"];

  // Get all skills for this role
  const allRoleSkills = [
    ...(currentRoleSkills.specialized || []),
    ...(currentRoleSkills.common || []),
    ...(currentRoleSkills.certifications || [])
  ].filter(skill => toggledSkills.has(skill.title));

  // Count skills by category using universal database categorization
  const getSkillCountByCategory = (category: string) => {
    return allRoleSkills.filter(skill => {
      const skillData = getUnifiedSkillData(skill.title);
      return category === 'all' || skillData.category === category;
    }).length;
  };

  console.log('CategorySection - Counting skills:', {
    roleId: id,
    totalSkills: allRoleSkills.length,
    specialized: getSkillCountByCategory('specialized'),
    common: getSkillCountByCategory('common'),
    certification: getSkillCountByCategory('certification')
  });

  const categories = [
    { id: "all", name: "All Categories", count: allRoleSkills.length },
    { id: "specialized", name: "Specialized Skills", count: getSkillCountByCategory('specialized') },
    { id: "common", name: "Common Skills", count: getSkillCountByCategory('common') },
    { id: "certification", name: "Certification", count: getSkillCountByCategory('certification') }
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