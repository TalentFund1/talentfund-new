import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { getAllSkills } from '@/components/skills/data/skills/allSkills';
import { normalizeSkillTitle } from '@/components/skills/utils/normalization';
import { SkillSearchSection } from "./components/SkillSearchSection";
import { useSkillAddition } from "./hooks/useSkillAddition";
import { useEmployeeSkillsStore } from "@/components/employee/store/employeeSkillsStore";
import { useToggledSkills } from "@/components/skills/context/ToggledSkillsContext";

export const AddEmployeeSkillDialog = () => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const { initializeEmployeeSkills } = useEmployeeSkillsStore();
  const { setToggledSkills, toggledSkills } = useToggledSkills();

  // Get all available skills from universal database
  const universalSkills = getAllSkills();
  const allSkills = Array.from(new Set(
    universalSkills.map(s => normalizeSkillTitle(s.title))
  ));

  const handleSuccess = async () => {
    console.log('Skills added successfully, reinitializing...');
    await initializeEmployeeSkills("123"); // Force reinitialization
    
    // Update toggled skills to include newly added ones
    const newToggledSkills = new Set(toggledSkills);
    selectedSkills.forEach(skill => newToggledSkills.add(skill));
    setToggledSkills(newToggledSkills);
    
    setSelectedSkills([]);
    setOpen(false);
  };

  const { handleAddSkills } = useSkillAddition(handleSuccess);

  const handleCancel = () => {
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
        
        <SkillSearchSection
          allSkills={allSkills}
          selectedSkills={selectedSkills}
          setSelectedSkills={setSelectedSkills}
          onCancel={handleCancel}
          onAdd={() => handleAddSkills(selectedSkills)}
        />
      </DialogContent>
    </Dialog>
  );
};