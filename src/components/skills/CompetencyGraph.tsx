import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { SkillCell } from "./competency/SkillCell";
import { useToggledSkills } from "./context/ToggledSkillsContext";
import { CategorySection } from "./competency/CategorySection";
import { useCompetencyStore } from "./competency/CompetencyState";
import { useToast } from "@/hooks/use-toast";
import { TrackSelection } from "./TrackSelection";
import { useTrack } from "./context/TrackContext";
import { jobTitles } from "./competency/skillProfileData";
import { useParams } from "react-router-dom";
import { roleSkills } from "./data/roleSkills";
import { professionalLevels, managerialLevels } from "../benchmark/data/levelData";

interface CompetencyGraphProps {
  track?: "Professional" | "Managerial";
  roleId?: string;
}

type LevelCounts = {
  advanced: number;
  intermediate: number;
  beginner: number;
  unspecified: number;
};

const calculateLevelCounts = (skillName: string, currentStates: any, levels: string[]): LevelCounts => {
  const counts: LevelCounts = {
    advanced: 0,
    intermediate: 0,
    beginner: 0,
    unspecified: 0
  };

  levels.forEach(level => {
    const skillState = currentStates[skillName]?.[level];
    const skillLevel = (skillState?.level || 'unspecified').toLowerCase();
    counts[skillLevel as keyof LevelCounts]++;
  });

  return counts;
};

const sortSkillsByLevelCount = (skills: string[], currentStates: any, levels: string[]): string[] => {
  return [...skills].sort((a, b) => {
    const countsA = calculateLevelCounts(a, currentStates, levels);
    const countsB = calculateLevelCounts(b, currentStates, levels);

    // Sort by advanced count first
    if (countsB.advanced !== countsA.advanced) {
      return countsB.advanced - countsA.advanced;
    }
    
    // Then by intermediate count
    if (countsB.intermediate !== countsA.intermediate) {
      return countsB.intermediate - countsA.intermediate;
    }
    
    // Then by beginner count
    if (countsB.beginner !== countsA.beginner) {
      return countsB.beginner - countsA.beginner;
    }
    
    // Finally by unspecified count
    return countsB.unspecified - countsA.unspecified;
  });
};

export const CompetencyGraph = ({ track: initialTrack, roleId: propRoleId }: CompetencyGraphProps) => {
  const { toggledSkills } = useToggledSkills();
  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    const savedCategory = localStorage.getItem('selectedCategory');
    return savedCategory || "all";
  });
  const { getTrackForRole } = useTrack();
  const { toast } = useToast();
  const { id: urlRoleId } = useParams<{ id: string }>();
  const { currentStates, saveChanges, cancelChanges, hasChanges } = useCompetencyStore();

  const currentRoleId = propRoleId || urlRoleId || "123";
  const [track, setTrack] = useState<"Professional" | "Managerial">(
    initialTrack || getTrackForRole(currentRoleId) || "Professional"
  );
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

  const handleTrackChange = (newTrack: "Professional" | "Managerial") => {
    setTrack(newTrack);
  };

  const getLevelsForTrack = () => {
    return track === "Managerial" ? Object.keys(managerialLevels) : Object.keys(professionalLevels);
  };

  const getSkillsByCategory = () => {
    const currentRoleSkills = roleSkills[currentRoleId as keyof typeof roleSkills] || roleSkills["123"];
    let skills: string[] = [];
    
    if (selectedCategory === "all") {
      skills = [
        ...(currentRoleSkills.specialized?.map(s => s.title) || []),
        ...(currentRoleSkills.common?.map(s => s.title) || []),
        ...(currentRoleSkills.certifications?.map(s => s.title) || [])
      ];
    } else if (selectedCategory === "specialized") {
      skills = currentRoleSkills.specialized?.map(s => s.title) || [];
    } else if (selectedCategory === "common") {
      skills = currentRoleSkills.common?.map(s => s.title) || [];
    } else if (selectedCategory === "certification") {
      skills = currentRoleSkills.certifications?.map(s => s.title) || [];
    }

    return skills.filter(skillTitle => toggledSkills.has(skillTitle));
  };

  const levels = getLevelsForTrack();
  const skills = getSkillsByCategory();
  const sortedSkills = sortSkillsByLevelCount(skills, currentStates, levels);

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
        <TrackSelection onTrackChange={handleTrackChange} />
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
                  <div className="font-semibold">{level.toUpperCase()}</div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedSkills.map((skillName) => (
              <TableRow key={skillName} className="hover:bg-background/30 transition-colors">
                <TableCell className="font-medium border-r border-border">
                  {skillName}
                </TableCell>
                {levels.map((level, index) => (
                  <SkillCell 
                    key={level}
                    skillName={skillName}
                    details={currentStates[skillName]?.[level] || { level: 'unspecified', required: 'preferred' }}
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