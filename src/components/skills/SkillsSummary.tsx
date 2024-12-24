import { useState } from "react";
import { DetailedSkill, UnifiedSkill } from "./types/SkillTypes";
import { SkillSearchSection } from "./search/SkillSearchSection";
import { SkillsContainer } from "./sections/SkillsContainer";
import { useToast } from "@/components/ui/use-toast";
import { useSelectedSkills } from "./context/SelectedSkillsContext";
import { filterSkillsByCategory } from "../benchmark/skills-matrix/skillCategories";
import { useSkillsMatrixStore } from "../benchmark/skills-matrix/SkillsMatrixState";
import { useParams } from "react-router-dom";
import { getEmployeeSkills } from "../benchmark/skills-matrix/initialSkills";
import { useSkillsMatrixSearch } from "./context/SkillsMatrixSearchContext";
import { getUnifiedSkillData } from "./data/skillDatabaseService";

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

  console.log('Loading skills for employee in SkillsSummary:', id);
  const employeeSkills = getEmployeeSkills(id || "");
  
  // Enrich employee skills with unified data
  const enrichedSkills = employeeSkills.map(skill => {
    const unifiedData = getUnifiedSkillData(skill.title);
    return {
      ...skill,
      level: currentStates[skill.title]?.level || skill.level,
      category: unifiedData.category,
      weight: unifiedData.weight
    };
  });

  console.log('Enriched employee skills in SkillsSummary:', {
    totalSkills: enrichedSkills.length,
    skills: enrichedSkills.map(s => ({
      title: s.title,
      level: s.level,
      category: s.category
    }))
  });

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
        const skillState = currentStates[skill.title];
        return {
          name: skill.title,
          level: skillState?.level || skill.level,
          isSkillGoal: skillState?.goalStatus === 'required' || 
                       skillState?.goalStatus === 'skill_goal' || 
                       (skillState?.goalStatus !== 'not_interested' && skill.level === 'advanced')
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
    filterSkillsByCategory(enrichedSkills, "specialized") as UnifiedSkill[]
  );

  const commonSkills: DetailedSkill[] = transformAndSortSkills(
    filterSkillsByCategory(enrichedSkills, "common") as UnifiedSkill[]
  );

  const certifications: DetailedSkill[] = transformAndSortSkills(
    filterSkillsByCategory(enrichedSkills, "certification") as UnifiedSkill[]
  );

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  console.log('Skills Summary - Final processed skills:', {
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
      <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
        <h2 className="text-lg font-semibold mb-2">Current Skills Profile</h2>
        <p className="text-sm text-muted-foreground">
          This section shows your current skill levels and proficiencies.
        </p>
      </div>

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