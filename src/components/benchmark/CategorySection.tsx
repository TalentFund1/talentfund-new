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

  // Get toggled skills that exist in the role
  const toggledRoleSkills = allRoleSkills.filter(skill => toggledSkills.has(skill.title));

  console.log('CategorySection - Initial counts:', {
    roleId: id,
    allRoleSkills: allRoleSkills.map(s => s.title),
    toggledSkills: Array.from(toggledSkills),
    toggledRoleSkills: toggledRoleSkills.map(s => s.title)
  });

  const specializedSkills = toggledRoleSkills.filter(skill => 
    currentRoleSkills.specialized.some(s => s.title === skill.title)
  );
  
  const commonSkills = toggledRoleSkills.filter(skill => 
    currentRoleSkills.common.some(s => s.title === skill.title)
  );
  
  const certificationSkills = toggledRoleSkills.filter(skill => 
    currentRoleSkills.certifications.some(s => s.title === skill.title)
  );

  const skillCounts: SkillCounts = {
    all: toggledRoleSkills.length,
    specialized: specializedSkills.length,
    common: commonSkills.length,
    certification: certificationSkills.length
  };

  console.log('CategorySection - Final counts:', {
    roleId: id,
    counts: skillCounts,
    specialized: specializedSkills.map(s => s.title),
    common: commonSkills.map(s => s.title),
    certification: certificationSkills.map(s => s.title)
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
              {category.count} {category.count === 1 ? 'skill' : 'skills'}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
};