import { useState } from "react";
import { SkillsTableHeader } from "./skills/table/SkillsTableHeader";
import { SkillsTableContent } from "./skills/table/SkillsTableContent";
import { SkillsTableFooter } from "./skills/table/SkillsTableFooter";
import { getAllSkills } from "./skills/data/skillsData";
import { SimpleSkill } from "./skills/types/SkillTypes";

export const SkillsTable = () => {
  const [isLoading, setIsLoading] = useState(false);

  const simpleSkills: SimpleSkill[] = getAllSkills().map(skill => ({
    title: skill.title,
    subcategory: skill.subcategory,
    level: skill.level,
    growth: skill.growth
  }));

  return (
    <div className="space-y-6 bg-white rounded-lg shadow-sm">
      <SkillsTableHeader />
      <SkillsTableContent 
        skills={simpleSkills} 
        isLoading={isLoading} 
      />
      <SkillsTableFooter />
    </div>
  );
};