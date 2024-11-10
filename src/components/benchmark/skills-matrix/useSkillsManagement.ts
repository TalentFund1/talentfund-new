import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { useSelectedSkills } from "../../skills/context/SelectedSkillsContext";
import { Skill } from "@/components/skills/types/SkillTypes";

export const useSkillsManagement = (initialSkills: Skill[]) => {
  const [skills, setSkills] = useState(initialSkills);
  const { toast } = useToast();
  const { selectedSkills, setSelectedSkills } = useSelectedSkills();

  const handleSkillsChange = (newSelectedSkills: string[]) => {
    setSelectedSkills(newSelectedSkills);
    
    const newSkills = newSelectedSkills.filter(
      skill => !skills.some(s => s.title === skill)
    );
    
    if (newSkills.length > 0) {
      const skillsToAdd = newSkills.map(skillName => ({
        title: skillName,
        subcategory: "Unspecified",
        level: "unspecified",
        growth: "0%",
        confidence: "n/a"
      }));
      
      setSkills([...skills, ...skillsToAdd]);
      
      toast({
        title: "Skills Added",
        description: `Added ${newSkills.length} new skill${newSkills.length > 1 ? 's' : ''} to the matrix.`,
      });
    }
  };

  const handleSkillAdd = (newSkill: Skill) => {
    if (skills.some(skill => skill.title === newSkill.title)) {
      toast({
        title: "Error",
        description: "This skill already exists in the matrix.",
        variant: "destructive",
      });
      return;
    }

    setSkills([...skills, newSkill]);
    setSelectedSkills([...selectedSkills, newSkill.title]);
  };

  return {
    skills,
    setSkills,
    handleSkillsChange,
    handleSkillAdd
  };
};