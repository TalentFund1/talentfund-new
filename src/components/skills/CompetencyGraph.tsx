import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { useSkillRequirements } from "./data/skillsDatabase";
import { getSkillsByTrackAndLevel } from "./data/skillsDatabase";
import { SkillData } from "./data/skillLevels";
import { formatSkillsForDisplay } from "./utils/skillsDisplayUtils";

interface CompetencyGraphProps {
  track: "Professional" | "Managerial";
  roleId: string;
}

export const CompetencyGraph = ({ track, roleId }: CompetencyGraphProps) => {
  const { updateSkillRequirement } = useSkillRequirements();
  const [selectedLevel, setSelectedLevel] = useState(track === "Professional" ? "P4" : "M3");
  
  const handleSkillUpdate = (
    skillTitle: string,
    level: string,
    newLevel: string,
    newRequirement: string
  ) => {
    updateSkillRequirement(track.toLowerCase(), level, skillTitle, {
      level: newLevel,
      requirement: newRequirement,
    });
  };

  const levels = track === "Professional" 
    ? ["P1", "P2", "P3", "P4", "P5", "P6"]
    : ["M3", "M4", "M5", "M6"];

  const renderSkillLevel = (level: string) => {
    const skills = formatSkillsForDisplay(
      track.toLowerCase() as 'professional' | 'managerial',
      level
    );

    return (
      <div 
        key={level}
        className={`p-4 rounded-lg cursor-pointer transition-colors ${
          selectedLevel === level 
            ? 'bg-primary-accent/10 border border-primary-accent' 
            : 'bg-background border border-border hover:border-primary-accent/50'
        }`}
        onClick={() => setSelectedLevel(level)}
      >
        <h3 className="text-sm font-semibold mb-2">{level}</h3>
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground">
            {Object.entries(skills).map(([category, categorySkills]) => (
              <div key={category} className="flex justify-between">
                <span className="capitalize">{category}</span>
                <span>{(categorySkills as SkillData[]).length}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Competency Levels</h3>
        <p className="text-sm text-muted-foreground">
          View skill requirements across different competency levels
        </p>
      </div>

      <Separator />

      <div className="grid grid-cols-6 gap-4">
        {levels.map(renderSkillLevel)}
      </div>
    </div>
  );
};
