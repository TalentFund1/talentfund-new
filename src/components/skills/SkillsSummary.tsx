import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SkillSection } from "./SkillSection";

export const SkillsSummary = () => {
  return (
    <div className="space-y-4 w-full">
      <h3 className="text-xl font-semibold text-foreground">Skills Summary</h3>
      
      <div className="space-y-6">
        <SkillSection title="Specialized Skills" count={66}>
          <div className="flex flex-wrap gap-2 mb-4">
            {[
              { name: "React", level: "advanced" },
              { name: "JavaScript", level: "advanced" },
              { name: "Git", level: "advanced" },
              { name: "GraphQL", level: "advanced" },
              { name: "HTML and CSS3", level: "advanced" },
              { name: "Computer Architecture", level: "advanced" },
              { name: "Internet of Things", level: "advanced" },
              { name: "SystemVerilog", level: "advanced" },
              { name: "Static Timing Analysis", level: "intermediate" },
              { name: "Cadence Encounter", level: "intermediate" },
              { name: "Synopsys Primetime", level: "intermediate" },
              { name: "Xilinx ISE", level: "beginner" },
              { name: "UART", level: "beginner" },
              { name: "I2C", level: "beginner" }
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
              { name: "Communication", level: "intermediate" },
              { name: "Microsoft Excel", level: "intermediate" },
              { name: "Project Management", level: "intermediate" },
              { name: "Team Leadership", level: "advanced" },
              { name: "Problem Solving", level: "intermediate" },
              { name: "Agile Methodologies", level: "advanced" },
              { name: "Technical Writing", level: "intermediate" },
              { name: "Time Management", level: "intermediate" },
              { name: "Critical Thinking", level: "advanced" },
              { name: "Basic Python", level: "beginner" },
              { name: "Data Entry", level: "beginner" },
              { name: "Documentation", level: "beginner" }
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