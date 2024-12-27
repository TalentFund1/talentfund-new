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
import { useToast } from "@/hooks/use-toast";

export const AddEmployeeSkillDialog = () => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { initializeEmployeeSkills } = useEmployeeSkillsStore();
  const { setToggledSkills, toggledSkills } = useToggledSkills();
  const { toast } = useToast();

  // Get all available skills from universal database
  const universalSkills = getAllSkills();
  const allSkills = Array.from(new Set(
    universalSkills.map(s => normalizeSkillTitle(s.title))
  ));

  const handleSuccess = async () => {
    try {
      setIsLoading(true);
      console.log('Skills added successfully, reinitializing...');
      
      await initializeEmployeeSkills("123"); // Force reinitialization
      
      // Update toggled skills to include newly added ones
      const newToggledSkills = new Set(toggledSkills);
      selectedSkills.forEach(skill => newToggledSkills.add(skill));
      setToggledSkills(newToggledSkills);
      
      toast({
        title: "Success",
        description: "Skills added successfully",
      });

      setSelectedSkills([]);
      setOpen(false);
    } catch (error) {
      console.error('Error adding skills:', error);
      toast({
        title: "Error",
        description: "Failed to add skills. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const { handleAddSkills } = useSkillAddition(handleSuccess);

  const handleCancel = () => {
    if (!isLoading) {
      setSelectedSkills([]);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          className="bg-[#1F2144] hover:bg-[#1F2144]/90 text-white rounded-lg px-4 py-2 flex items-center gap-2"
          disabled={isLoading}
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
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
};