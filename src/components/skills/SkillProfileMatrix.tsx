import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { useToggledSkills } from "./context/ToggledSkillsContext";
import { SkillProfileMatrixTable } from "./table/SkillProfileMatrixTable";
import { CategoryCards } from "@/components/benchmark/CategoryCards";
import { useParams } from "react-router-dom";
import { useRoleStore } from "@/components/benchmark/RoleBenchmark";

type SortField = 'growth' | 'salary' | null;
type SortDirection = 'asc' | 'desc' | null;

export const SkillProfileMatrix = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const { toggledSkills, setToggledSkills } = useToggledSkills();
  const { id } = useParams();
  const { selectedLevel } = useRoleStore();

  const [paginatedSkills, setPaginatedSkills] = useState<any[]>([]);

  useEffect(() => {
    console.log('SkillProfileMatrix - Current state:', {
      selectedCategory,
      sortField,
      sortDirection,
      toggledSkillsCount: toggledSkills.size,
      roleId: id
    });
  }, [selectedCategory, sortField, sortDirection, toggledSkills, id]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleToggleSkill = (skillTitle: string) => {
    const newToggledSkills = new Set(toggledSkills);
    if (toggledSkills.has(skillTitle)) {
      newToggledSkills.delete(skillTitle);
    } else {
      newToggledSkills.add(skillTitle);
    }
    setToggledSkills(newToggledSkills);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-white">
        <CategoryCards
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
          roleId={id || "123"}
          selectedLevel={selectedLevel}
        />

        <div className="rounded-lg border border-[#CCDBFF] overflow-hidden">
          <SkillProfileMatrixTable
            paginatedSkills={paginatedSkills}
            toggledSkills={toggledSkills}
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={setSortField}
            onToggleSkill={handleToggleSkill}
          />
        </div>
      </Card>
    </div>
  );
};