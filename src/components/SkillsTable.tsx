import { useState } from "react";
import { SkillsTableHeader } from "./skills/table/SkillsTableHeader";
import { SkillsTableContent } from "./skills/table/SkillsTableContent";
import { SkillsTableFooter } from "./skills/table/SkillsTableFooter";
import { skills } from "./skills/data/skillsData";
import { SimpleSkill } from "./skills/types/SkillTypes";

export const SkillsTable = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  const simpleSkills: SimpleSkill[] = skills.map(skill => ({
    title: skill.title,
    subcategory: skill.subcategory,
    level: skill.level,
    growth: skill.growth
  }));

  return (
    <div className="space-y-6 bg-white rounded-lg shadow-sm">
      <SkillsTableHeader 
        selectedFilter={selectedFilter} 
        setSelectedFilter={setSelectedFilter} 
      />
      <SkillsTableContent 
        skills={simpleSkills} 
        isLoading={isLoading} 
      />
      <SkillsTableFooter />
    </div>
  );
};