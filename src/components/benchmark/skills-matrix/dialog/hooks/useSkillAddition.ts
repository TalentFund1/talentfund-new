import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useParams } from 'react-router-dom';
import { useToggledSkills } from "@/components/skills/context/ToggledSkillsContext";
import { useCompetencyStore } from "@/components/skills/competency/CompetencyState";
import { useTrack } from "@/components/skills/context/TrackContext";
import { useEmployeeSkillsStore } from "@/components/employee/store/employeeSkillsStore";
import { getUnifiedSkillData } from '@/components/skills/data/skillDatabaseService';
import { roleSkills, saveRoleSkills } from '@/components/skills/data/roleSkills';
import { normalizeSkillTitle } from '@/components/skills/utils/normalization';
import { generateSkillProgression } from '@/components/skills/competency/autoFillUtils';

export const useSkillAddition = (onSuccess: () => void) => {
  const { toast } = useToast();
  const { id } = useParams();
  const { toggledSkills, setToggledSkills } = useToggledSkills();
  const { setSkillState, setSkillProgression } = useCompetencyStore();
  const { getTrackForRole } = useTrack();
  const { addSkill, initializeEmployeeSkills } = useEmployeeSkillsStore();

  const handleAddSkills = async (selectedSkills: string[]) => {
    if (!id) {
      toast({
        title: "Error",
        description: "Could not find the current role profile.",
        variant: "destructive",
      });
      return;
    }

    try {
      console.log('Adding skills:', selectedSkills);

      // Process each selected skill
      for (const skillTitle of selectedSkills) {
        console.log('Processing skill:', skillTitle);
        
        // Add skill to employee skills store
        await addSkill(id, skillTitle);
        
        // Get unified skill data
        const skillData = getUnifiedSkillData(skillTitle);
        if (skillData) {
          console.log('Skill data found:', skillData);
          
          // Generate and set progression
          const track = getTrackForRole(id);
          const progression = generateSkillProgression(skillTitle, skillData.category, track, id);
          if (progression) {
            console.log('Setting progression for skill:', {
              skill: skillTitle,
              progression
            });
            setSkillProgression(skillTitle, progression, id);
          }
        }
      }

      // Force re-initialization of employee skills
      await initializeEmployeeSkills(id);

      console.log('Skills added successfully');
      
      toast({
        title: "Skills Added",
        description: `Added ${selectedSkills.length} skill${selectedSkills.length === 1 ? '' : 's'} to the profile.`,
      });

      onSuccess();
    } catch (error) {
      console.error('Error adding skills:', error);
      toast({
        title: "Error",
        description: "Failed to add skills. Please try again.",
        variant: "destructive"
      });
    }
  };

  return { handleAddSkills };
};