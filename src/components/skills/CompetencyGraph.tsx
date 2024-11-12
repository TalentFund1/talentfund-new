import { useState } from "react";
import { useParams } from "react-router-dom";
import { skillsByCategory } from "./competency/skillsData";
import { CategoryCards } from "./competency/CategoryCards";
import { CategorySection } from "./competency/CategorySection";

interface CompetencyGraphProps {
  roleId?: string;
  track?: string;
}

export const CompetencyGraph = ({ roleId, track = "Professional" }: CompetencyGraphProps) => {
  const { id } = useParams<{ id: string }>();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const effectiveRoleId = roleId || id || "123";
  const effectiveTrack = track.toLowerCase();

  const getSkillsForRole = () => {
    const skills = skillsByCategory[selectedCategory as keyof typeof skillsByCategory];
    if (!skills) return [];

    const trackSkills = skills[effectiveTrack as keyof typeof skills];
    if (!trackSkills) return [];

    // Return all levels for the selected track
    return Object.entries(trackSkills).map(([level, skillsList]) => ({
      level,
      skills: skillsList
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold text-foreground">Skills Graph</h3>
        
        <CategoryCards 
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <CategorySection 
          roleId={effectiveRoleId}
          selectedCategory={selectedCategory}
          track={effectiveTrack}
          skillsData={getSkillsForRole()}
        />
      </div>
    </div>
  );
};