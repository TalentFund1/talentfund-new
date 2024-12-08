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
import { categorizeSkill } from '../competency/skillCategories';

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
    
    selectedSkills.forEach(skill => {
      newToggledSkills.add(skill);
      
      // Check if skill already exists in any category
      const skillExists = currentRole.specialized.some(s => s.title === skill) ||
                         currentRole.common.some(s => s.title === skill) ||
                         currentRole.certifications.some(s => s.title === skill);
      
      if (!skillExists) {
        console.log('Categorizing new skill:', skill);
        const category = categorizeSkill(skill, id || "123");
        
        const newSkill = {
          title: skill,
          subcategory: category === 'specialized' ? 'Specialized Skills' :
                       category === 'common' ? 'Common Skills' : 'Certifications',
          level: "unspecified",
          growth: "20%",
          salary: "$150,000",
          benchmarks: { J: true, B: true, O: true }
        };

        // Add to appropriate category array
        switch(category) {
          case 'specialized':
            console.log('Adding to specialized skills:', skill);
            currentRole.specialized.push(newSkill);
            break;
          case 'common':
            console.log('Adding to common skills:', skill);
            currentRole.common.push(newSkill);
            break;
          case 'certification':
            console.log('Adding to certifications:', skill);
            currentRole.certifications.push(newSkill);
            break;
        }
      }
    });
    
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