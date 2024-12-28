import { useState } from "react";
import { SkillsTableHeader } from "./skills/table/SkillsTableHeader";
import { SkillsTableContent } from "./skills/table/SkillsTableContent";
import { SkillsTableFooter } from "./skills/table/SkillsTableFooter";
import { getAllSkills } from "./skills/data/skills/allSkills";

export const SkillsTable = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Get skills directly from universal database
  const skills = getAllSkills();

  console.log('Loading skills from universal database:', {
    totalSkills: skills.length,
    sample: skills[0]
  });

  return (
    <div className="space-y-6 bg-white rounded-lg shadow-sm">
      <SkillsTableHeader 
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />
      <SkillsTableContent 
        skills={skills} 
        isLoading={isLoading} 
      />
      <SkillsTableFooter />
    </div>
  );
};