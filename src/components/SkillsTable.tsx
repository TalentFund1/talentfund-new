import { useState } from "react";
import { SkillsTableHeader } from "./skills/table/SkillsTableHeader";
import { SkillsTableContent } from "./skills/table/SkillsTableContent";
import { SkillsTableFooter } from "./skills/table/SkillsTableFooter";
import { skills } from "./skills/data/skillsData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const SkillsTable = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [skillType, setSkillType] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  const filteredSkills = skills.filter(skill => {
    if (skillType === "all") return true;
    switch (skillType) {
      case "defining":
        return ["AI & ML", "ML Frameworks", "AI Applications"].includes(skill.subcategory);
      case "soft":
        return ["Soft Skills", "Communication"].includes(skill.subcategory);
      case "certification":
        return ["Cloud Certification", "AI Certification"].includes(skill.subcategory);
      default:
        return true;
    }
  });

  return (
    <div className="space-y-6 bg-white rounded-lg shadow-sm">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <SkillsTableHeader 
          selectedFilter={selectedFilter} 
          setSelectedFilter={setSelectedFilter} 
        />
        <Select value={skillType} onValueChange={setSkillType}>
          <SelectTrigger className="w-[180px] bg-white">
            <SelectValue placeholder="All Skill Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Skill Type</SelectItem>
            <SelectItem value="defining">Defining Skills</SelectItem>
            <SelectItem value="soft">Soft Skills</SelectItem>
            <SelectItem value="certification">Certification</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <SkillsTableContent 
        skills={filteredSkills} 
        isLoading={isLoading} 
      />
      <SkillsTableFooter />
    </div>
  );
};