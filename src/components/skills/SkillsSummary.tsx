import { useState } from "react";
import { DetailedSkill, UnifiedSkill, SkillRequirement } from "./types/SkillTypes";
import { SkillSearchSection } from "./search/SkillSearchSection";
import { SkillsContainer } from "./sections/SkillsContainer";
import { useToast } from "@/components/ui/use-toast";
import { useSelectedSkills } from "./context/SelectedSkillsContext";
import { filterSkillsByCategory } from "../benchmark/skills-matrix/skillCategories";
import { useSkillsMatrixStore } from "../benchmark/skills-matrix/SkillsMatrixState";
import { useParams } from "react-router-dom";
import { getEmployeeSkills } from "../benchmark/skills-matrix/initialSkills";
import { useSkillsMatrixSearch } from "./context/SkillsMatrixSearchContext";

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

  console.log('Loading skills for employee:', id);
  const employeeSkills = getEmployeeSkills(id || "");
  console.log('Loaded employee skills:', employeeSkills);

  const handleSkillsChange = (skills: string[]) => {
    setSelectedSkills(skills);
    setSearchSkills(skills);
    setMatrixSearchSkills(skills);
    
    if (skills.length > 0) {
      toast({
        title: "Skills Updated",
        description: `Updated ${skills.length} skill${skills.length > 1 ? 's' : ''} in your search.`,
      });
    }
  };

  const handleClearAll = () => {
    setSelectedSkills([]);
    setSearchSkills([]);
    setMatrixSearchSkills([]);
  };

  const transformAndSortSkills = (skills: UnifiedSkill[]): DetailedSkill[] => {
    return skills
      .map(skill => {
        const goalStatus = currentStates[skill.title]?.goalStatus || skill.goalStatus;
        return {
          name: skill.title,
          level: currentStates[skill.title]?.level || skill.level,
          isSkillGoal: (goalStatus === 'required' || 
                     goalStatus === 'skill_goal' || 
                     (goalStatus !== 'not_interested' && skill.level === 'advanced'))
        };
      })
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

  const specializedSkills: DetailedSkill[] = transformAndSortSkills(
    filterSkillsByCategory(employeeSkills.map(skill => ({
      ...skill,
      goalStatus: skill.goalStatus
    })), "specialized") as UnifiedSkill[]
  );

  const commonSkills: DetailedSkill[] = transformAndSortSkills(
    filterSkillsByCategory(employeeSkills.map(skill => ({
      ...skill,
      goalStatus: skill.goalStatus
    })), "common") as UnifiedSkill[]
  );

  const certifications: DetailedSkill[] = transformAndSortSkills(
    filterSkillsByCategory(employeeSkills.map(skill => ({
      ...skill,
      goalStatus: skill.goalStatus
    })), "certification") as UnifiedSkill[]
  );

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  console.log('Skills Summary - Processed skills:', {
    specialized: specializedSkills.length,
    common: commonSkills.length,
    certifications: certifications.length,
    searchActive: searchSkills.length > 0
  });

  const filteredSpecializedSkills = filterSkills(specializedSkills);
  const filteredCommonSkills = filterSkills(commonSkills);
  const filteredCertifications = filterSkills(certifications);

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