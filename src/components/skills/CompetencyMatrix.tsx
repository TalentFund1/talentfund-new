import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { CompetencyMatrixHeader } from "./CompetencyMatrixHeader";
import { CompetencyLevels } from "./CompetencyLevels";
import { SkillsGrid } from "./SkillsGrid";

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

const skillCategories = [
  { id: "all", name: "All Skills", count: 28 },
  { id: "specialized", name: "Specialized Skills", count: 15 },
  { id: "common", name: "Common Skills", count: 10 },
  { id: "certification", name: "Certification", count: 3 }
];

export const CompetencyMatrix = () => {
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
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
    toast({
      title: `Viewing ${skillCategories.find(cat => cat.id === categoryId)?.name}`,
      duration: 2000
    });
  };

  const currentSkills = skillsData[selectedCategory as keyof typeof skillsData] || [];

  return (
    <div className="space-y-6 bg-white rounded-lg border border-border p-6">
      <CompetencyMatrixHeader selectedLevels={selectedLevels} />
      
      <CompetencyLevels 
        selectedLevels={selectedLevels}
        onLevelSelect={handleLevelSelect}
      />

      <div>
        <div className="grid grid-cols-4 gap-4 mb-6">
          {skillCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategorySelect(category.id)}
              className={`rounded-lg p-4 transition-colors border border-border ${
                selectedCategory === category.id
                  ? 'bg-primary-accent/5 border-primary-accent'
                  : 'bg-background hover:border-primary-accent/50'
              }`}
            >
              <div className="flex flex-col items-start">
                <span className={`text-sm font-semibold mb-1 ${
                  selectedCategory === category.id
                    ? 'text-primary-accent'
                    : 'text-foreground group-hover:text-primary-accent'
                }`}>
                  {category.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {category.count} skills
                </span>
              </div>
            </button>
          ))}
        </div>

        <SkillsGrid currentSkills={currentSkills} />
      </div>
    </div>
  );
};
