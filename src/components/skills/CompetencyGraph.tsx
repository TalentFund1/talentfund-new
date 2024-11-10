import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { useToggledSkills } from "./context/ToggledSkillsContext";
import { skillsByCategory } from "./competency/skillsData";
import { SkillCell } from "./competency/SkillCell";
import { useToast } from "@/components/ui/use-toast";

interface CompetencyGraphProps {
  track: "Professional" | "Managerial";
}

interface SkillState {
  [skillName: string]: {
    [level: string]: {
      level: string;
      required: string;
    };
  };
}

export const CompetencyGraph = ({ track }: CompetencyGraphProps) => {
  const { toggledSkills } = useToggledSkills();
  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    const savedCategory = localStorage.getItem('selectedCategory');
    return savedCategory || "all";
  });
  const [currentTrack, setCurrentTrack] = useState<"Professional" | "Managerial">(track);
  const [hasChanges, setHasChanges] = useState(false);
  const [skillStates, setSkillStates] = useState<SkillState>({});
  const [savedSkillStates, setSavedSkillStates] = useState<SkillState>({});
  const { toast } = useToast();

  useEffect(() => {
    setCurrentTrack(track);
  }, [track]);

  useEffect(() => {
    localStorage.setItem('selectedCategory', selectedCategory);
  }, [selectedCategory]);

  const getSkillsForCategory = () => {
    const categoryData = skillsByCategory[selectedCategory as keyof typeof skillsByCategory];
    return currentTrack === "Professional" ? categoryData?.professional : categoryData?.managerial;
  };

  const skills = getSkillsForCategory() || {};
  const levels = currentTrack === "Professional" ? ["P1", "P2", "P3", "P4", "P5", "P6"] : ["M3", "M4", "M5", "M6"];

  const handleSkillChange = (skillName: string, level: string, newValue: { level: string; required: string }) => {
    setSkillStates(prev => ({
      ...prev,
      [skillName]: {
        ...(prev[skillName] || {}),
        [level]: newValue
      }
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    setSavedSkillStates(skillStates);
    setHasChanges(false);
    toast({
      title: "Changes saved successfully",
      description: "Your skill levels and requirements have been updated.",
    });
  };

  const handleCancel = () => {
    setSkillStates(savedSkillStates);
    setHasChanges(false);
    toast({
      title: "Changes discarded",
      description: "Your changes have been reverted to the last saved state.",
    });
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

      <Separator className="my-4" />
      
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
          {Object.keys(skills).map((skillName) => (
            <TableRow key={skillName} className="hover:bg-background/30 transition-colors">
              <TableCell className="font-medium border-r border-border">
                {skillName}
              </TableCell>
              {levels.map((level, index) => (
                <SkillCell 
                  key={level}
                  details={skillStates[skillName]?.[level] || { level: "unspecified", required: "preferred" }}
                  isLastColumn={index === levels.length - 1}
                  onChange={(newValue) => handleSkillChange(skillName, level, newValue)}
                  savedState={savedSkillStates[skillName]?.[level]}
                />
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
