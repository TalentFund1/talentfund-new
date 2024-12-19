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
import { roleSkills } from '../data/roleSkills';
import { normalizeSkillTitle } from '../utils/normalization';
import { getEmployeeSkills, updateEmployeeSkills } from "@/components/benchmark/skills-matrix/initialSkills";
import { SkillRequirement } from '../types/SkillTypes';

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
        description: "Could not find the current employee profile.",
        variant: "destructive",
      });
      return;
    }

    console.log('Adding skills to employee:', id);

    // Get current employee skills
    const currentSkills = getEmployeeSkills(id);
    console.log('Current employee skills:', currentSkills.length);

    // Add new skills
    const updatedSkills = [...currentSkills];
    const addedSkills: string[] = [];

    selectedSkills.forEach(skillTitle => {
      const normalizedTitle = normalizeSkillTitle(skillTitle);
      
      // Check if skill already exists
      if (currentSkills.some(s => normalizeSkillTitle(s.title) === normalizedTitle)) {
        console.log('Skipping duplicate skill:', skillTitle);
        return;
      }

      const skillData = getUnifiedSkillData(skillTitle, true);
      if (skillData) {
        console.log('Processing skill:', skillData);
        
        // Add to toggled skills
        const newToggledSkills = new Set(toggledSkills);
        newToggledSkills.add(skillTitle);
        setToggledSkills(newToggledSkills);
        
        // Initialize skill state with unspecified level and preferred requirement
        // Added 'employee' as the fifth argument
        setSkillState(skillTitle, 'unspecified', 'preferred', id, 'employee');

        // Add to employee skills with properly typed requirement
        const newSkill = {
          ...skillData,
          level: 'unspecified',
          requirement: 'preferred' as SkillRequirement
        };
        
        updatedSkills.push(newSkill);
        addedSkills.push(skillTitle);
        console.log('Added new skill:', newSkill);
      }
    });

    // Update employee skills
    updateEmployeeSkills(id, updatedSkills);
    console.log('Updated employee skills:', {
      employeeId: id,
      previousCount: currentSkills.length,
      newCount: updatedSkills.length,
      addedSkills
    });

    if (addedSkills.length > 0) {
      toast({
        title: "Skills Added",
        description: `Added ${addedSkills.length} skill${addedSkills.length === 1 ? '' : 's'} to your profile.`,
      });
    } else {
      toast({
        title: "No New Skills",
        description: "No new skills were added to your profile.",
      });
    }

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