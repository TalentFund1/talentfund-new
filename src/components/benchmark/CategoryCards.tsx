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

export const CategoryCards = ({ 
  selectedCategory, 
  onCategorySelect,
  roleId,
  selectedLevel 
}: CategoryCardsProps) => {
  const { toggledSkills } = useToggledSkills();
  const { getSkillCompetencyState } = useCompetencyStateReader();
  const [counts, setCounts] = useState<{ [key: string]: { required: number; preferred: number } }>({});
  const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills] || roleSkills["123"];

  useEffect(() => {
    const getSkillsByCategory = (category: string) => {
      const allSkills = [
        ...(currentRoleSkills.specialized || []),
        ...(currentRoleSkills.common || []),
        ...(currentRoleSkills.certifications || [])
      ];

      if (category === 'all') return allSkills;

      const categoryMap: { [key: string]: string[] } = {
        specialized: currentRoleSkills.specialized?.map(s => s.title) || [],
        common: currentRoleSkills.common?.map(s => s.title) || [],
        certification: currentRoleSkills.certifications?.map(s => s.title) || []
      };

      return allSkills.filter(skill => categoryMap[category]?.includes(skill.title));
    };

    const calculateCounts = () => {
      const newCounts: { [key: string]: { required: number; preferred: number } } = {};
      
      ['all', 'specialized', 'common', 'certification'].forEach(category => {
        const skills = getSkillsByCategory(category);
        let required = 0, preferred = 0;

        skills.forEach(skill => {
          const competencyState = getSkillCompetencyState(skill.title, selectedLevel.toLowerCase());
          if (competencyState?.required === 'required') required++;
          if (competencyState?.required === 'preferred') preferred++;
        });

        newCounts[category] = { required, preferred };
      });

      console.log('Updated category counts:', { 
        roleId, 
        counts: newCounts, 
        toggledSkillsCount: toggledSkills.size 
      });

      setCounts(newCounts);
    };

    calculateCounts();
  }, [currentRoleSkills, toggledSkills, selectedLevel, getSkillCompetencyState, roleId]);

  const categories = [
    { id: "all", title: "All Categories" },
    { id: "specialized", title: "Specialized Skills" },
    { id: "common", title: "Common Skills" },
    { id: "certification", title: "Certification" }
  ];

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {categories.map((category) => {
        const totalSkills = category.id === 'all' 
          ? [...currentRoleSkills.specialized, ...currentRoleSkills.common, ...currentRoleSkills.certifications].length
          : category.id === 'specialized'
            ? currentRoleSkills.specialized.length
            : category.id === 'common'
              ? currentRoleSkills.common.length
              : currentRoleSkills.certifications.length;

        const toggledCount = Array.from(toggledSkills).filter(skill => {
          if (category.id === 'all') return true;
          const skillObj = [...currentRoleSkills.specialized, ...currentRoleSkills.common, ...currentRoleSkills.certifications]
            .find(s => s.title === skill);
          
          if (!skillObj) return false;
          
          switch (category.id) {
            case 'specialized':
              return currentRoleSkills.specialized.some(s => s.title === skill);
            case 'common':
              return currentRoleSkills.common.some(s => s.title === skill);
            case 'certification':
              return currentRoleSkills.certifications.some(s => s.title === skill);
            default:
              return false;
          }
        }).length;
        
        return (
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
                  {toggledCount} / {totalSkills} {totalSkills === 1 ? 'skill' : 'skills'}
                </span>
              </div>
            </Card>
          </button>
        );
      })}
    </div>
  );
};