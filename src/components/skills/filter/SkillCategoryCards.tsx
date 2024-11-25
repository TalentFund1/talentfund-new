import { Card } from "@/components/ui/card";
import { useToggledSkills } from "../context/ToggledSkillsContext";
import { roleSkills } from "../data/roleSkills";

interface SkillCategoryCardsProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  roleId: string;
}

export const SkillCategoryCards = ({ 
  selectedCategory, 
  onCategorySelect,
  roleId
}: SkillCategoryCardsProps) => {
  const { toggledSkills } = useToggledSkills();

  const categorizeSkills = () => {
    const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills] || { specialized: [], common: [], certifications: [] };
    const allSkills = [
      ...currentRoleSkills.specialized,
      ...currentRoleSkills.common,
      ...currentRoleSkills.certifications
    ];

    const counts = {
      all: allSkills.length,
      critical: allSkills.filter(skill => 
        skill.title.toLowerCase().includes('machine learning') ||
        skill.title.toLowerCase().includes('deep learning') ||
        skill.subcategory === 'AI & ML' ||
        skill.subcategory === 'AI Applications'
      ).length,
      technical: allSkills.filter(skill => 
        skill.subcategory === 'Programming Languages' ||
        skill.subcategory === 'ML Frameworks' ||
        skill.subcategory === 'Cloud Certification'
      ).length,
      necessary: allSkills.filter(skill => 
        skill.subcategory === 'Communication' ||
        skill.title.toLowerCase().includes('writing') ||
        skill.subcategory === 'Development Tools'
      ).length
    };

    return counts;
  };

  const skillCounts = categorizeSkills();

  const categories = [
    { id: "all", title: "All Categories", count: skillCounts.all },
    { id: "critical", title: "Critical Skills", count: skillCounts.critical },
    { id: "technical", title: "Technical Skills", count: skillCounts.technical },
    { id: "necessary", title: "Necessary Skills", count: skillCounts.necessary }
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
                {category.count} {category.count === 1 ? 'skill' : 'skills'}
              </span>
            </div>
          </Card>
        </button>
      ))}
    </div>
  );
};