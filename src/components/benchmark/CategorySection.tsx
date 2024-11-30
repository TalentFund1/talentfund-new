import { RequirementSection } from "./RequirementSection";
import { useParams } from "react-router-dom";
import { roleSkills } from "../skills/data/roleSkills";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";
import { useCompetencyStateReader } from "../skills/competency/CompetencyStateReader";

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
  const { getSkillCompetencyState } = useCompetencyStateReader();
  const currentRoleSkills = roleSkills[id as keyof typeof roleSkills] || roleSkills["123"];

  // Count all skills in each category without filtering by toggledSkills
  const skillCounts: SkillCounts = {
    specialized: currentRoleSkills.specialized.length,
    common: currentRoleSkills.common.length,
    certification: currentRoleSkills.certifications.length,
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

  console.log('Category counts:', {
    total: skillCounts.all,
    specialized: skillCounts.specialized,
    common: skillCounts.common,
    certification: skillCounts.certification,
    selectedCategory
  });

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