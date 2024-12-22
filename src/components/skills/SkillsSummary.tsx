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
import { getSkillCategory } from "./data/skills/categories/skillCategories";

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

  const transformAndSortSkills = (skills: UnifiedSkill[]): DetailedSkill[] => {
    return skills
      .map(skill => ({
        name: skill.title,
        level: currentStates[skill.title]?.level || skill.level,
        isSkillGoal: (currentStates[skill.title]?.requirement as SkillRequirement === 'required' || 
                     currentStates[skill.title]?.requirement as SkillRequirement === 'skill_goal' ||
                     skill.level === 'advanced')
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

  // Categorize skills based on their type from the universal database
  const categorizeSkills = (skills: UnifiedSkill[]) => {
    const specialized: UnifiedSkill[] = [];
    const common: UnifiedSkill[] = [];
    const certifications: UnifiedSkill[] = [];

    skills.forEach(skill => {
      const category = getSkillCategory(skill.title);
      switch (category) {
        case 'specialized':
          specialized.push(skill);
          break;
        case 'common':
          common.push(skill);
          break;
        case 'certification':
          certifications.push(skill);
          break;
      }
    });

    console.log('Categorized skills:', {
      total: skills.length,
      specialized: specialized.length,
      common: common.length,
      certifications: certifications.length
    });

    return { specialized, common, certifications };
  };

  const { specialized, common, certifications } = categorizeSkills(employeeSkills);

  const specializedSkills: DetailedSkill[] = transformAndSortSkills(specialized);
  const commonSkills: DetailedSkill[] = transformAndSortSkills(common);
  const certificationSkills: DetailedSkill[] = transformAndSortSkills(certifications);

  const filteredSpecializedSkills = filterSkills(specializedSkills);
  const filteredCommonSkills = filterSkills(commonSkills);
  const filteredCertifications = filterSkills(certificationSkills);

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
        onToggleSection={(section) => {
          setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section as keyof typeof prev]
          }));
        }}
      />
    </div>
  );
};