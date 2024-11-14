import { useState, useRef, useEffect } from "react";
import { DetailedSkill, Certification, EmployeeSkill } from "./types";
import { SkillSearchSection } from "./search/SkillSearchSection";
import { SkillsContainer } from "./sections/SkillsContainer";
import { useToast } from "@/components/ui/use-toast";
import { useSelectedSkills } from "./context/SelectedSkillsContext";
import { initialSkills, getEmployeeSkills } from "../benchmark/skills-matrix/initialSkills";
import { categorizeSkill } from "../benchmark/skills-matrix/skillCategories";
import { useSkillsMatrix } from "../benchmark/skills-matrix/SkillsMatrixContext";
import { useParams } from "react-router-dom";

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
  const [visibleSpecializedCount, setVisibleSpecializedCount] = useState(7);
  const containerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { currentStates } = useSkillsMatrix();

  // Get skills for the current employee only
  const employeeSkills = getEmployeeSkills(id || "") as EmployeeSkill[];

  // Transform employee skills into the required format and sort by level
  const transformedSkills: DetailedSkill[] = employeeSkills
    .map(skill => ({
      name: skill.title,
      level: currentStates[skill.title]?.level || skill.level,
      isSkillGoal: currentStates[skill.title]?.requirement === 'required' || 
                   currentStates[skill.title]?.requirement === 'skill_goal' ||
                   skill.level === 'advanced'
    }))
    .sort((a, b) => {
      const levelOrder = {
        advanced: 0,
        intermediate: 1,
        beginner: 2,
        unspecified: 3
      };
      const levelA = (a.level || 'unspecified').toLowerCase();
      const levelB = (b.level || 'unspecified').toLowerCase();
      return levelOrder[levelA as keyof typeof levelOrder] - levelOrder[levelB as keyof typeof levelOrder];
    });

  const specializedSkills: DetailedSkill[] = transformedSkills.filter(
    skill => categorizeSkill(skill.name) === 'specialized'
  );

  const commonSkills: DetailedSkill[] = transformedSkills.filter(
    skill => categorizeSkill(skill.name) === 'common'
  );

  const certifications: DetailedSkill[] = employeeSkills
    .filter(skill => categorizeSkill(skill.title) === 'certification')
    .map(skill => ({ 
      name: skill.title,
      level: currentStates[skill.title]?.level || skill.level,
      isSkillGoal: currentStates[skill.title]?.requirement === 'required' || 
                   currentStates[skill.title]?.requirement === 'skill_goal' ||
                   skill.requirement === 'required' ||
                   skill.requirement === 'skill_goal'
    }))
    .sort((a, b) => {
      const levelOrder = {
        advanced: 0,
        intermediate: 1,
        beginner: 2,
        unspecified: 3
      };
      const levelA = (a.level || 'unspecified').toLowerCase();
      const levelB = (b.level || 'unspecified').toLowerCase();
      return levelOrder[levelA as keyof typeof levelOrder] - levelOrder[levelB as keyof typeof levelOrder];
    });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      const containerWidth = container.offsetWidth;
      const skillWidth = 150;
      const skillsPerRow = Math.floor(containerWidth / skillWidth);
      const optimalRows = 2;
      setVisibleSpecializedCount(skillsPerRow * optimalRows);
    }
  }, []);

  const filterSkills = <T extends DetailedSkill>(skills: T[]) => {
    if (selectedSkills.length === 0) return skills;
    return skills.filter(skill => 
      selectedSkills.some(selectedSkill => 
        skill.name.toLowerCase().includes(selectedSkill.toLowerCase())
      )
    );
  };

  const handleSkillsChange = (skills: string[]) => {
    setSelectedSkills(skills);
    
    const allExistingSkills = [
      ...transformedSkills.map(s => s.name)
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
  };

  const filteredSpecializedSkills = filterSkills(specializedSkills);
  const filteredCommonSkills = filterSkills(commonSkills);
  const filteredCertifications = filterSkills(certifications);

  return (
    <div className="space-y-4 w-full" ref={containerRef}>
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
        visibleSpecializedCount={visibleSpecializedCount}
        onToggleSection={toggleSection}
      />
    </div>
  );
};
