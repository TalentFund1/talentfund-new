import { Card } from "@/components/ui/card";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";
import { getUnifiedSkillData } from "../skills/data/skillDatabaseService";
import { roleSkills } from '../skills/data/roleSkills';

interface CategoryCardsProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  roleId: string;
}

export const CategoryCards = ({ 
  selectedCategory, 
  onCategorySelect,
  roleId,
}: CategoryCardsProps) => {
  const { toggledSkills } = useToggledSkills();
  
  const getSkillCountByCategory = (category: string) => {
    const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills] || roleSkills["123"];
    const allRoleSkills = [
      ...currentRoleSkills.specialized,
      ...currentRoleSkills.common,
      ...currentRoleSkills.certifications
    ];
    
    // Filter skills that are both in the role AND toggled on
    const skillsArray = allRoleSkills
      .filter(skill => toggledSkills.has(skill.title))
      .filter(skill => {
        if (!skill.title) {
          console.warn('Found undefined skill title in role skills');
          return false;
        }
        const skillData = getUnifiedSkillData(skill.title);
        return category === 'all' || skillData.category === category;
      });
    
    console.log('Calculating skill count for category:', {
      category,
      roleId,
      totalRoleSkills: allRoleSkills.length,
      toggledSkillsCount: toggledSkills.size,
      filteredCount: skillsArray.length,
      skills: skillsArray.map(s => s.title)
    });

    return skillsArray.length;
  };

  const categories = [
    { id: "all", name: "All Categories", count: getSkillCountByCategory('all') },
    { id: "specialized", name: "Specialized Skills", count: getSkillCountByCategory("specialized") },
    { id: "common", name: "Common Skills", count: getSkillCountByCategory("common") },
    { id: "certification", name: "Certification", count: getSkillCountByCategory("certification") }
  ];

  console.log('CategoryCards - Category counts:', {
    roleId,
    categories: categories.map(cat => ({
      name: cat.name,
      count: cat.count
    }))
  });

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