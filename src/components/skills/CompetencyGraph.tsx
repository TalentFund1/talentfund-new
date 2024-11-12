import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CompetencyMatrixHeader } from "./CompetencyMatrixHeader";
import { CompetencyLevels } from "./CompetencyLevels";
import { SkillsGrid } from "./SkillsGrid";
import { useToggledSkills } from "./context/ToggledSkillsContext";
import { useTrack } from "./context/TrackContext";
import { useToast } from "@/components/ui/use-toast";

interface CompetencyGraphProps {
  track?: "Professional" | "Managerial";
  roleId?: string;
}

const jobTitles: { [key: string]: string } = {
  "123": "AI Engineer",
  "124": "Backend Engineer",
  "125": "Frontend Engineer",
  "126": "Engineering Manager"
};

export const CompetencyGraph = ({ track: initialTrack, roleId }: CompetencyGraphProps) => {
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    const savedCategory = localStorage.getItem('selectedCategory');
    return savedCategory || "all";
  });
  const { toggledSkills } = useToggledSkills();
  const { getTrackForRole } = useTrack();
  const { toast } = useToast();

  const track = roleId ? getTrackForRole(roleId) : initialTrack || "Professional";
  const jobTitle = roleId ? jobTitles[roleId] : undefined;

  useEffect(() => {
    localStorage.setItem('selectedCategory', selectedCategory);
  }, [selectedCategory]);

  if (!jobTitle) {
    console.warn('Invalid or missing role ID');
    return null;
  }

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

  const getSkillsByCategory = () => {
    const skillsArray = Array.from(toggledSkills);
    
    if (selectedCategory === "all") {
      return skillsArray.filter(skill => 
        isSpecializedSkill(skill, roleId) || 
        isCommonSkill(skill, roleId) || 
        isCertificationSkill(skill, roleId)
      );
    }
    
    if (selectedCategory === "specialized") {
      return skillsArray.filter(skill => isSpecializedSkill(skill, roleId));
    }
    
    if (selectedCategory === "common") {
      return skillsArray.filter(skill => isCommonSkill(skill, roleId));
    }
    
    if (selectedCategory === "certification") {
      return skillsArray.filter(skill => isCertificationSkill(skill, roleId));
    }
    
    return [];
  };

  const uniqueSkills = getSkillsByCategory().sort();
  const skillCounts = categorizeSkills(Array.from(toggledSkills), roleId);

  const getSkillDetails = (skillName: string, level: string) => {
    if (!skills || !skills[level]) return { level: "-", required: "-" };
    return skills[level]?.find((s: { name: string; level: string; required: string; }) => s.name === skillName) || { level: "-", required: "-" };
  };

  return (
    <div className="space-y-6">
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
