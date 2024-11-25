import { roleSkills } from '../data/roleSkills';
import { useParams } from 'react-router-dom';
import { useToggledSkills } from '../context/ToggledSkillsContext';

interface CategorySectionProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

interface SkillCounts {
  specialized: number;
  common: number;
  certification: number;
  all: number;
  critical: number;
  technical: number;
  necessary: number;
}

export const CategorySection = ({ selectedCategory, setSelectedCategory }: CategorySectionProps) => {
  const { id } = useParams<{ id: string }>();
  const { toggledSkills } = useToggledSkills();
  const currentRoleSkills = roleSkills[id as keyof typeof roleSkills] || roleSkills["123"];

  const getToggledSkillsCount = (skills: Array<{ title: string }>) => {
    return skills.filter(skill => toggledSkills.has(skill.title)).length;
  };

  const getCriticalSkills = () => {
    const allSkills = [
      ...currentRoleSkills.specialized,
      ...currentRoleSkills.common,
      ...currentRoleSkills.certifications
    ];
    return allSkills.filter(skill => 
      currentRoleSkills.specialized.some(s => s.title === skill.title) &&
      toggledSkills.has(skill.title)
    ).length;
  };

  const getTechnicalSkills = () => {
    const allSkills = [
      ...currentRoleSkills.specialized,
      ...currentRoleSkills.common
    ];
    return allSkills.filter(skill => 
      !skill.title.toLowerCase().includes('soft') &&
      toggledSkills.has(skill.title)
    ).length;
  };

  const getNecessarySkills = () => {
    const allSkills = [
      ...currentRoleSkills.common,
      ...currentRoleSkills.certifications
    ];
    return allSkills.filter(skill => 
      (skill.title.toLowerCase().includes('soft') ||
       currentRoleSkills.certifications.some(s => s.title === skill.title)) &&
      toggledSkills.has(skill.title)
    ).length;
  };

  const skillCounts: SkillCounts = {
    specialized: getToggledSkillsCount(currentRoleSkills.specialized || []),
    common: getToggledSkillsCount(currentRoleSkills.common || []),
    certification: getToggledSkillsCount(currentRoleSkills.certifications || []),
    all: 0,
    critical: getCriticalSkills(),
    technical: getTechnicalSkills(),
    necessary: getNecessarySkills()
  };

  skillCounts.all = skillCounts.specialized + skillCounts.common + skillCounts.certification;

  const skillTypeCategories = [
    { id: "all", name: "All Skill Type", count: skillCounts.all },
    { id: "specialized", name: "Specialized Skills", count: skillCounts.specialized },
    { id: "common", name: "Common Skills", count: skillCounts.common },
    { id: "certification", name: "Certification", count: skillCounts.certification }
  ];

  const skillImportanceCategories = [
    { id: "critical", name: "Critical Skills", count: skillCounts.critical },
    { id: "technical", name: "Technical Skills", count: skillCounts.technical },
    { id: "necessary", name: "Necessary Skills", count: skillCounts.necessary }
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        {skillTypeCategories.map((category) => (
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

      <div className="grid grid-cols-4 gap-4">
        {skillImportanceCategories.map((category) => (
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
        <div className="col-span-1"></div>
      </div>
    </div>
  );
};