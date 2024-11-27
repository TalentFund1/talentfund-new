import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useToggledSkills } from "./context/ToggledSkillsContext";
import { CategorySection } from "./competency/CategorySection";
import { useCompetencyStore } from "./competency/CompetencyState";
import { useToast } from "@/hooks/use-toast";
import { TrackSelection } from "./TrackSelection";
import { useTrack } from "./context/TrackContext";
import { jobTitles } from "./competency/skillProfileData";
import { useParams } from "react-router-dom";
import { CompetencyGraphHeader } from "./competency/CompetencyGraphHeader";
import { CompetencyGraphTable } from "./competency/CompetencyGraphTable";
import { Brain, RotateCcw } from "lucide-react";
import { generateSkillsWithAI } from "./competency/AISkillGenerator";

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
  const { saveChanges, cancelChanges, hasChanges, initializeStates, setSkillProgression, resetLevels } = useCompetencyStore();
  const { toast } = useToast();
  const { id: urlRoleId } = useParams<{ id: string }>();
  const [isGenerating, setIsGenerating] = useState(false);

  const currentRoleId = propRoleId || urlRoleId || "123";
  const savedTrack = getTrackForRole(currentRoleId);
  const [track, setTrack] = useState<"Professional" | "Managerial">(savedTrack);

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

  const handleResetLevels = () => {
    resetLevels(currentRoleId);
    toast({
      title: "Levels reset",
      description: "All skill levels have been reset to their default values.",
    });
  };

  const handleGenerateWithAI = async () => {
    setIsGenerating(true);
    try {
      await generateSkillsWithAI({
        currentRoleId,
        track,
        toggledSkills,
        setSkillProgression,
        saveChanges,
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