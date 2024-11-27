import { Card } from "@/components/ui/card";
import { roleSkills } from "../skills/data/roleSkills";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";
import { useParams } from "react-router-dom";

interface CategoryCardsProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  roleId: string;
  selectedLevel: string;
}

export const CategoryCards = ({ 
  selectedCategory, 
  onCategorySelect,
  roleId,
  selectedLevel 
}: CategoryCardsProps) => {
  const { toggledSkills } = useToggledSkills();
  const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills] || roleSkills["123"];

  const getToggledSkillsCount = (skills: Array<{ title: string }>) => {
    return skills.filter(skill => toggledSkills.has(skill.title)).length;
  };

  const skillCounts = {
    specialized: getToggledSkillsCount(currentRoleSkills.specialized || []),
    common: getToggledSkillsCount(currentRoleSkills.common || []),
    certification: getToggledSkillsCount(currentRoleSkills.certifications || [])
  };

  const totalToggled = skillCounts.specialized + skillCounts.common + skillCounts.certification;

  console.log('Toggled skills analysis:', {
    roleId,
    level: selectedLevel,
    toggledSkills: Array.from(toggledSkills),
    counts: {
      specialized: skillCounts.specialized,
      common: skillCounts.common,
      certification: skillCounts.certification,
      total: totalToggled
    },
    allSkills: {
      specialized: currentRoleSkills.specialized?.map(s => s.title),
      common: currentRoleSkills.common?.map(s => s.title),
      certifications: currentRoleSkills.certifications?.map(s => s.title)
    }
  });

  const categories = [
    { id: "all", title: "All Categories", count: totalToggled },
    { id: "specialized", title: "Specialized Skills", count: skillCounts.specialized },
    { id: "common", title: "Common Skills", count: skillCounts.common },
    { id: "certification", title: "Certification", count: skillCounts.certification }
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
              {category.title}
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