import { useState } from "react";
import { DetailedSkill } from "./types/SkillTypes";
import { SkillSearchSection } from "./search/SkillSearchSection";
import { SkillsContainer } from "./sections/SkillsContainer";
import { useToast } from "@/components/ui/use-toast";
import { useSelectedSkills } from "./context/SelectedSkillsContext";
import { useParams } from "react-router-dom";
import { getEmployeeSkills } from "../benchmark/skills-matrix/initialSkills";
import { useSkillsMatrixSearch } from "./context/SkillsMatrixSearchContext";
import { getUnifiedSkillData } from "./data/skillDatabaseService";
import { useEmployeeSkillsStore } from "../employee/store/employeeSkillsStore";

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
  const [searchSkills, setSearchSkills] = useState<string[]>([]);
  const { setMatrixSearchSkills } = useSkillsMatrixSearch();
  const { getSkillState, getEmployeeSkills: getStoredEmployeeSkills } = useEmployeeSkillsStore();

  console.log('Loading skills for employee:', id);
  const employeeSkills = getStoredEmployeeSkills(id || "");
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

  const transformAndSortSkills = (skills: any[]): DetailedSkill[] => {
    return skills
      .map(skill => {
        const skillState = getSkillState(id || "", skill.title);
        return {
          name: skill.title,
          level: skillState.level || 'unspecified',
          isSkillGoal: skillState.goalStatus === 'skill_goal'
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

  const categorizeSkills = (skills: any[]) => {
    return skills.reduce((acc: any, skill) => {
      const unifiedData = getUnifiedSkillData(skill.title);
      const category = unifiedData.category || 'specialized';
      
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(skill);
      return acc;
    }, {
      specialized: [],
      common: [],
      certification: []
    });
  };

  const categorizedSkills = categorizeSkills(employeeSkills);
  
  const specializedSkills = transformAndSortSkills(categorizedSkills.specialized);
  const commonSkills = transformAndSortSkills(categorizedSkills.common);
  const certifications = transformAndSortSkills(categorizedSkills.certification);

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