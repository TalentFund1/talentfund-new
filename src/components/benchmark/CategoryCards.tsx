import { Card } from "@/components/ui/card";
import { roleSkills } from '../skills/data/roleSkills';
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";
import { useCompetencyStateReader } from "../skills/competency/CompetencyStateReader";
import { getEmployeeSkills } from "./skills-matrix/initialSkills";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";

interface CategoryCardsProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  roleId: string;
  selectedLevel: string;
  employeeId: string;
}

export const CategoryCards = ({ 
  selectedCategory, 
  onCategorySelect,
  roleId,
  selectedLevel,
  employeeId
}: CategoryCardsProps) => {
  const { toggledSkills } = useToggledSkills();
  const { getSkillCompetencyState } = useCompetencyStateReader();
  const { currentStates } = useSkillsMatrixStore();
  const employeeSkills = getEmployeeSkills(employeeId);
  const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills] || roleSkills["123"];

  // Helper function to count matching skills for a category
  const countMatchingSkills = (categorySkills: any[]) => {
    return categorySkills.filter(skill => {
      // First check if skill is toggled
      if (!toggledSkills.has(skill.title)) return false;

      // Check if employee has this skill
      const hasSkill = employeeSkills.some(empSkill => empSkill.title === skill.title);
      if (!hasSkill) return false;

      return true;
    }).length;
  };

  // Calculate counts using the same logic as BenchmarkAnalysis
  const specializedCount = countMatchingSkills(currentRoleSkills.specialized || []);
  const commonCount = countMatchingSkills(currentRoleSkills.common || []);
  const certificationCount = countMatchingSkills(currentRoleSkills.certifications || []);
  const totalCount = specializedCount + commonCount + certificationCount;

  console.log('Category counts calculated:', {
    total: totalCount,
    specialized: specializedCount,
    common: commonCount,
    certification: certificationCount,
    selectedLevel,
    roleId,
    toggledSkillsSize: toggledSkills.size,
    actualToggledSkills: Array.from(toggledSkills)
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