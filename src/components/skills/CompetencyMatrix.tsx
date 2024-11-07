import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { CompetencyMatrixHeader } from "./CompetencyMatrixHeader";
import { CompetencyLevels } from "./CompetencyLevels";
import { SkillsGrid } from "./SkillsGrid";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const skillCategories = [
  { id: "all", name: "All Skills", count: 28 },
  { id: "specialized", name: "Specialized Skills", count: 15 },
  { id: "common", name: "Common Skills", count: 10 },
  { id: "certification", name: "Certification", count: 3 }
];

const skillsData = {
  all: [
    ...Object.values({
      specialized: [
        { name: "Amazon Web Services", level: "Advanced", required: "Required" },
        { name: "Artificial Intelligence", level: "Advanced", required: "Required" },
        { name: "Deep Learning", level: "Intermediate", required: "Required" },
        { name: "Machine Learning", level: "Advanced", required: "Required" },
        { name: "Data Science", level: "Advanced", required: "Required" },
      ],
      common: [
        { name: "Communication", level: "Intermediate", required: "Required" },
        { name: "Problem Solving", level: "Advanced", required: "Required" },
        { name: "Team Collaboration", level: "Intermediate", required: "Preferred" },
      ],
      certification: [
        { name: "AWS Certified Solutions Architect", level: "Advanced", required: "Required" },
        { name: "Google Cloud Professional", level: "Intermediate", required: "Preferred" },
      ]
    }).flat(),
  ],
  specialized: [
    { name: "Amazon Web Services", level: "Advanced", required: "Required" },
    { name: "Artificial Intelligence", level: "Advanced", required: "Required" },
    { name: "Deep Learning", level: "Intermediate", required: "Required" },
    { name: "Machine Learning", level: "Advanced", required: "Required" },
    { name: "Data Science", level: "Advanced", required: "Required" },
  ],
  common: [
    { name: "Communication", level: "Intermediate", required: "Required" },
    { name: "Problem Solving", level: "Advanced", required: "Required" },
    { name: "Team Collaboration", level: "Intermediate", required: "Preferred" },
  ],
  certification: [
    { name: "AWS Certified Solutions Architect", level: "Advanced", required: "Required" },
    { name: "Google Cloud Professional", level: "Intermediate", required: "Preferred" },
  ]
};

interface CompetencyMatrixProps {
  onTrackChange: (track: "Professional" | "Managerial") => void;
}

export const CompetencyMatrix = ({ onTrackChange }: CompetencyMatrixProps) => {
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [track, setTrack] = useState<"Professional" | "Managerial">("Professional");
  const { toast } = useToast();

  const handleLevelSelect = (level: string) => {
    setSelectedLevels(prev => 
      prev.includes(level) 
        ? prev.filter(l => l !== level)
        : [...prev, level]
    );
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    const category = skillCategories.find(cat => cat.id === categoryId);
    if (category) {
      toast({
        title: `Viewing ${category.name}`,
        duration: 2000
      });
    }
  };

  const currentSkills = skillsData[selectedCategory as keyof typeof skillsData] || [];

  return (
    <div className="space-y-6 bg-white rounded-lg border border-border p-6">
      <CompetencyMatrixHeader selectedLevels={selectedLevels} />
      
      <CompetencyLevels 
        selectedLevels={selectedLevels}
        onLevelSelect={handleLevelSelect}
        onTrackChange={handleTrackChange}
      />

      <div>
        <div className="flex items-center gap-2 mb-6">
          <span className="text-sm font-medium text-foreground">Category:</span>
          <Select value={selectedCategory} onValueChange={handleCategorySelect}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {skillCategories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  <span className="flex items-center justify-between w-full">
                    <span>{category.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {category.count} skills
                    </span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <SkillsGrid currentSkills={currentSkills} />
      </div>
    </div>
  );
};