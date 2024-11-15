import { useState } from "react";
import { DetailedSkill, EmployeeSkill } from "./types";
import { SkillSearchSection } from "./search/SkillSearchSection";
import { SkillsContainer } from "./sections/SkillsContainer";
import { useToast } from "@/components/ui/use-toast";
import { useSelectedSkills } from "./context/SelectedSkillsContext";
import { filterSkillsByCategory } from "../benchmark/skills-matrix/skillCategories";
import { useSkillsMatrixStore } from "../benchmark/skills-matrix/SkillsMatrixState";
import { useParams } from "react-router-dom";
import { getEmployeeSkills } from "../benchmark/skills-matrix/initialSkills";

const getLevelPriority = (level: string = 'unspecified') => {
  const priorities: { [key: string]: number } = {
    'advanced': 0,
    'intermediate': 1,
    'beginner': 2,
    'unspecified': 3
  };
  return priorities[level.toLowerCase()] ?? 3;
};

export const SkillsSummary = () => {
  const [expandedSections, setExpandedSections] = useState<{
    specialized: boolean;
    common: boolean;
    certifications: boolean;
  }>({
    specialized: false,
    common: false,
    certifications: false,
  });

  const { id } = useParams<{ id: string }>();
  const { selectedSkills, setSelectedSkills } = useSelectedSkills();
  const { toast } = useToast();
  const { currentStates } = useSkillsMatrixStore();

  // Get employee skills and transform them
  const employeeSkills = getEmployeeSkills(id || "");

  const transformAndSortSkills = (skills: EmployeeSkill[]): DetailedSkill[] => {
    return skills
      .map(skill => ({
        name: skill.title,
        level: currentStates[skill.title]?.level || skill.level,
        isSkillGoal: currentStates[skill.title]?.requirement === 'required' || 
                     currentStates[skill.title]?.requirement === 'skill_goal' ||
                     skill.level === 'advanced'
      }))
      .sort((a, b) => {
        const levelA = (a.level || 'unspecified').toLowerCase();
        const levelB = (b.level || 'unspecified').toLowerCase();
        return getLevelPriority(levelA) - getLevelPriority(levelB);
      });
  };

  const handleSkillsChange = (skills: string[]) => {
    setSelectedSkills(skills);
    
    const allExistingSkills = [
      ...specializedSkills.map(s => s.name),
      ...commonSkills.map(s => s.name),
      ...certifications.map(s => s.name)
    ];

    const newSkills = skills.filter(skill => !allExistingSkills.includes(skill));
    
    if (newSkills.length > 0) {
      toast({
        title: "Skills Added",
        description: `Added ${newSkills.length} new skill${newSkills.length > 1 ? 's' : ''} to your profile.`,
      });
    }
  };

  const filterSkills = <T extends DetailedSkill>(skills: T[]) => {
    if (selectedSkills.length === 0) return skills;
    return skills.filter(skill => 
      selectedSkills.some(selectedSkill => 
        skill.name.toLowerCase().includes(selectedSkill.toLowerCase())
      )
    );
  };

  const specializedSkills: DetailedSkill[] = transformAndSortSkills(
    filterSkillsByCategory(employeeSkills, "specialized")
  );

  const commonSkills: DetailedSkill[] = transformAndSortSkills(
    filterSkillsByCategory(employeeSkills, "common")
  );

  const certifications: DetailedSkill[] = transformAndSortSkills(
    filterSkillsByCategory(employeeSkills, "certification")
  );

  const handleClearAll = () => {
    setSelectedSkills([]);
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const filteredSpecializedSkills = filterSkills(specializedSkills);
  const filteredCommonSkills = filterSkills(commonSkills);
  const filteredCertifications = filterSkills(certifications);

  return (
    <div className="space-y-4 w-full">
      <SkillSearchSection
        selectedSkills={selectedSkills}
        onSkillsChange={handleSkillsChange}
        onClearAll={handleClearAll}
      />
      
      <SkillsContainer
        specializedSkills={filteredSpecializedSkills}
        commonSkills={filteredCommonSkills}
        certifications={filteredCertifications}
        expandedSections={expandedSections}
        onToggleSection={toggleSection}
      />
    </div>
  );
};