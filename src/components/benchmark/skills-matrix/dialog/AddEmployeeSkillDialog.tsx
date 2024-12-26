import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { SearchFilter } from "@/components/market/SearchFilter";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useParams } from 'react-router-dom';
import { useEmployeeStore } from "@/components/employee/store/employeeStore";
import { getUnifiedSkillData } from '@/components/skills/data/skillDatabaseService';
import { Skills } from '@/components/skills/data/skills/allSkills';
import { normalizeSkillTitle } from '@/components/skills/utils/normalization';
import { useEmployeeSkillsStore } from "../../../employee/store/employeeSkillsStore";

export const AddEmployeeSkillDialog = () => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const { id } = useParams<{ id: string }>();
  const { setEmployeeSkills, getEmployeeSkills } = useEmployeeStore();
  const { initializeEmployeeSkills, setSkillLevel, setSkillGoalStatus } = useEmployeeSkillsStore();

  // Get all available skills without role-specific filtering
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
        description: "Could not find the employee.",
        variant: "destructive",
      });
      return;
    }

    // Initialize employee skills if needed
    initializeEmployeeSkills(id);

    const currentSkills = getEmployeeSkills(id);
    const newSkills = selectedSkills.map(skillTitle => {
      console.log('Processing new skill:', skillTitle);
      const skillData = getUnifiedSkillData(skillTitle);
      
      // Initialize skill state in employee store
      setSkillLevel(id, skillTitle, 'beginner');
      setSkillGoalStatus(id, skillTitle, 'unknown');
      
      return skillData;
    });

    // Combine existing and new skills, avoiding duplicates
    const updatedSkills = [
      ...currentSkills,
      ...newSkills.filter(newSkill => 
        !currentSkills.some(existingSkill => 
          normalizeSkillTitle(existingSkill.title) === normalizeSkillTitle(newSkill.title)
        )
      )
    ];

    console.log('Updating employee skills:', {
      employeeId: id,
      currentSkillCount: currentSkills.length,
      newSkillCount: newSkills.length,
      totalSkillCount: updatedSkills.length
    });

    setEmployeeSkills(id, updatedSkills);

    toast({
      title: "Skills Added",
      description: `Added ${newSkills.length} skill${newSkills.length === 1 ? '' : 's'} to your profile.`,
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