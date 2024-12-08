import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { SearchFilter } from "@/components/market/SearchFilter";
import { technicalSkills, softSkills, getSkillCategorization } from '@/components/skillsData';
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

    // Check for duplicate skills before adding
    const existingSkills = new Set([
      ...currentRole.specialized.map(s => s.title),
      ...currentRole.common.map(s => s.title),
      ...currentRole.certifications.map(s => s.title)
    ]);

    const duplicateSkills = selectedSkills.filter(skill => existingSkills.has(skill));
    const newSkills = selectedSkills.filter(skill => !existingSkills.has(skill));

    if (duplicateSkills.length > 0) {
      toast({
        title: "Duplicate Skills",
        description: `${duplicateSkills.join(", ")} already exist in the profile.`,
        variant: "warning",
      });

      if (newSkills.length === 0) {
        setSelectedSkills([]);
        setOpen(false);
        return;
      }
    }

    // Add only new skills to toggledSkills
    const newToggledSkills = new Set(toggledSkills);
    const addedSkills = {
      specialized: [] as any[],
      common: [] as any[],
      certifications: [] as any[]
    };
    
    newSkills.forEach(skill => {
      newToggledSkills.add(skill);
      
      // Get universal categorization for the skill
      const categorization = getSkillCategorization(skill);
      console.log('Categorizing skill:', skill, 'with universal categorization:', categorization);
      
      const newSkill = {
        title: skill,
        subcategory: categorization.subcategory,
        level: "unspecified",
        growth: "20%",
        salary: "$150,000",
        benchmarks: { B: true, R: true, M: true, O: true }
      };

      // Always use universal categorization
      if (categorization.category === 'specialized') {
        console.log(`${skill} added to specialized skills based on universal categorization`);
        addedSkills.specialized.push(newSkill);
      } else if (categorization.category === 'certification') {
        console.log(`${skill} added to certifications based on universal categorization`);
        addedSkills.certifications.push(newSkill);
      } else {
        console.log(`${skill} added to common skills based on universal categorization`);
        addedSkills.common.push(newSkill);
      }
    });

    // Update the role's skill arrays with only new skills
    currentRole.specialized = [...currentRole.specialized, ...addedSkills.specialized];
    currentRole.common = [...currentRole.common, ...addedSkills.common];
    currentRole.certifications = [...currentRole.certifications, ...addedSkills.certifications];
    
    console.log('Updated role skills:', {
      specialized: currentRole.specialized.length,
      common: currentRole.common.length,
      certifications: currentRole.certifications.length
    });
    
    setToggledSkills(newToggledSkills);

    if (newSkills.length > 0) {
      toast({
        title: "Skills Added",
        description: `Added ${newSkills.length} new skill${newSkills.length === 1 ? '' : 's'} to the profile.`,
      });
    }

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