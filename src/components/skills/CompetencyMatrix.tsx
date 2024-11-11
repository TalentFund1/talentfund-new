import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CompetencyMatrixHeader } from "./CompetencyMatrixHeader";
import { CompetencyLevels } from "./CompetencyLevels";
import { SkillsGrid } from "./SkillsGrid";
import { useToggledSkills } from "./context/ToggledSkillsContext";
import { roleSkills } from './data/roleSkills';
import { useParams } from "react-router-dom";

export const CompetencyMatrix = () => {
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [track, setTrack] = useState<"Technical" | "Managerial">("Technical");
  const { toggledSkills } = useToggledSkills();
  const { id } = useParams<{ id: string }>();

  const roleId = id || "123"; // Default to AI Engineer if no ID
  const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills];

  const skillCategories = [
    { 
      id: "all", 
      name: "All Skills", 
      count: currentRoleSkills ? 
        currentRoleSkills.specialized.length + 
        currentRoleSkills.common.length + 
        currentRoleSkills.certifications.length : 0 
    },
    { 
      id: "specialized", 
      name: "Specialized Skills", 
      count: currentRoleSkills?.specialized.length || 0 
    },
    { 
      id: "common", 
      name: "Common Skills", 
      count: currentRoleSkills?.common.length || 0 
    },
    { 
      id: "certification", 
      name: "Certification", 
      count: currentRoleSkills?.certifications.length || 0 
    }
  ];

  const handleLevelSelect = (level: string) => {
    setSelectedLevels(prev => 
      prev.includes(level) 
        ? prev.filter(l => l !== level)
        : [...prev, level]
    );
  };

  const handleTrackChange = (newTrack: "Technical" | "Managerial") => {
    setTrack(newTrack);
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const getSkillsForCategory = () => {
    if (!currentRoleSkills) return [];

    switch (selectedCategory) {
      case "specialized":
        return currentRoleSkills.specialized.map(skill => skill.title);
      case "common":
        return currentRoleSkills.common.map(skill => skill.title);
      case "certification":
        return currentRoleSkills.certifications.map(skill => skill.title);
      default:
        return [
          ...currentRoleSkills.specialized.map(skill => skill.title),
          ...currentRoleSkills.common.map(skill => skill.title),
          ...currentRoleSkills.certifications.map(skill => skill.title)
        ];
    }
  };

  const skillsArray = getSkillsForCategory();

  return (
    <div className="space-y-6 bg-white rounded-lg border border-border p-6">
      <CompetencyMatrixHeader selectedLevels={selectedLevels} />
      
      <CompetencyLevels 
        selectedLevels={selectedLevels}
        onLevelSelect={handleLevelSelect}
        onTrackChange={handleTrackChange}
      />

      <div>
        <div className="grid grid-cols-4 gap-4 mb-6">
          {skillCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategorySelect(category.id)}
              className={`rounded-lg p-4 transition-colors ${
                selectedCategory === category.id
                  ? 'bg-primary-accent/5 border border-primary-accent'
                  : 'bg-background border border-border hover:border-primary-accent/50'
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

        <SkillsGrid 
          skillsArray={skillsArray}
          selectedCategory={selectedCategory}
        />
      </div>
    </div>
  );
};