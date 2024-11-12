import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { SkillCell } from "./competency/SkillCell";
import { useToggledSkills } from "./context/ToggledSkillsContext";
import { skillsByCategory } from "./competency/skillsData";
import { CategorySection } from "./competency/CategorySection";
import { categorizeSkills } from "./competency/skillCategories";
import { useCompetencyStore } from "./competency/CompetencyState";
import { useToast } from "@/hooks/use-toast";
import { TrackSelection } from "./TrackSelection";
import { useTrack } from "./context/TrackContext";
import { jobTitles } from "./competency/skillProfileData";
import { useParams } from "react-router-dom";
import { roleSkills } from "./data/roleSkills";

interface CompetencyGraphProps {
  track?: "Professional" | "Managerial";
  roleId?: string;
}

export const CompetencyGraph = ({ track: initialTrack, roleId: propRoleId }: CompetencyGraphProps) => {
  const { toggledSkills } = useToggledSkills();
  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    const savedCategory = localStorage.getItem('selectedCategory');
    return savedCategory || "all";
  });
  const { getTrackForRole } = useTrack();
  const { hasChanges, saveChanges, cancelChanges } = useCompetencyStore();
  const { toast } = useToast();
  const { id: urlRoleId } = useParams<{ id: string }>();

  // Use roleId from props if provided, otherwise use from URL params, fallback to "123"
  const currentRoleId = propRoleId || urlRoleId || "123";
  const track = initialTrack || getTrackForRole(currentRoleId) || "Professional";
  const jobTitle = jobTitles[currentRoleId] || "AI Engineer";

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
    return track === "Professional" 
      ? ["P1", "P2", "P3", "P4", "P5", "P6"] 
      : ["M3", "M4", "M5", "M6"];
  };

  const getSkillsForCategory = () => {
    const categoryData = skillsByCategory[selectedCategory as keyof typeof skillsByCategory];
    return categoryData?.[track.toLowerCase()];
  };

  const getSkillsByCategory = () => {
    const skillsArray = Array.from(toggledSkills);
    const currentRoleSkills = roleSkills[currentRoleId as keyof typeof roleSkills];
    
    if (!currentRoleSkills) return [];

    if (selectedCategory === "all") {
      return skillsArray.filter(skill => 
        currentRoleSkills.specialized.some(s => s.title === skill) ||
        currentRoleSkills.common.some(s => s.title === skill) ||
        currentRoleSkills.certifications.some(s => s.title === skill)
      );
    }
    
    if (selectedCategory === "specialized") {
      return skillsArray.filter(skill => 
        currentRoleSkills.specialized.some(s => s.title === skill)
      );
    }
    
    if (selectedCategory === "common") {
      return skillsArray.filter(skill => 
        currentRoleSkills.common.some(s => s.title === skill)
      );
    }
    
    if (selectedCategory === "certification") {
      return skillsArray.filter(skill => 
        currentRoleSkills.certifications.some(s => s.title === skill)
      );
    }
    
    return [];
  };

  const getSkillDetails = (skillName: string, level: string) => {
    if (!skills || !skills[level]) return { level: "-", required: "-" };
    return skills[level]?.find((s: { name: string; level: string; required: string; }) => 
      s.name === skillName
    ) || { level: "-", required: "-" };
  };

  const skills = getSkillsForCategory() || {};
  const levels = getLevelsForTrack();
  const uniqueSkills = getSkillsByCategory().sort();

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