import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { SearchFilter } from "@/components/market/SearchFilter";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useParams } from 'react-router-dom';
import { useToggledSkills } from "../context/ToggledSkillsContext";
import { useCompetencyStore } from "@/components/skills/competency/CompetencyState";
import { getUnifiedSkillData } from '../data/skillDatabaseService';
import { Skills, getAllSkills } from '../data/skills/allSkills';
import { roleSkills, saveRoleSkills } from '../data/roleSkills';
import { normalizeSkillTitle } from '../utils/normalization';
import { generateSkillProgression } from '../competency/autoFillUtils';
import { useTrack } from "../context/TrackContext";

export const AddSkillToProfileDialog = () => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const { id } = useParams<{ id: string }>();
  const { toggledSkills, setToggledSkills } = useToggledSkills();
  const { setSkillState, setSkillProgression } = useCompetencyStore();
  const { getTrackForRole } = useTrack();

  const universalSkills = getAllSkills();
  const allSkills = Array.from(new Set(
    universalSkills.map(s => normalizeSkillTitle(s.title))
  ));

  const handleAddSkills = async () => {
    if (!id) {
      toast({
        title: "Error",
        description: "Could not find the current role profile.",
        variant: "destructive",
      });
      return;
    }

    const track = getTrackForRole(id);
    console.log('Adding skills for track:', { id, track });

    // Get existing role skills
    const existingRoleSkills = roleSkills[id];
    if (!existingRoleSkills) {
      console.error('No existing role skills found for:', id);
      return;
    }

    console.log('Current role skills before adding:', {
      roleId: id,
      track,
      specialized: existingRoleSkills.specialized.length,
      common: existingRoleSkills.common.length,
      certifications: existingRoleSkills.certifications.length,
      roleTrack: existingRoleSkills.roleTrack
    });

    const newToggledSkills = new Set(toggledSkills);
    const updatedRoleSkills = { 
      ...existingRoleSkills,
      roleTrack: track, // Ensure track is preserved
      specialized: [...existingRoleSkills.specialized],
      common: [...existingRoleSkills.common],
      certifications: [...existingRoleSkills.certifications],
      skills: [...existingRoleSkills.skills]
    };

    const addedSkills = [];

    for (const skillTitle of selectedSkills) {
      const normalizedTitle = normalizeSkillTitle(skillTitle);
      console.log('Processing skill:', { skillTitle, normalizedTitle, track });
      
      const skillData = getUnifiedSkillData(skillTitle);
      
      if (skillData) {
        // Add to toggled skills
        newToggledSkills.add(skillTitle);
        
        // Determine category and add to appropriate array
        const category = skillData.category?.toLowerCase() || 'common';
        const skillExists = (array: any[]) => array.some(s => normalizeSkillTitle(s.title) === normalizedTitle);
        
        const enrichedSkillData = {
          ...skillData,
          category,
          roleTrack: track // Ensure track is set on the skill level
        };

        if (!skillExists(updatedRoleSkills.skills)) {
          updatedRoleSkills.skills.push(enrichedSkillData);
          addedSkills.push(enrichedSkillData);
          
          // Add to specific category array
          if (category === 'specialized' && !skillExists(updatedRoleSkills.specialized)) {
            updatedRoleSkills.specialized.push(enrichedSkillData);
          } else if (category === 'common' && !skillExists(updatedRoleSkills.common)) {
            updatedRoleSkills.common.push(enrichedSkillData);
          } else if (category === 'certification' && !skillExists(updatedRoleSkills.certifications)) {
            updatedRoleSkills.certifications.push(enrichedSkillData);
          }
        }

        // Generate and set progression
        const progression = generateSkillProgression(skillTitle, category, track, id);
        if (progression) {
          console.log('Generated progression for skill:', {
            skill: skillTitle,
            progression,
            track
          });
          setSkillProgression(skillTitle, progression, id);
        }
      }
    }

    console.log('Saving updated role skills:', {
      roleId: id,
      track,
      specialized: updatedRoleSkills.specialized.length,
      common: updatedRoleSkills.common.length,
      certifications: updatedRoleSkills.certifications.length,
      totalSkills: updatedRoleSkills.skills.length,
      roleTrack: updatedRoleSkills.roleTrack
    });

    // Update roleSkills and save to storage
    roleSkills[id] = updatedRoleSkills;
    await saveRoleSkills(id, updatedRoleSkills);
    setToggledSkills(newToggledSkills);

    toast({
      title: "Skills Added",
      description: `Added ${addedSkills.length} skill${addedSkills.length === 1 ? '' : 's'} to the profile.`,
    });

    setSelectedSkills([]);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          className="bg-[#1F2144] hover:bg-[#1F2144]/90 text-white rounded-lg px-4 py-2 flex items-center gap-2"
        >
          <div className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center">
            <Plus className="h-3 w-3 stroke-[2]" />
          </div>
          <span className="text-sm font-medium">Add Skill</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Skills to Profile</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <SearchFilter
            label=""
            placeholder="Search skills..."
            items={allSkills}
            selectedItems={selectedSkills}
            onItemsChange={setSelectedSkills}
            singleSelect={false}
          />

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setSelectedSkills([]);
                setOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAddSkills}
              disabled={selectedSkills.length === 0}
            >
              Add Selected Skills
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};