import { RequirementSection } from "./RequirementSection";
import { useParams } from "react-router-dom";
import { roleSkills } from "../skills/data/roleSkills";

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

  const getToggledSkillsCount = (skills: Array<{ title: string }>) => {
    return skills.filter(skill => toggledSkills.has(skill.title)).length;
  };

  const skillCounts: SkillCounts = {
    specialized: getToggledSkillsCount(currentRoleSkills.specialized || []),
    common: getToggledSkillsCount(currentRoleSkills.common || []),
    certification: getToggledSkillsCount(currentRoleSkills.certifications || []),
    all: 0 // Initialize with 0
  };

  // Calculate total after individual counts are set
  skillCounts.all = skillCounts.specialized + skillCounts.common + skillCounts.certification;

  const categories = [
    { id: "all", title: "All Categories", count: skillCounts.all },
    { id: "specialized", title: "Specialized Skills", count: skillCounts.specialized },
    { id: "common", title: "Common Skills", count: skillCounts.common },
    { id: "certification", title: "Certification", count: skillCounts.certification }
  ];

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {categories.map((category) => (
        <RequirementSection
          key={category.id}
          title={category.title}
          count={category.count}
          skills={[]}
          isSelected={selectedCategory === category.id}
          onClick={() => onCategorySelect(category.id)}
        />
      ))}
    </div>
  );
};