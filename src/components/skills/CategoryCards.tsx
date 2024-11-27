import { Card } from "@/components/ui/card";
import { roleSkills } from './data/roleSkills';
import { useParams } from 'react-router-dom';
import { useToggledSkills } from './context/ToggledSkillsContext';
import { getCategoryForSkill } from './utils/skillCountUtils';

interface CategoryCardsProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

export const CategoryCards = ({ selectedCategory, onCategorySelect }: CategoryCardsProps) => {
  const { id } = useParams<{ id: string }>();
  const { toggledSkills } = useToggledSkills();
  
  const currentRoleSkills = roleSkills[id as keyof typeof roleSkills] || roleSkills["123"];
  
  // Get all skills for the role
  const allSkills = [
    ...currentRoleSkills.specialized,
    ...currentRoleSkills.common,
    ...currentRoleSkills.certifications
  ];

  // Calculate counts based on toggled skills
  const calculateSkillCounts = () => {
    const counts = {
      all: 0,
      critical: 0,
      technical: 0,
      necessary: 0
    };

    allSkills.forEach(skill => {
      if (toggledSkills.has(skill.title)) {
        counts.all++;
        const category = getCategoryForSkill(skill, id || "123");
        if (category === 'critical') counts.critical++;
        else if (category === 'technical') counts.technical++;
        else if (category === 'necessary') counts.necessary++;
      }
    });

    return counts;
  };

  const skillCounts = calculateSkillCounts();

  console.log('Current skill counts:', skillCounts);

  const categories = [
    { id: "all", name: "All Skill Type", count: skillCounts.all },
    { id: "critical", name: "Critical Skills", count: skillCounts.critical },
    { id: "technical", name: "Technical Skills", count: skillCounts.technical },
    { id: "necessary", name: "Necessary Skills", count: skillCounts.necessary }
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