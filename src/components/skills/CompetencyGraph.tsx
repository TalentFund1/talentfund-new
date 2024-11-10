import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { SkillCell } from "./competency/SkillCell";
import { useToggledSkills } from "./context/ToggledSkillsContext";
import { skillsByCategory } from "./competency/skillsData";
import { CategorySection } from "./competency/CategorySection";
import { categorizeSkills, isSpecializedSkill, isCommonSkill, isCertificationSkill } from "./competency/skillCategories";
import { useCompetencyStore } from "./competency/CompetencyState";
import { useToast } from "@/components/ui/use-toast";
import { TrackSelection } from "./TrackSelection";
import { useTrack } from "./context/TrackContext";
import { useParams } from "react-router-dom";

interface CompetencyGraphProps {
  track?: "Technical" | "Managerial";
}

const jobTitles: { [key: string]: string } = {
  "123": "AI Engineer",
  "124": "Backend Engineer",
  "125": "Frontend Engineer",
  "126": "Engineering Manager"
};

export const CompetencyGraph = ({ track: initialTrack }: CompetencyGraphProps) => {
  const { toggledSkills } = useToggledSkills();
  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    const savedCategory = localStorage.getItem('selectedCategory');
    return savedCategory || "all";
  });
  const { track } = useTrack();
  const { hasChanges, saveChanges, cancelChanges } = useCompetencyStore();
  const { toast } = useToast();
  const { id } = useParams<{ id: string }>();

  const jobTitle = jobTitles[id || "123"] || "AI Engineer";

  useEffect(() => {
    localStorage.setItem('selectedCategory', selectedCategory);
  }, [selectedCategory]);

  const handleSave = () => {
    saveChanges();
    toast({
      title: "Changes saved",
      description: "Your changes have been saved successfully.",
    });
  };

  const handleCancel = () => {
    cancelChanges();
    toast({
      title: "Changes cancelled",
      description: "Your changes have been discarded.",
    });
  };

  const getLevelsForTrack = () => {
    return track === "Technical" 
      ? ["P1", "P2", "P3", "P4", "P5", "P6"] 
      : ["M3", "M4", "M5", "M6"];
  };

  const getSkillsForCategory = () => {
    const categoryData = skillsByCategory[selectedCategory as keyof typeof skillsByCategory];
    return categoryData?.[track.toLowerCase()];
  };

  const skills = getSkillsForCategory() || {};
  const levels = getLevelsForTrack();

  const getSkillsByCategory = () => {
    const skillsArray = Array.from(toggledSkills);
    
    if (selectedCategory === "all") {
      return skillsArray;
    }
    
    if (selectedCategory === "specialized") {
      return skillsArray.filter(isSpecializedSkill);
    }
    
    if (selectedCategory === "common") {
      return skillsArray.filter(isCommonSkill);
    }
    
    if (selectedCategory === "certification") {
      return skillsArray.filter(isCertificationSkill);
    }
    
    return [];
  };

  const uniqueSkills = getSkillsByCategory().sort();
  const skillCounts = categorizeSkills(Array.from(toggledSkills));

  const getSkillDetails = (skillName: string, level: string) => {
    if (!skills || !skills[level]) return { level: "-", required: "-" };
    return skills[level]?.find((s: { name: string; level: string; required: string; }) => s.name === skillName) || { level: "-", required: "-" };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground">Skills Graph</h2>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            onClick={handleCancel}
            disabled={!hasChanges}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            disabled={!hasChanges}
          >
            Save
          </Button>
        </div>
      </div>
      
      <Separator className="my-6" />
      
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-foreground mb-6">{jobTitle}</h3>
        <TrackSelection />
      </div>

      <CategorySection 
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        skillCounts={skillCounts}
      />

      <div className="rounded-lg border border-border bg-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[200px] font-semibold bg-background/80 border-r border-border">
                Skill
              </TableHead>
              {levels.map((level, index) => (
                <TableHead 
                  key={level} 
                  className={`text-center bg-background/80 ${index !== levels.length - 1 ? 'border-r' : ''} border-border`}
                >
                  <div className="font-semibold">{level}</div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {uniqueSkills.map((skillName) => (
              <TableRow key={skillName} className="hover:bg-background/30 transition-colors">
                <TableCell className="font-medium border-r border-border">
                  {skillName}
                </TableCell>
                {levels.map((level, index) => (
                  <SkillCell 
                    key={level}
                    skillName={skillName}
                    details={getSkillDetails(skillName, level)}
                    isLastColumn={index === levels.length - 1}
                    levelKey={level}
                  />
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
