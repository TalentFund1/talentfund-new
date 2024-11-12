import { roleSkills } from '../skills/data/roleSkills';
import { useParams } from 'react-router-dom';
import { useToggledSkills } from '../context/ToggledSkillsContext';
import { RequirementSection } from './RequirementSection';

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

  const getToggledSkillsCount = (skills: Array<{ title: string }> = []) => {
    return skills.filter(skill => toggledSkills.has(skill.title)).length;
  };

  // Calculate counts for each category
  const skillCounts: SkillCounts = {
    specialized: getToggledSkillsCount(currentRoleSkills.specialized),
    common: getToggledSkillsCount(currentRoleSkills.common),
    certification: getToggledSkillsCount(currentRoleSkills.certifications),
    all: 0
  };

  // Calculate total after individual counts
  skillCounts.all = skillCounts.specialized + skillCounts.common + skillCounts.certification;

  const categories = [
    { id: "all", name: "All Categories", count: skillCounts.all },
    { id: "specialized", name: "Specialized Skills", count: skillCounts.specialized },
    { id: "common", name: "Common Skills", count: skillCounts.common },
    { id: "certification", name: "Certification", count: skillCounts.certification }
  ];

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {categories.map((category) => (
        <RequirementSection
          key={category.id}
          title={category.name}
          count={category.count}
          skills={[]}
          isSelected={selectedCategory === category.id}
          onClick={() => setSelectedCategory(category.id)}
        />
      ))}
    </div>
  );
};