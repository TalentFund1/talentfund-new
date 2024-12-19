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
import { Skills } from '../data/skills/allSkills';
import { normalizeSkillTitle } from '../utils/normalization';
import { getEmployeeSkills, updateEmployeeSkills } from "@/components/benchmark/skills-matrix/initialSkills";
import { UnifiedSkill, SkillRequirement, SkillCategory } from '../types/SkillTypes';
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
    ...Skills.specialized.map(s => normalizeSkillTitle(s.title)),
    ...Skills.common.map(s => normalizeSkillTitle(s.title)),
    ...Skills.certification.map(s => normalizeSkillTitle(s.title))
  ]));
  
  console.log('Available skills for selection:', {
    totalSkills: allSkills.length,
    sampleSkills: allSkills.slice(0, 5)
  });

  const handleAddSkills = async () => {
    if (!id) {
      console.error('No ID found in params');
      toast({
        title: "Error",
        description: "Could not find the current profile.",
        variant: "destructive",
      });
      return;
    }

    console.log('Starting skill addition process:', {
      id,
      isRoleProfile: !!roleSkills[id as keyof typeof roleSkills],
      selectedSkills,
      currentToggledSkills: Array.from(toggledSkills)
    });

    // Check if we're in a role profile
    const isRoleProfile = !!roleSkills[id as keyof typeof roleSkills];
    
    if (isRoleProfile) {
      try {
        console.log('Adding skills to role profile:', id);
        const newToggledSkills = new Set(toggledSkills);
        const addedSkills: string[] = [];

        // Process all skills first
        for (const skillTitle of selectedSkills) {
          const normalizedTitle = normalizeSkillTitle(skillTitle);
          console.log('Processing skill:', {
            original: skillTitle,
            normalized: normalizedTitle
          });
          
          newToggledSkills.add(normalizedTitle);
          setSkillState(normalizedTitle, 'unspecified', id, 'preferred' as SkillRequirement, 'role');
          addedSkills.push(normalizedTitle);
        }

        // Update state synchronously first
        setToggledSkills(newToggledSkills);
        
        // Wait a moment for state to update
        await new Promise(resolve => setTimeout(resolve, 100));

        console.log('Updated toggled skills:', {
          roleId: id,
          addedSkills,
          newToggledSkillsCount: newToggledSkills.size,
          currentToggledSkills: Array.from(newToggledSkills)
        });

        // Then dispatch event
        const eventDetail = {
          id,
          type: 'role',
          toggledSkills: Array.from(newToggledSkills)
        };
        
        console.log('Dispatching skillsUpdated event with detail:', eventDetail);
        window.dispatchEvent(new CustomEvent('skillsUpdated', { detail: eventDetail }));

        if (addedSkills.length > 0) {
          toast({
            title: "Skills Added",
            description: `Added ${addedSkills.length} skill${addedSkills.length === 1 ? '' : 's'} to the role profile.`,
          });
        }

        // Reset state and close dialog
        setSelectedSkills([]);
        setOpen(false);
      } catch (error) {
        console.error('Error adding skills to role:', error);
        toast({
          title: "Error",
          description: "Failed to add skills to role profile.",
          variant: "destructive",
        });
      }
    } else {
      // Handle adding skills to employee profile
      console.log('Adding skills to employee profile');
      const currentSkills = getEmployeeSkills(id);
      console.log('Current employee skills:', currentSkills.length);

      const updatedSkills = [...currentSkills];
      const addedSkills: string[] = [];
      const newToggledSkills = new Set(toggledSkills);

      selectedSkills.forEach(skillTitle => {
        const normalizedTitle = normalizeSkillTitle(skillTitle);
        
        if (currentSkills.some(s => normalizeSkillTitle(s.title) === normalizedTitle)) {
          console.log('Skipping duplicate skill:', skillTitle);
          return;
        }

        const skillData = getUnifiedSkillData(skillTitle);
        if (skillData) {
          newToggledSkills.add(normalizedTitle);
          setSkillState(normalizedTitle, 'unspecified', id, 'preferred' as SkillRequirement, 'employee');

          const newSkill: UnifiedSkill = {
            ...skillData,
            title: normalizedTitle,
            level: 'unspecified',
            requirement: 'preferred' as SkillRequirement,
            category: (skillData.category || 'specialized') as SkillCategory,
            subcategory: skillData.subcategory || 'Other',
            growth: skillData.growth || '0%',
            confidence: skillData.confidence || 'low'
          };
          
          updatedSkills.push(newSkill);
          addedSkills.push(normalizedTitle);
          console.log('Added new skill with complete data:', newSkill);
        }
      });

      updateEmployeeSkills(id, updatedSkills);
      setToggledSkills(newToggledSkills);
      
      if (addedSkills.length > 0) {
        toast({
          title: "Skills Added",
          description: `Added ${addedSkills.length} skill${addedSkills.length === 1 ? '' : 's'} to your profile.`,
        });
      }

      // Reset state and close dialog
      setSelectedSkills([]);
      setOpen(false);
    }
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