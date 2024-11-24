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
  const { saveChanges, cancelChanges, hasChanges, initializeStates } = useCompetencyStore();
  const { toast } = useToast();
  const { id: urlRoleId } = useParams<{ id: string }>();

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
        <TrackSelection onTrackChange={setTrack} />
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