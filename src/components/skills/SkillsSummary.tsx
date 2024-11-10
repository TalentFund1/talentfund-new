import { useState, useRef, useEffect } from "react";
import { DetailedSkill, Certification } from "./types";
import { SkillSearchSection } from "./search/SkillSearchSection";
import { SkillsContainer } from "./sections/SkillsContainer";
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

  const specializedSkills = [
    { name: "React", level: "advanced", isSkillGoal: true },
    { name: "JavaScript", level: "advanced", isSkillGoal: true },
    { name: "TypeScript", level: "advanced", isSkillGoal: true },
    { name: "Node.js", level: "advanced", isSkillGoal: false },
    { name: "Computer Architecture", level: "intermediate", isSkillGoal: true },
    { name: "SystemVerilog", level: "intermediate", isSkillGoal: false },
    { name: "Docker", level: "intermediate", isSkillGoal: true },
    { name: "Static Timing Analysis", level: "beginner", isSkillGoal: false },
    { name: "Cadence Encounter", level: "beginner", isSkillGoal: false },
    { name: "Synopsys Primetime", level: "beginner", isSkillGoal: true },
    { name: "GraphQL", level: "unspecified", isSkillGoal: false },
    { name: "Internet of Things", level: "unspecified", isSkillGoal: false },
    { name: "Kubernetes", level: "unspecified", isSkillGoal: false },
    { name: "AWS Lambda", level: "unspecified", isSkillGoal: false },
    { name: "Azure Functions", level: "beginner", isSkillGoal: true }
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
    { name: "UI/UX Design Principles", level: "advanced", isSkillGoal: true },
    { name: "Agile Methodologies", level: "advanced", isSkillGoal: true },
    { name: "Project Management", level: "intermediate", isSkillGoal: false },
    { name: "Problem Solving", level: "intermediate", isSkillGoal: true },
    { name: "Scrum", level: "intermediate", isSkillGoal: false },
    { name: "Time Management", level: "beginner", isSkillGoal: true },
    { name: "Microsoft Excel", level: "beginner", isSkillGoal: false },
    { name: "Team Leadership", level: "unspecified", isSkillGoal: false },
    { name: "Communication", level: "unspecified", isSkillGoal: true },
    { name: "Technical Writing", level: "unspecified", isSkillGoal: false }
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
    { name: "Cybersecurity License" }
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
