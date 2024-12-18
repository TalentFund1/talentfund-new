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

export const AddSkillToProfileDialog = () => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const { id } = useParams<{ id: string }>();
  const { toggledSkills, setToggledSkills } = useToggledSkills();
  const { setSkillState } = useCompetencyStore();

  // Get all unique skills from our core data structure
  const allSkills = Array.from(new Set([
    ...Skills.specialized.map(s => s.title),
    ...Skills.common.map(s => s.title),
    ...Skills.certification.map(s => s.title)
  ]));
  
  console.log('Available skills for selection:', {
    totalSkills: allSkills.length,
    sampleSkills: allSkills.slice(0, 5),
    allSkills: allSkills,
    sources: {
      specialized: Skills.specialized.length,
      common: Skills.common.length,
      certification: Skills.certification.length
    }
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

    // Add skills to toggled skills and initial skills
    const newToggledSkills = new Set(toggledSkills);
    selectedSkills.forEach(skillTitle => {
      const skillData = getUnifiedSkillData(skillTitle);
      if (skillData) {
        console.log('Adding skill to profile:', {
          title: skillData.title,
          category: skillData.category,
          weight: skillData.weight
        });
        
        newToggledSkills.add(skillTitle);
        
        // Initialize skill state in matrix
        setSkillState(skillTitle, 'unspecified', 'p4', 'preferred', id);

        // Add to initial skills
        addSkillToInitialSkills(id, skillData);

        // Add to roleSkills
        const currentRole = roleSkills[id as keyof typeof roleSkills];
        if (currentRole) {
          // Determine which array to add the skill to based on its category
          if (skillData.category === 'specialized') {
            if (!currentRole.specialized.some(s => s.title === skillData.title)) {
              currentRole.specialized.push(skillData);
            }
          } else if (skillData.category === 'common') {
            if (!currentRole.common.some(s => s.title === skillData.title)) {
              currentRole.common.push(skillData);
            }
          } else if (skillData.category === 'certification') {
            if (!currentRole.certifications.some(s => s.title === skillData.title)) {
              currentRole.certifications.push(skillData);
            }
          }
          console.log('Added skill to roleSkills:', {
            roleId: id,
            skill: skillData.title,
            category: skillData.category
          });
        }
      }
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