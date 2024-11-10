import { useState } from "react";
import { SkillsTableHeader } from "./skills/table/SkillsTableHeader";
import { SkillsTableContent } from "./skills/table/SkillsTableContent";
import { SkillsTableFooter } from "./skills/table/SkillsTableFooter";
import { Skill } from "./skills/types/SkillTypes";

const skills: Skill[] = [
  {
    title: "JavaScript",
    subcategory: "Programming Languages",
    level: "advanced",
    growth: "15%",
    confidence: "high"
  },
  {
    title: "Python",
    subcategory: "Programming Languages",
    level: "intermediate",
    growth: "10%",
    confidence: "medium"
  },
  {
    title: "React",
    subcategory: "Frontend Frameworks",
    level: "advanced",
    growth: "20%",
    confidence: "high"
  }
];

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