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
import { CompetencyGraphHeader } from "./competency/CompetencyGraphHeader";
import { CompetencyGraphTable } from "./competency/CompetencyGraphTable";
import { generateSkillProgression } from "./competency/autoFillUtils";
import { Brain } from "lucide-react";

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
  const { saveChanges, cancelChanges, hasChanges, initializeStates, setSkillProgression } = useCompetencyStore();
  const { toast } = useToast();
  const { id: urlRoleId } = useParams<{ id: string }>();

  const currentRoleId = propRoleId || urlRoleId || "123";
  const savedTrack = getTrackForRole(currentRoleId);
  const [track, setTrack] = useState<"Professional" | "Managerial">(savedTrack);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    setTrack(savedTrack);
  }, [savedTrack]);

  useEffect(() => {
    initializeStates(currentRoleId);
  }, [currentRoleId, initializeStates]);

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

  const handleGenerateWithAI = async () => {
    console.log("Starting AI generation for skills...", { currentRoleId, track });
    setIsGenerating(true);
    
    try {
      // Get current role skills
      const currentRoleSkills = roleSkills[currentRoleId as keyof typeof roleSkills];
      if (!currentRoleSkills) {
        console.error('No skills found for current role:', currentRoleId);
        throw new Error('No skills found for current role');
      }

      console.log('Found role skills:', {
        specialized: currentRoleSkills.specialized?.length || 0,
        common: currentRoleSkills.common?.length || 0,
        certifications: currentRoleSkills.certifications?.length || 0
      });

      const allSkills = [
        ...currentRoleSkills.specialized,
        ...currentRoleSkills.common,
        ...currentRoleSkills.certifications
      ].filter(skill => toggledSkills.has(skill.title)); // Only process toggled skills

      console.log('Processing skills generation for:', allSkills.map(s => s.title));

      // Generate progression for each skill
      allSkills.forEach(skill => {
        let category = "specialized";
        if (currentRoleSkills.common.some(s => s.title === skill.title)) {
          category = "common";
        } else if (currentRoleSkills.certifications.some(s => s.title === skill.title)) {
          category = "certification";
        }

        console.log('Generating progression for skill:', { 
          title: skill.title, 
          category,
          track,
          roleId: currentRoleId 
        });

        const progression = generateSkillProgression(skill.title, category, track, currentRoleId);
        console.log('Generated progression:', { skill: skill.title, progression });
        
        // Update each level's state for the skill
        Object.entries(progression).forEach(([level, state]) => {
          setSkillProgression(skill.title, {
            [level]: {
              level: state.level,
              required: state.required
            }
          });
        });
      });

      // Save changes to persist the generated progressions
      saveChanges();

      toast({
        title: "Skills Generated",
        description: "Skill levels have been automatically generated based on industry standards.",
      });
    } catch (error) {
      console.error("Error generating skills:", error);
      toast({
        title: "Generation Failed",
        description: "There was an error generating the skill levels. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <CompetencyGraphHeader 
        currentRoleId={currentRoleId}
        hasChanges={hasChanges}
        onSave={handleSave}
        onCancel={handleCancel}
      />
      
      <Separator className="my-6" />
      
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-foreground mb-6">{jobTitles[currentRoleId]}</h3>
        <div className="flex justify-between items-center mb-6">
          <TrackSelection onTrackChange={setTrack} />
          <Button 
            onClick={handleGenerateWithAI}
            className="bg-primary hover:bg-primary/90 flex items-center gap-2"
            disabled={isGenerating}
          >
            <Brain className="h-4 w-4" />
            {isGenerating ? "Generating..." : "Generate with AI"}
          </Button>
        </div>
      </div>

      <CategorySection 
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <CompetencyGraphTable 
        currentRoleId={currentRoleId}
        track={track}
        selectedCategory={selectedCategory}
        toggledSkills={toggledSkills}
      />
    </div>
  );
};