import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SkillSection } from "./SkillSection";
import { SkillsHeader } from "./SkillsHeader";
import { useState, useRef, useEffect } from "react";
import { Heart } from "lucide-react";

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
        className="rounded-md px-4 py-2 border border-border flex items-center gap-2 bg-white hover:bg-background/80 transition-colors"
      >
        {skill.name}
        <div className="flex items-center gap-1.5">
          <div className={`h-2 w-2 rounded-full ${
            skill.level === "advanced" ? "bg-primary-accent" :
            skill.level === "intermediate" ? "bg-primary-icon" :
            skill.level === "beginner" ? "bg-[#008000]" :
            "bg-gray-300"
          }`} />
          {skill.isSkillGoal && (
            <Heart className="w-3 h-3 text-[#1f2144] fill-current" />
          )}
        </div>
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
                <span className="bg-primary-accent/10 rounded-md px-1.5 py-0.5 text-foreground">
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
                <span className="bg-primary-accent/10 rounded-md px-1.5 py-0.5 text-foreground">
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
              className="rounded-md px-4 py-2 border border-border bg-white hover:bg-background/80 transition-colors"
            >
              Cybersecurity License
            </Badge>
          </div>
        </SkillSection>
      </div>
    </div>
  );
};