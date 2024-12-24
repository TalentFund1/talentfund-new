import { Card } from "@/components/ui/card";
import { getEmployeeSkills } from "./skills-matrix/initialSkills";
import { getUnifiedSkillData } from "../skills/data/skillDatabaseService";

interface CategoryCardsProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  employeeId: string;
}

export const CategoryCards = ({
  selectedCategory,
  onCategorySelect,
  employeeId
}: CategoryCardsProps) => {
  const employeeSkills = getEmployeeSkills(employeeId);

  const getSkillCountByCategory = (category: string) => {
    if (category === 'all') return employeeSkills.length;

    return employeeSkills.filter(skill => {
      const skillData = getUnifiedSkillData(skill.title);
      return skillData.category === category;
    }).length;
  };

  const categories = [
    { id: "all", name: "All Skills" },
    { id: "specialized", name: "Specialized Skills" },
    { id: "common", name: "Common Skills" },
    { id: "certification", name: "Certifications" }
  ];

  console.log('CategoryCards - Skill counts:', {
    employeeId,
    totalSkills: employeeSkills.length,
    categoryCounts: categories.map(cat => ({
      category: cat.id,
      count: getSkillCountByCategory(cat.id)
    }))
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {categories.map((category) => (
        <Card
          key={category.id}
          className={`p-4 cursor-pointer transition-all ${
            selectedCategory === category.id
              ? "border-primary-accent bg-primary-accent/5"
              : "hover:border-primary-accent/50"
          }`}
          onClick={() => onCategorySelect(category.id)}
        >
          <div className="space-y-1">
            <p className="text-sm font-medium">{category.name}</p>
            <p className="text-2xl font-bold">{getSkillCountByCategory(category.id)}</p>
          </div>
        </Card>
      ))}
    </div>
  );
};