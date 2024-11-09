import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SkillSection } from "./SkillSection";
import { SkillsHeader } from "./SkillsHeader";
import { useState, useRef, useEffect } from "react";

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

  const [visibleSpecializedCount, setVisibleSpecializedCount] = useState(7);
  const containerRef = useRef<HTMLDivElement>(null);

  const specializedSkills = [
    { name: "React", level: "advanced" },
    { name: "JavaScript", level: "advanced" },
    { name: "GraphQL", level: "advanced" },
    { name: "TypeScript", level: "advanced" },
    { name: "Node.js", level: "advanced" },
    { name: "Computer Architecture", level: "intermediate" },
    { name: "Internet of Things", level: "intermediate" },
    { name: "SystemVerilog", level: "intermediate" },
    { name: "Docker", level: "intermediate" },
    { name: "Kubernetes", level: "unspecified" },
    { name: "Static Timing Analysis", level: "beginner" },
    { name: "Cadence Encounter", level: "beginner" },
    { name: "Synopsys Primetime", level: "unspecified" },
    { name: "AWS Lambda", level: "beginner" },
    { name: "Azure Functions", level: "unspecified" }
  ];

  const commonSkills = [
    { name: "UI/UX Design Principles", level: "advanced" },
    { name: "Team Leadership", level: "advanced" },
    { name: "Agile Methodologies", level: "advanced" },
    { name: "Project Management", level: "intermediate" },
    { name: "Communication", level: "intermediate" },
    { name: "Problem Solving", level: "intermediate" },
    { name: "Scrum", level: "unspecified" },
    { name: "Technical Writing", level: "beginner" },
    { name: "Time Management", level: "beginner" },
    { name: "Microsoft Excel", level: "unspecified" }
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

  const renderSkills = (skills: typeof specializedSkills, isExpanded: boolean, isSpecialized: boolean = false) => {
    const displaySkills = isSpecialized 
      ? (isExpanded ? skills : skills.slice(0, visibleSpecializedCount))
      : (isExpanded ? skills : skills.slice(0, 7));

    return displaySkills.map((skill) => (
      <Badge 
        key={skill.name} 
        variant="outline" 
        className="rounded-full px-4 py-1.5 border border-border flex items-center gap-2 bg-white hover:bg-background/80 transition-colors"
      >
        {skill.name}
        <div className={`h-2 w-2 rounded-full ${
          skill.level === "advanced" ? "bg-[#8073ec]" :
          skill.level === "intermediate" ? "bg-[#ff8256]" :
          skill.level === "beginner" ? "bg-[#008000]" :
          "bg-gray-400"
        }`} />
      </Badge>
    ));
  };

  return (
    <div className="space-y-4 w-full">
      <h3 className="text-xl font-semibold text-foreground">Skills Summary</h3>
      <SkillsHeader />
      
      <div className="space-y-6">
        <SkillSection title="Specialized Skills" count={specializedSkills.length}>
          <div ref={containerRef} className="flex flex-wrap gap-2 mb-4">
            {renderSkills(specializedSkills, expandedSections.specialized, true)}
          </div>
          {specializedSkills.length > visibleSpecializedCount && (
            <div className="flex justify-start">
              <Button 
                variant="outline" 
                size="sm" 
                className="rounded-full px-3 py-1.5 border-2 bg-background hover:bg-background/80 flex items-center gap-1"
                onClick={() => toggleSection('specialized')}
              >
                {expandedSections.specialized ? 'Show Less' : 'See More'} 
                <span className="bg-primary-accent/10 rounded-full px-2 py-0.5 text-foreground text-xs">
                  {specializedSkills.length - visibleSpecializedCount}
                </span>
              </Button>
            </div>
          )}
        </SkillSection>

        <SkillSection title="Common Skills" count={commonSkills.length}>
          <div className="flex flex-wrap gap-2">
            {renderSkills(commonSkills, expandedSections.common)}
          </div>
          {commonSkills.length > 7 && (
            <div className="flex justify-start mt-4">
              <Button 
                variant="outline" 
                size="sm" 
                className="rounded-full px-3 py-1.5 border-2 bg-background hover:bg-background/80 flex items-center gap-1"
                onClick={() => toggleSection('common')}
              >
                {expandedSections.common ? 'Show Less' : 'See More'} 
                <span className="bg-primary-accent/10 rounded-full px-2 py-0.5 text-foreground text-xs">
                  {commonSkills.length - 7}
                </span>
              </Button>
            </div>
          )}
        </SkillSection>

        <SkillSection title="Certifications" count={1}>
          <div className="flex flex-wrap gap-2">
            <Badge 
              variant="outline" 
              className="rounded-full px-4 py-1.5 border border-border bg-white hover:bg-background/80 transition-colors"
            >
              Cybersecurity License
            </Badge>
          </div>
        </SkillSection>
      </div>
    </div>
  );
};