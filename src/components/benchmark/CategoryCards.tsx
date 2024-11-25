import { Card } from "@/components/ui/card";
import { roleSkills } from '../skills/data/roleSkills';
import { useParams } from 'react-router-dom';
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";
import { getCategoryForSkill } from "../skills/utils/skillCountUtils";

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
  
  // Get all skills for the role
  const allSkills = [
    ...currentRoleSkills.specialized,
    ...currentRoleSkills.common,
    ...currentRoleSkills.certifications
  ];

  // Calculate counts based on toggled skills
  const getSkillCount = (category: string) => {
    if (category === 'all') {
      return allSkills.filter(skill => toggledSkills.has(skill.title)).length;
    }
    return allSkills.filter(skill => 
      toggledSkills.has(skill.title) && 
      getCategoryForSkill(skill, roleId) === category
    ).length;
  };

  const categories = [
    { id: "all", name: "All Categories", count: getSkillCount('all') },
    { id: "critical", name: "Critical Skills", count: getSkillCount('critical') },
    { id: "technical", name: "Technical Skills", count: getSkillCount('technical') },
    { id: "necessary", name: "Necessary Skills", count: getSkillCount('necessary') }
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
              {category.name}
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