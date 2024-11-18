import { Card } from "@/components/ui/card";
import { roleSkills } from "../../skills/data/roleSkills";

interface SkillsMatrixCategoriesProps {
  selectedRole: string;
  toggledSkills: Set<string>;
}

export const SkillsMatrixCategories = ({ selectedRole, toggledSkills }: SkillsMatrixCategoriesProps) => {
  const currentRoleSkills = roleSkills[selectedRole as keyof typeof roleSkills] || roleSkills["123"];

  const getToggledSkillsCount = (skills: Array<{ title: string }>) => {
    return skills.filter(skill => toggledSkills.has(skill.title)).length;
  };

  const categories = [
    {
      id: "all",
      title: "All Categories",
      count: getToggledSkillsCount([
        ...currentRoleSkills.specialized,
        ...currentRoleSkills.common,
        ...currentRoleSkills.certifications
      ])
    },
    {
      id: "specialized",
      title: "Specialized Skills",
      count: getToggledSkillsCount(currentRoleSkills.specialized)
    },
    {
      id: "common",
      title: "Common Skills",
      count: getToggledSkillsCount(currentRoleSkills.common)
    },
    {
      id: "certification",
      title: "Certification",
      count: getToggledSkillsCount(currentRoleSkills.certifications)
    }
  ];

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {categories.map((category) => (
        <Card 
          key={category.id}
          className="p-4 bg-background/40 hover:bg-background/60"
        >
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-foreground">
              {category.title}
            </span>
            <span className="text-xs text-muted-foreground">
              {category.count} {category.count === 1 ? 'skill' : 'skills'}
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
};