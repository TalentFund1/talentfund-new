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
import { addSkillToInitialSkills } from '../data/skillDatabaseService';
import { roleSkills } from '../data/roleSkills';
import { normalizeSkillTitle } from '../utils/normalization';

export const AddSkillToProfileDialog = () => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const { id } = useParams<{ id: string }>();
  const { toggledSkills, setToggledSkills } = useToggledSkills();
  const { setSkillState } = useCompetencyStore();

  // Get all unique skills from our core data structure
  const allSkills = Array.from(new Set([
    ...Skills.specialized.map(s => normalizeSkillTitle(s.title)),
    ...Skills.common.map(s => normalizeSkillTitle(s.title)),
    ...Skills.certification.map(s => normalizeSkillTitle(s.title))
  ]));
  
  console.log('Available skills for selection:', {
    totalSkills: allSkills.length,
    sampleSkills: allSkills.slice(0, 5)
  });

  const handleAddSkills = () => {
    if (!id) {
      toast({
        title: "Error",
        description: "Could not find the current role profile.",
        variant: "destructive",
      });
      return;
    }

    const currentRole = roleSkills[id as keyof typeof roleSkills];
    if (!currentRole) {
      console.error('Role not found:', id);
      return;
    }

    console.log('Adding skills to role:', id);

    // Add skills to toggled skills and role skills
    const newToggledSkills = new Set(toggledSkills);
    const existingSkillTitles = new Set([
      ...currentRole.specialized.map(s => normalizeSkillTitle(s.title)),
      ...currentRole.common.map(s => normalizeSkillTitle(s.title)),
      ...currentRole.certifications.map(s => normalizeSkillTitle(s.title))
    ]);

    selectedSkills.forEach(skillTitle => {
      const normalizedTitle = normalizeSkillTitle(skillTitle);
      if (existingSkillTitles.has(normalizedTitle)) {
        console.log('Skipping duplicate skill:', skillTitle);
        return;
      }

      const skillData = getUnifiedSkillData(skillTitle, true);
      if (skillData) {
        console.log('Processing skill:', skillData);
        
        // Add to toggled skills
        newToggledSkills.add(skillTitle);
        
        // Initialize skill state in matrix
        setSkillState(skillTitle, 'unspecified', 'p4', 'skill_goal', id);

        // Add to role skills based on category
        const category = skillData.category?.toLowerCase() || 'common';
        
        if (category === 'specialized' && !currentRole.specialized.some(s => normalizeSkillTitle(s.title) === normalizedTitle)) {
          console.log('Adding to specialized skills:', skillData.title);
          currentRole.specialized.push(skillData);
        } else if (category === 'common' && !currentRole.common.some(s => normalizeSkillTitle(s.title) === normalizedTitle)) {
          console.log('Adding to common skills:', skillData.title);
          currentRole.common.push(skillData);
        } else if (category === 'certification' && !currentRole.certifications.some(s => normalizeSkillTitle(s.title) === normalizedTitle)) {
          console.log('Adding to certification skills:', skillData.title);
          currentRole.certifications.push(skillData);
        }

        // Add to initial skills for persistence
        addSkillToInitialSkills(id, skillData);
        existingSkillTitles.add(normalizedTitle);
      }
    });

    setToggledSkills(newToggledSkills);

    console.log('Updated role skills:', {
      roleId: id,
      specialized: currentRole.specialized.length,
      common: currentRole.common.length,
      certifications: currentRole.certifications.length
    });

    toast({
      title: "Skills Added",
      description: `Added ${selectedSkills.length} skill${selectedSkills.length === 1 ? '' : 's'} to the profile.`,
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