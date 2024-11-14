import { useState, useRef, useEffect } from "react";
import { DetailedSkill, Certification, EmployeeSkill } from "./types";
import { SkillSearchSection } from "./search/SkillSearchSection";
import { SkillsContainer } from "./sections/SkillsContainer";
import { useToast } from "@/components/ui/use-toast";
import { useSelectedSkills } from "./context/SelectedSkillsContext";
import { initialSkills, getEmployeeSkills } from "../benchmark/skills-matrix/initialSkills";
import { filterSkillsByCategory } from "../benchmark/skills-matrix/skillCategories";
import { useSkillsMatrixStore } from "../benchmark/skills-matrix/SkillsMatrixState";
import { useParams } from "react-router-dom";
import { roleSkills } from './data/roleSkills';

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

  // Get current role skills
  const currentRoleSkills = roleSkills[id as keyof typeof roleSkills] || roleSkills["123"];

  // Transform specialized skills
  const specializedSkills: DetailedSkill[] = (currentRoleSkills.specialized || [])
    .map(skill => ({
      name: skill.title,
      level: currentStates[skill.title]?.level || skill.level,
      isSkillGoal: currentStates[skill.title]?.requirement === 'required' || 
                   currentStates[skill.title]?.requirement === 'skill_goal' ||
                   skill.level === 'advanced'
    }));

  // Transform common skills
  const commonSkills: DetailedSkill[] = (currentRoleSkills.common || [])
    .map(skill => ({
      name: skill.title,
      level: currentStates[skill.title]?.level || skill.level,
      isSkillGoal: currentStates[skill.title]?.requirement === 'required' || 
                   currentStates[skill.title]?.requirement === 'skill_goal' ||
                   skill.level === 'advanced'
    }));

  // Transform certification skills
  const certifications: DetailedSkill[] = (currentRoleSkills.certifications || [])
    .map(skill => ({
      name: skill.title,
      level: currentStates[skill.title]?.level || skill.level,
      isSkillGoal: currentStates[skill.title]?.requirement === 'required' || 
                   currentStates[skill.title]?.requirement === 'skill_goal' ||
                   skill.requirement === 'required' ||
                   skill.requirement === 'skill_goal'
    }));

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
    
    if (skills.length > 0) {
      toast({
        title: "Skills Updated",
        description: `Updated ${skills.length} skill${skills.length > 1 ? 's' : ''} in your profile.`,
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