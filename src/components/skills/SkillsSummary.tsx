import { useState, useRef, useEffect } from "react";
import { DetailedSkill, Certification, EmployeeSkill } from "./types";
import { SkillSearchSection } from "./search/SkillSearchSection";
import { SkillsContainer } from "./sections/SkillsContainer";
import { useToast } from "@/components/ui/use-toast";
import { useSelectedSkills } from "./context/SelectedSkillsContext";
import { initialSkills, getEmployeeSkills } from "../benchmark/skills-matrix/initialSkills";
import { useSkillsMatrixStore } from "../benchmark/skills-matrix/SkillsMatrixState";
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
  const { currentStates } = useSkillsMatrixStore();

  // Get skills for the current employee
  const employeeSkills = getEmployeeSkills(id || "");

  // Transform and categorize employee skills
  const categorizeSkills = () => {
    const currentRoleSkills = initialSkills[id as keyof typeof initialSkills] || [];
    
    const specializedSkills: DetailedSkill[] = currentRoleSkills
      .filter(skill => skill.subcategory.includes("Frontend") || 
                      skill.subcategory.includes("Programming") || 
                      skill.subcategory.includes("State Management") ||
                      skill.subcategory.includes("Build Tools"))
      .map(skill => ({
        name: skill.title,
        level: currentStates[skill.title]?.level || skill.level,
        isSkillGoal: currentStates[skill.title]?.requirement === 'required' || skill.requirement === 'required'
      }));

    const commonSkills: DetailedSkill[] = currentRoleSkills
      .filter(skill => skill.subcategory.includes("Development") || 
                      skill.subcategory.includes("Soft Skills") ||
                      skill.subcategory.includes("Communication"))
      .map(skill => ({
        name: skill.title,
        level: currentStates[skill.title]?.level || skill.level,
        isSkillGoal: currentStates[skill.title]?.requirement === 'required' || skill.requirement === 'required'
      }));

    const certifications: DetailedSkill[] = currentRoleSkills
      .filter(skill => skill.subcategory.includes("Certification"))
      .map(skill => ({
        name: skill.title,
        level: currentStates[skill.title]?.level || skill.level,
        isSkillGoal: currentStates[skill.title]?.requirement === 'required' || skill.requirement === 'required'
      }));

    return {
      specializedSkills,
      commonSkills,
      certifications
    };
  };

  const { specializedSkills, commonSkills, certifications } = categorizeSkills();

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