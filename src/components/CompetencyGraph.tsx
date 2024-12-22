import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useToggledSkills } from "@/components/skills/context/ToggledSkillsContext";
import { CategorySection } from "@/components/skills/competency/CategorySection";
import { useCompetencyStore } from "@/components/skills/competency/CompetencyState";
import { useToast } from "@/hooks/use-toast";
import { TrackSelection } from "@/components/skills/TrackSelection";
import { roleSkills } from "@/components/skills/data/roleSkills";
import { useParams } from "react-router-dom";
import { CompetencyGraphHeader } from "@/components/skills/competency/CompetencyGraphHeader";
import { CompetencyGraphTable } from "@/components/skills/competency/CompetencyGraphTable";
import { generateSkillProgression } from "@/components/skills/competency/autoFillUtils";
import { Brain, RotateCcw } from "lucide-react";
import { useTrack } from "@/components/skills/context/TrackContext";

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
  
  const { saveChanges, cancelChanges, hasChanges, setSkillProgression, resetLevels } = useCompetencyStore();
  const { toast } = useToast();
  const { id: urlRoleId } = useParams<{ id: string }>();
  const [isGenerating, setIsGenerating] = useState(false);
  const { getTrackForRole } = useTrack();
  const currentRoleId = propRoleId || urlRoleId || "123";
  const savedTrack = getTrackForRole(currentRoleId);
  const [track, setTrack] = useState<"Professional" | "Managerial">(savedTrack);

  useEffect(() => {
    setTrack(savedTrack);
  }, [savedTrack]);

  const handleGenerateWithAI = async () => {
    console.log("Starting AI generation for skills...", { currentRoleId, track });
    setIsGenerating(true);
    
    try {
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
        ...(currentRoleSkills.specialized || []),
        ...(currentRoleSkills.common || []),
        ...(currentRoleSkills.certifications || [])
      ].filter(skill => toggledSkills.has(skill.title));

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
        
        if (progression) {
          setSkillProgression(skill.title, progression, currentRoleId);
        }
      });

      // Save changes to persist the generated progressions
      saveChanges(currentRoleId);

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

  const handleSave = () => {
    saveChanges(currentRoleId);
    toast({
      title: "Changes saved",
      description: "Your changes have been saved successfully.",
    });
  };

  const handleCancel = () => {
    cancelChanges(currentRoleId);
    toast({
      title: "Changes cancelled",
      description: "Your changes have been discarded.",
    });
  };

  const handleResetLevels = () => {
    console.log('Resetting levels for role:', currentRoleId);
    resetLevels(currentRoleId);
    toast({
      title: "Levels reset",
      description: "All skill levels have been reset to their default values.",
    });
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
        <h3 className="text-2xl font-bold text-foreground mb-6">
          {roleSkills[currentRoleId as keyof typeof roleSkills]?.title}
        </h3>
        <div className="flex justify-between items-center mb-6">
          <TrackSelection onTrackChange={setTrack} />
          <div className="flex items-center gap-4">
            <Button
              onClick={handleResetLevels}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Reset Levels
            </Button>
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
