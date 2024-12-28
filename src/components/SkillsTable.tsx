import { useState } from "react";
import { SkillsTableHeader } from "./skills/table/SkillsTableHeader";
import { SkillsTableContent } from "./skills/table/SkillsTableContent";
import { SkillsTableFooter } from "./skills/table/SkillsTableFooter";
import { getAllSkills } from "./skills/data/skills/allSkills";
import { useToast } from "@/hooks/use-toast";

export const SkillsTable = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const { toast } = useToast();

  // Get skills directly from local data with error handling
  const skills = (() => {
    try {
      console.log('Loading skills from local data...');
      const allSkills = getAllSkills();
      console.log('Successfully loaded skills:', {
        count: allSkills.length,
        sample: allSkills[0]
      });
      return allSkills;
    } catch (error) {
      console.error('Error loading skills:', error);
      toast({
        title: "Error loading skills",
        description: "There was an error loading the skills data. Please try again.",
        variant: "destructive",
      });
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