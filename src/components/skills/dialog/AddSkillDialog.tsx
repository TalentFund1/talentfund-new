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
import { getUnifiedSkillData } from '../data/centralSkillsDatabase';
import { useCompetencyStore } from '../competency/CompetencyState';
import { professionalLevels, managerialLevels } from '../../benchmark/data/levelData';

export const AddSkillDialog = () => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const { toggledSkills, setToggledSkills } = useToggledSkills();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const { initializeState, setSkillState } = useCompetencyStore();

  const allSkills = [...technicalSkills, ...softSkills];
  const currentRole = roleSkills[id as keyof typeof roleSkills];

  const initializeSkillLevels = (skillTitle: string, roleId: string) => {
    console.log('Initializing levels for skill:', skillTitle);
    
    // Initialize for both tracks to ensure compatibility
    const professionalLevelKeys = Object.keys(professionalLevels);
    const managerialLevelKeys = Object.keys(managerialLevels);
    
    // Initialize Professional track levels
    professionalLevelKeys.forEach(level => {
      console.log('Setting professional level:', { skill: skillTitle, level });
      setSkillState(
        skillTitle,
        'unspecified',
        level.toLowerCase(),
        'preferred',
        roleId
      );
    });

    // Initialize Managerial track levels
    managerialLevelKeys.forEach(level => {
      console.log('Setting managerial level:', { skill: skillTitle, level });
      setSkillState(
        skillTitle,
        'unspecified',
        level.toLowerCase(),
        'preferred',
        roleId
      );
    });
  };

  const handleAddSkills = () => {
    console.log('Adding skills:', selectedSkills);
    console.log('Current role:', currentRole?.title);
    
    if (!currentRole || !id) {
      toast({
        title: "Error",
        description: "Could not find the current role profile.",
        variant: "destructive",
      });
      return;
    }

    // Initialize competency state for the role if not already done
    initializeState(id);

    // Add selected skills to toggledSkills
    const newToggledSkills = new Set(toggledSkills);
    const addedSkills = {
      specialized: [] as any[],
      common: [] as any[],
      certifications: [] as any[]
    };
    
    selectedSkills.forEach(skillTitle => {
      console.log('Processing skill:', skillTitle);
      newToggledSkills.add(skillTitle);
      
      // Get complete skill data from centralized database
      const skillData = getUnifiedSkillData(skillTitle);
      console.log('Retrieved unified skill data:', { skillTitle, skillData });
      
      // Initialize skill levels with unspecified/preferred defaults
      initializeSkillLevels(skillTitle, id);

      // Categorize skill based on its type from the unified database
      const category = skillData.category || 'common';
      switch (category) {
        case 'specialized':
          addedSkills.specialized.push(skillData);
          break;
        case 'common':
          addedSkills.common.push(skillData);
          break;
        case 'certification':
          addedSkills.certifications.push(skillData);
          break;
        default:
          console.warn(`Unknown category for skill: ${skillTitle}`);
          addedSkills.common.push(skillData);
      }
    });

    // Update the role's skill arrays with complete skill data
    currentRole.specialized = [...currentRole.specialized, ...addedSkills.specialized];
    currentRole.common = [...currentRole.common, ...addedSkills.common];
    currentRole.certifications = [...currentRole.certifications, ...addedSkills.certifications];
    
    console.log('Updated role skills:', {
      specialized: currentRole.specialized.length,
      common: currentRole.common.length,
      certifications: currentRole.certifications.length
    });

    // Update toggled skills state
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
          <div className="w-5 h-5 rounded-full border-[1.75px] border-white flex items-center justify-center">
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