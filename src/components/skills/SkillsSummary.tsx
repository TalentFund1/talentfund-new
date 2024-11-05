import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SkillSection } from "./SkillSection";
import { SkillsHeader } from "./SkillsHeader";

export const SkillsSummary = () => {
  return (
    <div className="space-y-4 w-full">
      <h3 className="text-xl font-semibold text-foreground">Skills Summary</h3>
      <SkillsHeader />
      
      <div className="space-y-6">
        <SkillSection title="Specialized Skills" count={66}>
          <div className="flex flex-wrap gap-2 mb-4">
            {[
              { name: "React", level: "advanced" },
              { name: "JavaScript", level: "advanced" },
              { name: "GraphQL", level: "advanced" },
              { name: "Computer Architecture", level: "intermediate" },
              { name: "Internet of Things", level: "intermediate" },
              { name: "SystemVerilog", level: "intermediate" },
              { name: "Static Timing Analysis", level: "beginner" },
              { name: "Cadence Encounter", level: "beginner" },
              { name: "Synopsys Primetime", level: "beginner" }
            ].map((skill) => (
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
          <div className="flex justify-start">
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-full px-3 py-1.5 border-2 bg-background hover:bg-background/80 flex items-center gap-1"
            >
              See More <span className="bg-primary-accent/10 rounded-md px-1.5 py-0.5 text-foreground">36</span>
            </Button>
          </div>
        </SkillSection>

        <SkillSection title="Common Skills" count={14}>
          <div className="flex flex-wrap gap-3">
            {[
              { name: "UI/UX Design Principles", level: "advanced" },
              { name: "Team Leadership", level: "advanced" },
              { name: "Project Management", level: "intermediate" },
              { name: "Communication", level: "intermediate" },
              { name: "Problem Solving", level: "intermediate" },
              { name: "Technical Writing", level: "beginner" },
              { name: "Time Management", level: "beginner" },
              { name: "Microsoft Excel", level: "beginner" }
            ].map((skill) => (
              <Badge 
                key={skill.name} 
                variant="outline" 
                className="rounded-lg px-4 py-2 border-2 flex items-center gap-2 bg-white"
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