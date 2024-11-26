import { Card } from "@/components/ui/card";
import { roleSkills } from "../skills/data/roleSkills";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";
import { useCompetencyStateReader } from "../skills/competency/CompetencyStateReader";
import { useEffect, useState } from "react";

interface CategoryCardsProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  roleId: string;
  selectedLevel: string;
}

interface SkillCount {
  total: number;
  toggled: number;
}

interface CategoryCounts {
  all: SkillCount;
  specialized: SkillCount;
  common: SkillCount;
  certification: SkillCount;
}

export const CategoryCards = ({ 
  selectedCategory, 
  onCategorySelect,
  roleId,
  selectedLevel 
}: CategoryCardsProps) => {
  const { toggledSkills } = useToggledSkills();
  const { getSkillCompetencyState } = useCompetencyStateReader();
  const [skillCounts, setSkillCounts] = useState<CategoryCounts>({
    all: { total: 0, toggled: 0 },
    specialized: { total: 0, toggled: 0 },
    common: { total: 0, toggled: 0 },
    certification: { total: 0, toggled: 0 }
  });

  useEffect(() => {
    const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills] || roleSkills["123"];
    
    const specializedSkills = currentRoleSkills.specialized || [];
    const commonSkills = currentRoleSkills.common || [];
    const certificationSkills = currentRoleSkills.certifications || [];
    
    const specializedCount = {
      total: specializedSkills.length,
      toggled: specializedSkills.filter(skill => toggledSkills.has(skill.title)).length
    };
    
    const commonCount = {
      total: commonSkills.length,
      toggled: commonSkills.filter(skill => toggledSkills.has(skill.title)).length
    };
    
    const certificationCount = {
      total: certificationSkills.length,
      toggled: certificationSkills.filter(skill => toggledSkills.has(skill.title)).length
    };
    
    const allCount = {
      total: specializedCount.total + commonCount.total + certificationCount.total,
      toggled: specializedCount.toggled + commonCount.toggled + certificationCount.toggled
    };

    setSkillCounts({
      all: allCount,
      specialized: specializedCount,
      common: commonCount,
      certification: certificationCount
    });

    console.log('Updated skill counts:', {
      all: allCount,
      specialized: specializedCount,
      common: commonCount,
      certification: certificationCount,
      toggledSkills: Array.from(toggledSkills)
    });
  }, [roleId, toggledSkills]);

  const categories = [
    { id: "all", title: "All Categories", count: skillCounts.all },
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
          className="w-full text-left"
        >
          <Card 
            className={`
              p-4 
              transition-colors 
              ${selectedCategory === category.id
                ? 'bg-primary-accent/5 border border-primary-accent'
                : 'bg-background border border-border hover:border-primary-accent/50'
              }
            `}
          >
            <div className="flex flex-col gap-1">
              <span className={`text-sm font-semibold ${
                selectedCategory === category.id ? 'text-primary-accent' : 'text-foreground'
              }`}>
                {category.title}
              </span>
              <span className="text-xs text-muted-foreground">
                {category.count.toggled} out of {category.count.total} skills
              </span>
            </div>
          </Card>
        </button>
      ))}
    </div>
  );
};