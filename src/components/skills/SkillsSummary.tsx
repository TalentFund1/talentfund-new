import { useState, useRef, useEffect } from "react";
import { DetailedSkill, Certification } from "./types";
import { SkillSearchSection } from "./search/SkillSearchSection";
import { SkillsContainer } from "./sections/SkillsContainer";
import { useToast } from "@/components/ui/use-toast";
import { useSelectedSkills } from "./context/SelectedSkillsContext";

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

  const { selectedSkills, setSelectedSkills } = useSelectedSkills();
  const [visibleSpecializedCount, setVisibleSpecializedCount] = useState(7);
  const containerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const specializedSkills = [
    { name: "Quantum Computing", level: "advanced", isSkillGoal: true },
    { name: "Robotics Programming", level: "advanced", isSkillGoal: true },
    { name: "5G Network Architecture", level: "intermediate", isSkillGoal: false },
    { name: "Edge Computing", level: "intermediate", isSkillGoal: true },
    { name: "Blockchain Development", level: "advanced", isSkillGoal: true },
    { name: "DevSecOps", level: "advanced", isSkillGoal: true },
    { name: "System Architecture", level: "advanced", isSkillGoal: true },
    { name: "Data Engineering", level: "intermediate", isSkillGoal: false },
    { name: "IoT Development", level: "intermediate", isSkillGoal: true },
    { name: "Artificial Intelligence", level: "advanced", isSkillGoal: true },
    { name: "Conversational AI", level: "advanced", isSkillGoal: true },
    { name: "Deep Learning", level: "intermediate", isSkillGoal: false },
    { name: "Machine Learning", level: "intermediate", isSkillGoal: true },
    { name: "Docker (Software)", level: "intermediate", isSkillGoal: true },
    { name: "JavaScript", level: "advanced", isSkillGoal: true },
    { name: "Amazon Web Services", level: "advanced", isSkillGoal: true }
  ].sort((a, b) => {
    const levelOrder = {
      advanced: 0,
      intermediate: 1,
      beginner: 2,
      unspecified: 3
    };
    return levelOrder[a.level as keyof typeof levelOrder] - levelOrder[b.level as keyof typeof levelOrder];
  });

  const commonSkills = [
    { name: "Technical Writing", level: "advanced", isSkillGoal: true },
    { name: "Agile Project Management", level: "advanced", isSkillGoal: true },
    { name: "Business Analysis", level: "intermediate", isSkillGoal: true },
    { name: "Risk Management", level: "intermediate", isSkillGoal: false },
    { name: "Problem Solving", level: "advanced", isSkillGoal: true },
    { name: "Cross-cultural Communication", level: "intermediate", isSkillGoal: true },
    { name: "Team Management", level: "advanced", isSkillGoal: true },
    { name: "Strategic Planning", level: "intermediate", isSkillGoal: true }
  ].sort((a, b) => {
    const levelOrder = {
      advanced: 0,
      intermediate: 1,
      beginner: 2,
      unspecified: 3
    };
    return levelOrder[a.level as keyof typeof levelOrder] - levelOrder[b.level as keyof typeof levelOrder];
  });

  const certifications: Certification[] = [
    { name: "CompTIA Security+ Certification" },
    { name: "Project Management Professional (PMP)" },
    { name: "Certified Scrum Master (CSM)" }
  ];

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

  const filterSkills = <T extends { name: string }>(skills: T[]) => {
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
      newSkills.forEach(skillName => {
        specializedSkills.push({
          name: skillName,
          level: "unspecified",
          isSkillGoal: false
        });
      });

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