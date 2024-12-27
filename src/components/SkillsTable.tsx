import { useState } from "react";
import { SkillsTableHeader } from "./skills/table/SkillsTableHeader";
import { SkillsTableContent } from "./skills/table/SkillsTableContent";
import { SkillsTableFooter } from "./skills/table/SkillsTableFooter";
import { getAllSkills } from "./skills/data/skills/allSkills";

export const SkillsTable = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Get skills directly from universal database with error handling
  const skills = (() => {
    try {
      console.log('Fetching skills from universal database...');
      const allSkills = getAllSkills();
      console.log('Successfully loaded skills:', {
        count: allSkills.length,
        sample: allSkills[0]
      });
      return allSkills;
    } catch (error) {
      console.error('Error loading skills:', error);
      return [];
    }
  })();

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