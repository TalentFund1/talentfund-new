import { useState } from "react";
import { SkillsTableHeader } from "./skills/table/SkillsTableHeader";
import { SkillsTableContent } from "./skills/table/SkillsTableContent";
import { SkillsTableFooter } from "./skills/table/SkillsTableFooter";
import { getAllSkills } from "./skills/data/skillsData";
import { SimpleSkill } from "./skills/types/SkillTypes";

export const SkillsTable = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [sortField, setSortField] = useState<'growth' | 'salary' | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);

  const simpleSkills: SimpleSkill[] = getAllSkills().map(skill => ({
    title: skill.title,
    subcategory: skill.subcategory,
    level: skill.level,
    growth: skill.growth,
    businessCategory: skill.businessCategory
  }));

  const handleSort = (field: 'growth' | 'salary') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : null);
      if (sortDirection === 'desc') {
        setSortField(null);
      }
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <div className="space-y-6 bg-white rounded-lg shadow-sm">
      <SkillsTableHeader 
        selectedFilter={selectedFilter} 
        setSelectedFilter={setSelectedFilter}
        sortField={sortField}
        sortDirection={sortDirection}
        onSort={handleSort}
      />
      <SkillsTableContent 
        skills={simpleSkills} 
        isLoading={isLoading} 
      />
      <SkillsTableFooter />
    </div>
  );
};