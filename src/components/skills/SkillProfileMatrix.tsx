import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CompetencyMatrixHeader } from "./CompetencyMatrixHeader";
import { CompetencyLevels } from "./CompetencyLevels";
import { SkillsGrid } from "./SkillsGrid";
import { useToggledSkills } from "./context/ToggledSkillsContext";

const skillCategories = [
  { id: "all", name: "All Skills", count: 28 },
  { id: "specialized", name: "Specialized Skills", count: 15 },
  { id: "common", name: "Common Skills", count: 10 },
  { id: "certification", name: "Certification", count: 3 }
];

export const SkillProfileMatrix = () => {
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [track, setTrack] = useState<"Technical" | "Managerial">("Technical");
  const { toggledSkills } = useToggledSkills();

  // Get all toggled skills as an array
  const skillsArray = Array.from(toggledSkills);

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

  return (
    <div className="space-y-6 bg-white rounded-lg border border-border p-6 mb-8">
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
                  {skillsArray.filter(skill => 
                    category.id === 'all' || getSkillCategory(skill) === category.id
                  ).length} skills
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

const getSkillCategory = (skill: string): string => {
  const specializedSkills = ['Amazon Web Services', 'Machine Learning', 'Artificial Intelligence'];
  const commonSkills = ['Python', 'JavaScript', 'Communication'];
  const certifications = ['AWS Certified', 'Google Cloud', 'Azure'];

  if (specializedSkills.some(s => skill.includes(s))) return 'specialized';
  if (commonSkills.some(s => skill.includes(s))) return 'common';
  if (certifications.some(s => skill.includes(s))) return 'certification';
  return 'all';
};

export default SkillProfileMatrix;