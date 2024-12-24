import { Card } from "@/components/ui/card";
import { roleSkills } from '../skills/data/roleSkills';
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";

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

  // Get counts for each category based on toggled skills
  const specializedCount = currentRoleSkills.specialized?.filter(skill => 
    toggledSkills.has(skill.title)
  ).length || 0;
  
  const commonCount = currentRoleSkills.common?.filter(skill => 
    toggledSkills.has(skill.title)
  ).length || 0;
  
  const certificationCount = currentRoleSkills.certifications?.filter(skill => 
    toggledSkills.has(skill.title)
  ).length || 0;

  const totalCount = specializedCount + commonCount + certificationCount;

  console.log('Category counts calculated:', {
    total: totalCount,
    specialized: specializedCount,
    common: commonCount,
    certification: certificationCount,
    toggledSkills: Array.from(toggledSkills)
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
                {category.name}
              </span>
              <span className="text-xs text-muted-foreground">
                {category.count} {category.count === 1 ? 'skill' : 'skills'}
              </span>
            </div>
          </Card>
        </button>
      ))}
    </div>
  );
};