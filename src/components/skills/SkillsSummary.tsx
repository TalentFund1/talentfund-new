import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SkillSection } from "./SkillSection";
import { SkillsHeader } from "./SkillsHeader";
import { useState } from "react";

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
    { name: "Kubernetes", level: "intermediate" },
    { name: "Static Timing Analysis", level: "beginner" },
    { name: "Cadence Encounter", level: "beginner" },
    { name: "Synopsys Primetime", level: "beginner" },
    { name: "AWS Lambda", level: "beginner" },
    { name: "Azure Functions", level: "beginner" },
    { name: "Vue.js", level: "advanced" },
    { name: "Angular", level: "intermediate" },
    { name: "Python", level: "advanced" },
    { name: "Java", level: "intermediate" },
    { name: "C++", level: "intermediate" }
  ];

  const commonSkills = [
    { name: "UI/UX Design Principles", level: "advanced" },
    { name: "Team Leadership", level: "advanced" },
    { name: "Agile Methodologies", level: "advanced" },
    { name: "Project Management", level: "intermediate" },
    { name: "Communication", level: "intermediate" },
    { name: "Problem Solving", level: "intermediate" },
    { name: "Scrum", level: "intermediate" },
    { name: "Technical Writing", level: "beginner" },
    { name: "Time Management", level: "intermediate" },
    { name: "Microsoft Excel", level: "beginner" },
    { name: "Presentation Skills", level: "advanced" },
    { name: "Critical Thinking", level: "advanced" },
    { name: "Conflict Resolution", level: "intermediate" },
    { name: "Strategic Planning", level: "intermediate" },
    { name: "Business Analysis", level: "beginner" }
  ];

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const renderSkills = (skills: typeof specializedSkills, isExpanded: boolean) => {
    const displaySkills = isExpanded ? skills : skills.slice(0, 16);
    return (
      <div className="grid grid-cols-2 gap-2">
        {displaySkills.map((skill) => (
          <Badge 
            key={skill.name} 
            variant="outline" 
            className="rounded-lg px-3 py-1.5 border-2 flex items-center gap-2 bg-white"
          >
            {skill.name} 
            <div className={`h-2 w-2 rounded-full ${
              skill.level === "advanced" ? "bg-primary-accent" :
              skill.level === "intermediate" ? "bg-primary-icon" :
              "bg-[#008000]"
            }`} />
          </Badge>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-4 w-full">
      <h3 className="text-xl font-semibold text-foreground">Skills Summary</h3>
      <SkillsHeader />
      
      <div className="space-y-6">
        <SkillSection title="Specialized Skills" count={specializedSkills.length}>
          <div className="space-y-4">
            {renderSkills(specializedSkills, expandedSections.specialized)}
            {specializedSkills.length > 16 && (
              <div className="flex justify-start">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="rounded-full px-3 py-1.5 border-2 bg-background hover:bg-background/80 flex items-center gap-1"
                  onClick={() => toggleSection('specialized')}
                >
                  {expandedSections.specialized ? 'Show Less' : 'See More'} 
                  <span className="bg-primary-accent/10 rounded-md px-1.5 py-0.5 text-foreground">
                    {specializedSkills.length - 16}
                  </span>
                </Button>
              </div>
            )}
          </div>
        </SkillSection>

        <SkillSection title="Common Skills" count={commonSkills.length}>
          <div className="space-y-4">
            {renderSkills(commonSkills, expandedSections.common)}
            {commonSkills.length > 16 && (
              <div className="flex justify-start mt-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="rounded-full px-3 py-1.5 border-2 bg-background hover:bg-background/80 flex items-center gap-1"
                  onClick={() => toggleSection('common')}
                >
                  {expandedSections.common ? 'Show Less' : 'See More'} 
                  <span className="bg-primary-accent/10 rounded-md px-1.5 py-0.5 text-foreground">
                    {commonSkills.length - 16}
                  </span>
                </Button>
              </div>
            )}
          </div>
        </SkillSection>

        <SkillSection title="Certifications" count={1}>
          <div className="flex flex-wrap gap-3">
            <Badge 
              variant="outline" 
              className="rounded-lg px-4 py-2 border-2 bg-white"
            >
              Cybersecurity License
            </Badge>
          </div>
        </SkillSection>
      </div>
    </div>
  );
};