import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Brain, RotateCcw } from "lucide-react";
import { useState, useEffect } from "react";
import { useToggledSkills } from "../../skills/context/ToggledSkillsContext";
import { useCompetencyStore } from "../../skills/competency/CompetencyState";
import { useToast } from "@/hooks/use-toast";
import { TrackSelection } from "../../skills/TrackSelection";
import { useTrack } from "../../skills/context/TrackContext";
import { CompetencyGraphTable } from "../../skills/competency/CompetencyGraphTable";
import { CategorySection } from "../../skills/competency/CategorySection";
import { generateSkillProgression } from "../../skills/competency/autoFillUtils";
import { roleSkills } from "../../skills/data/roleSkills";

interface BenchmarkCompetencyMatrixProps {
  roleId: string;
  roleLevel: string;
}

export const BenchmarkCompetencyMatrix = ({ roleId, roleLevel }: BenchmarkCompetencyMatrixProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const { toggledSkills } = useToggledSkills();
  const { getTrackForRole } = useTrack();
  const { saveChanges, hasChanges, initializeStates, setSkillProgression, resetLevels } = useCompetencyStore();
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const savedTrack = getTrackForRole(roleId);
  const [track, setTrack] = useState<"Professional" | "Managerial">(savedTrack);

  useEffect(() => {
    setTrack(savedTrack);
  }, [savedTrack]);

  useEffect(() => {
    initializeStates(roleId);
  }, [roleId, initializeStates]);

  const handleGenerateWithAI = async () => {
    console.log("Starting AI generation for skills...", { roleId, track });
    setIsGenerating(true);
    
    try {
      const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills];
      if (!currentRoleSkills) {
        console.error('No skills found for current role:', roleId);
        throw new Error('No skills found for current role');
      }

      const allSkills = [
        ...currentRoleSkills.specialized,
        ...currentRoleSkills.common,
        ...currentRoleSkills.certifications
      ].filter(skill => toggledSkills.has(skill.title));

      allSkills.forEach(skill => {
        let category = "specialized";
        if (currentRoleSkills.common.some(s => s.title === skill.title)) {
          category = "common";
        } else if (currentRoleSkills.certifications.some(s => s.title === skill.title)) {
          category = "certification";
        }

        const progression = generateSkillProgression(skill.title, category, track, roleId);
        setSkillProgression(skill.title, progression, roleId);
      });

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

  const handleResetLevels = () => {
    resetLevels(roleId);
    toast({
      title: "Levels reset",
      description: "All skill levels have been reset to their default values.",
    });
  };

  return (
    <Card className="p-6 space-y-6 bg-white mb-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-foreground">Skills Graph</h3>
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

      <Separator className="my-4" />

      <div className="mb-6">
        <TrackSelection onTrackChange={setTrack} />
      </div>

      <CategorySection 
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <CompetencyGraphTable 
        currentRoleId={roleId}
        track={track}
        selectedCategory={selectedCategory}
        toggledSkills={toggledSkills}
      />
    </Card>
  );
};