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
  console.log("Starting AI generation for skills...", { 
    currentRoleId, 
    track, 
    toggledSkillsCount: toggledSkills.size 
  });

  try {
    if (!currentRoleId) {
      throw new Error('No role ID provided');
    }

    // Get current role skills
    const currentRoleSkills = roleSkills[currentRoleId as keyof typeof roleSkills];
    if (!currentRoleSkills) {
      console.error('No skills found for current role:', currentRoleId);
      throw new Error('No skills found for current role');
    }

    const allSkills = [
      ...currentRoleSkills.specialized.map(skill => ({ ...skill, category: 'specialized' })),
      ...currentRoleSkills.common.map(skill => ({ ...skill, category: 'common' })),
      ...currentRoleSkills.certifications.map(skill => ({ ...skill, category: 'certification' }))
    ].filter(skill => toggledSkills.has(skill.title));

    if (allSkills.length === 0) {
      throw new Error('Please select at least one skill category to generate levels');
    }

    console.log('Processing skills generation for:', allSkills.map(s => s.title));

    // Generate progression for each skill
    for (const skill of allSkills) {
      console.log('Generating progression for skill:', { 
        title: skill.title, 
        category: skill.category,
        track,
        roleId: currentRoleId 
      });

      const progression = generateSkillProgression(
        skill.title, 
        skill.category, 
        track, 
        currentRoleId
      );
      
      if (!progression || Object.keys(progression).length === 0) {
        console.error('Failed to generate progression for skill:', skill.title);
        continue;
      }

      setSkillProgression(skill.title, progression);
    }

    // Save changes to persist the generated progressions
    saveChanges();

    toast({
      title: "Skills Generated Successfully",
      description: `Generated skill levels for ${allSkills.length} skills based on industry standards.`,
    });

    return true;
  } catch (error) {
    console.error("Error generating skills:", error);
    toast({
      title: "Generation Failed",
      description: error instanceof Error ? error.message : "Failed to generate skill levels. Please try again.",
      variant: "destructive",
    });
    return false;
  }
};