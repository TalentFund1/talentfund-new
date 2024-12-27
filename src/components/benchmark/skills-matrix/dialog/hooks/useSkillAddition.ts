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
      const existingRoleSkills = roleSkills[id] || {
        title: "",
        specialized: [],
        common: [],
        certifications: [],
        skills: []
      };

      console.log('Current role skills before adding:', {
        roleId: id,
        specialized: existingRoleSkills.specialized.length,
        common: existingRoleSkills.common.length,
        certifications: existingRoleSkills.certifications.length
      });

      const track = getTrackForRole(id);
      const newToggledSkills = new Set(toggledSkills);
      const updatedRoleSkills = { ...existingRoleSkills };

      // Process each selected skill
      for (const skillTitle of selectedSkills) {
        const normalizedTitle = normalizeSkillTitle(skillTitle);
        const skillData = getUnifiedSkillData(skillTitle);
        
        if (skillData) {
          console.log('Processing skill:', skillData);
          
          // Add to toggled skills
          newToggledSkills.add(skillTitle);
          
          // Add skill to employee skills store
          await addSkill(id, skillTitle);
          
          // Determine category and add to appropriate array
          const category = skillData.category?.toLowerCase() || 'common';
          
          if (category === 'specialized' && !updatedRoleSkills.specialized.some(s => normalizeSkillTitle(s.title) === normalizedTitle)) {
            updatedRoleSkills.specialized.push(skillData);
          } else if (category === 'common' && !updatedRoleSkills.common.some(s => normalizeSkillTitle(s.title) === normalizedTitle)) {
            updatedRoleSkills.common.push(skillData);
          } else if (category === 'certification' && !updatedRoleSkills.certifications.some(s => normalizeSkillTitle(s.title) === normalizedTitle)) {
            updatedRoleSkills.certifications.push(skillData);
          }

          // Generate and set progression
          const progression = generateSkillProgression(skillTitle, category, track, id);
          if (progression) {
            console.log('Generated progression for skill:', {
              skill: skillTitle,
              progression
            });
            setSkillProgression(skillTitle, progression, id);
          }
        }
      }

      // Save updated skills
      console.log('Saving updated role skills:', {
        roleId: id,
        specialized: updatedRoleSkills.specialized.length,
        common: updatedRoleSkills.common.length,
        certifications: updatedRoleSkills.certifications.length
      });

      roleSkills[id] = updatedRoleSkills;
      saveRoleSkills(id, updatedRoleSkills);
      
      // Update toggled skills
      setToggledSkills(newToggledSkills);
      
      // Force re-initialization of employee skills
      await initializeEmployeeSkills(id);

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