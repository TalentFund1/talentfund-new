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
import { getEmployeeSkills } from "@/components/benchmark/skills-matrix/initialSkills";

// Create a Map to store employee skills
const employeeSkillsMap = new Map();

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

  // Initialize employee skills map if not already done
  if (!employeeSkillsMap.has(id)) {
    const initialSkills = getEmployeeSkills(id || "");
    employeeSkillsMap.set(id, initialSkills);
  }

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
    const currentSkills = employeeSkillsMap.get(id) || [];

    // Add new skills
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
        
        // Initialize skill state with unspecified level and skill goal requirement
        setSkillState(skillTitle, 'unspecified', 'skill_goal', id);

        // Add to employee skills
        const newSkill = {
          ...skillData,
          level: 'unspecified',
          requirement: 'skill_goal'
        };
        
        currentSkills.push(newSkill);
        console.log('Added new skill:', newSkill);
      }
    });

    // Update employee skills map
    employeeSkillsMap.set(id, currentSkills);
    console.log('Updated employee skills:', {
      employeeId: id,
      totalSkills: currentSkills.length,
      newSkills: selectedSkills
    });

    toast({
      title: "Skills Added",
      description: `Added ${selectedSkills.length} skill${selectedSkills.length === 1 ? '' : 's'} to your profile.`,
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