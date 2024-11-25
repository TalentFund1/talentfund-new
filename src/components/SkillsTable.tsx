import { useState } from "react";
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
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-foreground">Skill Mapping</h2>
          <span className="bg-[#8073ec]/10 text-[#1F2144] rounded-full px-2 py-0.5 text-xs font-medium">
            {filteredSkills.length}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="flex items-center gap-4 px-6 py-4 border-b border-border">
          <Select value={selectedFilter} onValueChange={setSelectedFilter}>
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="Sort by Market Benchmark" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Sort by All</SelectItem>
              <SelectItem value="baseline">Sort by Baseline</SelectItem>
              <SelectItem value="recommended">Sort by Recommended</SelectItem>
              <SelectItem value="benchmark">Sort by Market Benchmark</SelectItem>
              <SelectItem value="occupation">Sort by Occupation</SelectItem>
            </SelectContent>
          </Select>

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
    </div>
  );
};