import { roleSkills } from '../skills/data/roleSkills';
import { useParams } from 'react-router-dom';
import { useToggledSkills } from '../skills/context/ToggledSkillsContext';

interface CategorySectionProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

interface SkillCounts {
  specialized: number;
  common: number;
  certification: number;
  all: number;
}

export const CategorySection = ({ selectedCategory, setSelectedCategory }: CategorySectionProps) => {
  const { id } = useParams<{ id: string }>();
  const { toggledSkills } = useToggledSkills();
  const currentRoleSkills = roleSkills[id as keyof typeof roleSkills] || roleSkills["123"];

  // Get all skills for the role
  const allRoleSkills = [
    ...currentRoleSkills.specialized,
    ...currentRoleSkills.common,
    ...currentRoleSkills.certifications
  ];

  // Filter toggled skills that exist in the role skills
  const filteredSkillsArray = Array.from(toggledSkills).filter(skillTitle => 
    allRoleSkills.some(roleSkill => roleSkill.title === skillTitle)
  );

  console.log('CategorySection render:', {
    roleId: id,
    totalSkills: filteredSkillsArray.length,
    toggledSkills: filteredSkillsArray,
    allRoleSkills: allRoleSkills.map(s => s.title)
  });

  const skillCounts: SkillCounts = {
    specialized: filteredSkillsArray.filter(skillTitle => 
      currentRoleSkills.specialized.some(s => s.title === skillTitle)
    ).length,
    common: filteredSkillsArray.filter(skillTitle => 
      currentRoleSkills.common.some(s => s.title === skillTitle)
    ).length,
    certification: filteredSkillsArray.filter(skillTitle => 
      currentRoleSkills.certifications.some(s => s.title === skillTitle)
    ).length,
    all: filteredSkillsArray.length
  };

  console.log('Skill counts calculated:', {
    roleId: id,
    counts: skillCounts,
    specialized: currentRoleSkills.specialized.map(s => s.title),
    common: currentRoleSkills.common.map(s => s.title),
    certifications: currentRoleSkills.certifications.map(s => s.title)
  });

  const categories = [
    { id: "all", name: "All Categories", count: skillCounts.all },
    { id: "specialized", name: "Specialized Skills", count: skillCounts.specialized },
    { id: "common", name: "Common Skills", count: skillCounts.common },
    { id: "certification", name: "Certification", count: skillCounts.certification }
  ];

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => setSelectedCategory(category.id)}
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
              {category.count} skills
            </span>
          </div>
        </button>
      ))}
    </div>
  );
};