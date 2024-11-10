import { useState } from "react";
import { SkillsTableHeader } from "./skills/table/SkillsTableHeader";
import { SkillsTableContent } from "./skills/table/SkillsTableContent";
import { SkillsTableFooter } from "./skills/table/SkillsTableFooter";
import { skills } from "./skills/data/skillsData";

export const SkillsTable = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

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