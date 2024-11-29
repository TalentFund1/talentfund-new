import { Card } from "@/components/ui/card";
import { roleSkills } from "../skills/data/roleSkills";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";
import { useCompetencyStateReader } from "../skills/competency/CompetencyStateReader";

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
  const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills] || roleSkills["123"];

  console.log('CategoryCards - Current role skills:', {
    roleId,
    currentRoleSkills,
    toggledSkillsSize: toggledSkills.size,
    toggledSkills: Array.from(toggledSkills)
  });

  const getSkillsByCategory = (category: string) => {
    const allSkills = [
      ...(currentRoleSkills.specialized || []),
      ...(currentRoleSkills.common || []),
      ...(currentRoleSkills.certifications || [])
    ];

    if (category === 'all') {
      return allSkills.filter(skill => toggledSkills.has(skill.title));
    }

    const categoryMap: { [key: string]: any[] } = {
      specialized: currentRoleSkills.specialized || [],
      common: currentRoleSkills.common || [],
      certification: currentRoleSkills.certifications || []
    };

    return (categoryMap[category] || []).filter(skill => toggledSkills.has(skill.title));
  };

  const categories = [
    { id: "all", name: "All Categories", count: getSkillsByCategory('all').length },
    { id: "specialized", name: "Specialized Skills", count: getSkillsByCategory('specialized').length },
    { id: "common", name: "Common Skills", count: getSkillsByCategory('common').length },
    { id: "certification", name: "Certification", count: getSkillsByCategory('certification').length }
  ];

  console.log('CategoryCards - Category counts:', categories.map(cat => ({
    category: cat.id,
    count: cat.count,
    skills: getSkillsByCategory(cat.id).map(s => s.title)
  })));

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