import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { SearchFilter } from "@/components/market/SearchFilter";
import { technicalSkills, softSkills } from '@/components/skillsData';
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useToggledSkills } from "../context/ToggledSkillsContext";
import { roleSkills } from '../data/roleSkills';
import { useParams } from 'react-router-dom';

export const AddSkillDialog = () => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const { toggledSkills, setToggledSkills } = useToggledSkills();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const { id } = useParams();

  const allSkills = [...technicalSkills, ...softSkills];
  const currentRole = roleSkills[id as keyof typeof roleSkills];

  const handleAddSkills = () => {
    console.log('Adding skills:', selectedSkills);
    console.log('Current role:', currentRole?.title);
    
    if (!currentRole) {
      toast({
        title: "Error",
        description: "Could not find the current role profile.",
        variant: "destructive",
      });
      return;
    }

    // Add selected skills to toggledSkills
    const newToggledSkills = new Set(toggledSkills);
    const addedSkills = {
      specialized: [] as any[],
      common: [] as any[],
      certifications: [] as any[]
    };
    
    selectedSkills.forEach(skill => {
      newToggledSkills.add(skill);
      
      // Default categorization logic
      const newSkill = {
        title: skill,
        subcategory: "Added Skills",
        level: "unspecified",
        growth: "20%",
        salary: "$150,000",
        benchmarks: { B: true, R: true, M: true, O: true }
      };

      // Simple categorization based on skill type
      if (technicalSkills.includes(skill)) {
        console.log(`${skill} added to specialized skills`);
        addedSkills.specialized.push(newSkill);
      } else {
        console.log(`${skill} added to common skills`);
        addedSkills.common.push(newSkill);
      }
    });

    // Update the role's skill arrays
    currentRole.specialized = [...currentRole.specialized, ...addedSkills.specialized];
    currentRole.common = [...currentRole.common, ...addedSkills.common];
    currentRole.certifications = [...currentRole.certifications, ...addedSkills.certifications];
    
    console.log('Updated role skills:', {
      specialized: currentRole.specialized.length,
      common: currentRole.common.length,
      certifications: currentRole.certifications.length
    });
    
    setToggledSkills(newToggledSkills);

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
          className="bg-[#1F2144] hover:bg-[#1F2144]/90 text-white rounded-lg px-4 py-2 flex items-center gap-2 shadow-sm"
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