import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { SearchFilter } from "@/components/market/SearchFilter";
import { technicalSkills, softSkills } from '@/components/skillsData';
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useToggledSkills } from "../context/ToggledSkillsContext";
import { getSkillByTitle, skillsDatabase } from "../data/skillsDatabase";

export const AddSkillDialog = () => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const { toggledSkills, setToggledSkills } = useToggledSkills();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const allSkills = [...technicalSkills, ...softSkills];

  const handleAddSkills = () => {
    console.log('Adding skills:', selectedSkills);
    console.log('Current toggled skills before addition:', Array.from(toggledSkills));
    
    const newToggledSkills = new Set(toggledSkills);
    const categorizedCounts = {
      critical: 0,
      technical: 0,
      necessary: 0
    };

    selectedSkills.forEach(skillTitle => {
      const skillInfo = getSkillByTitle(skillTitle);
      if (skillInfo) {
        newToggledSkills.add(skillTitle);
        categorizedCounts[skillInfo.category]++;
      }
    });
    
    console.log('New toggled skills after addition:', Array.from(newToggledSkills));
    setToggledSkills(newToggledSkills);

    toast({
      title: "Skills Added",
      description: `Added ${selectedSkills.length} skill${selectedSkills.length === 1 ? '' : 's'} to the profile:
        ${categorizedCounts.critical} critical, 
        ${categorizedCounts.technical} technical, 
        ${categorizedCounts.necessary} necessary`,
    });

    setSelectedSkills([]);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Skill
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