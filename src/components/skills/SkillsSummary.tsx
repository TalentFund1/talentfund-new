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
import { useSkillsMatrixSearch } from "./context/SkillsMatrixSearchContext";
import { roleSkills } from "./data/roleSkills";

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
  const [searchSkills, setSearchSkills] = useState<string[]>([]);
  const { setMatrixSearchSkills } = useSkillsMatrixSearch();

  console.log('SkillsSummary - Current states:', currentStates);

  const employeeSkills = getEmployeeSkills(id || "");
  const currentRoleSkills = roleSkills[id as keyof typeof roleSkills] || roleSkills["123"];

  console.log('SkillsSummary - Employee skills:', {
    employeeId: id,
    skills: employeeSkills,
    roleSkills: currentRoleSkills
  });

  const handleSkillsChange = (skills: string[]) => {
    setSelectedSkills(skills);
    setSearchSkills(skills);
    setMatrixSearchSkills(skills);
    
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

  const handleClearAll = () => {
    setSelectedSkills([]);
    setSearchSkills([]);
    setMatrixSearchSkills([]);
  };

  const transformAndSortSkills = (skills: EmployeeSkill[]): DetailedSkill[] => {
    return skills
      .map(skill => ({
        name: skill.title,
        level: currentStates[skill.title]?.level || skill.level || 'unspecified',
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

  const filterSkills = <T extends DetailedSkill>(skills: T[]) => {
    if (searchSkills.length === 0) return skills;
    return skills.filter(skill => 
      searchSkills.some(selectedSkill => 
        skill.name.toLowerCase().includes(selectedSkill.toLowerCase())
      )
    );
  };

  // Get specialized skills from current role
  const specializedSkills: DetailedSkill[] = transformAndSortSkills(
    currentRoleSkills.specialized.filter(skill => 
      employeeSkills.some(empSkill => empSkill.title === skill.title)
    )
  );

  // Get common skills from current role
  const commonSkills: DetailedSkill[] = transformAndSortSkills(
    currentRoleSkills.common.filter(skill => 
      employeeSkills.some(empSkill => empSkill.title === skill.title)
    )
  );

  // Get certifications from current role
  const certifications: DetailedSkill[] = transformAndSortSkills(
    currentRoleSkills.certifications.filter(skill => 
      employeeSkills.some(empSkill => empSkill.title === skill.title)
    )
  );

  console.log('SkillsSummary - Processed skills:', {
    specialized: specializedSkills.length,
    common: commonSkills.length,
    certifications: certifications.length
  });

  const filteredSpecializedSkills = filterSkills(specializedSkills);
  const filteredCommonSkills = filterSkills(commonSkills);
  const filteredCertifications = filterSkills(certifications);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="space-y-4 w-full">
      <SkillSearchSection
        selectedSkills={searchSkills}
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