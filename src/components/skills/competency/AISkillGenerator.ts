import { toast } from "@/hooks/use-toast";
import { generateSkillProgression } from "./autoFillUtils";
import { roleSkills } from "../data/roleSkills";

interface GenerateSkillsParams {
  currentRoleId: string;
  track: "Professional" | "Managerial";
  toggledSkills: Set<string>;
  setSkillProgression: (skillName: string, progression: Record<string, { level: string; required: string }>) => void;
  saveChanges: () => void;
}

export const generateSkillsWithAI = async ({
  currentRoleId,
  track,
  toggledSkills,
  setSkillProgression,
  saveChanges,
}: GenerateSkillsParams) => {
  console.log("Starting AI generation for skills...", { currentRoleId, track });

  try {
    // Get current role skills
    const currentRoleSkills = roleSkills[currentRoleId as keyof typeof roleSkills];
    if (!currentRoleSkills) {
      console.error('No skills found for current role:', currentRoleId);
      throw new Error('No skills found for current role');
    }

    console.log('Found role skills:', {
      specialized: currentRoleSkills.specialized?.length || 0,
      common: currentRoleSkills.common?.length || 0,
      certifications: currentRoleSkills.certifications?.length || 0
    });

    const allSkills = [
      ...currentRoleSkills.specialized,
      ...currentRoleSkills.common,
      ...currentRoleSkills.certifications
    ].filter(skill => toggledSkills.has(skill.title));

    if (allSkills.length === 0) {
      throw new Error('Please select at least one skill to generate levels for');
    }

    console.log('Processing skills generation for:', allSkills.map(s => s.title));

    // Generate progression for each skill
    allSkills.forEach(skill => {
      let category = "specialized";
      if (currentRoleSkills.common.some(s => s.title === skill.title)) {
        category = "common";
      } else if (currentRoleSkills.certifications.some(s => s.title === skill.title)) {
        category = "certification";
      }

      console.log('Generating progression for skill:', { 
        title: skill.title, 
        category,
        track,
        roleId: currentRoleId 
      });

      const progression = generateSkillProgression(skill.title, category, track, currentRoleId);
      console.log('Generated progression:', { skill: skill.title, progression });
      
      setSkillProgression(skill.title, progression);
    });

    // Save changes to persist the generated progressions
    saveChanges();

    toast({
      title: "Skills Generated",
      description: "Skill levels have been automatically generated based on industry standards.",
    });

    return true;
  } catch (error) {
    console.error("Error generating skills:", error);
    toast({
      title: "Generation Failed",
      description: error instanceof Error ? error.message : "There was an error generating the skill levels. Please try again.",
      variant: "destructive",
    });
    return false;
  }
};