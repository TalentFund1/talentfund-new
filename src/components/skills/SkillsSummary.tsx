import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SkillSection } from "./SkillSection";
import { SkillsHeader } from "./SkillsHeader";

export const SkillsSummary = () => {
  return (
    <div className="space-y-4 w-full max-w-[800px] mx-auto">
      <h3 className="text-xl font-semibold text-foreground">Skills Summary</h3>
      <SkillsHeader />
      
      <div className="space-y-6">
        <SkillSection title="Specialized Skills" count={66}>
          <div className="flex flex-wrap gap-2">
            {["React", "JavaScript", "Git", "GraphQL", "HTML and CSS3"].map((skill) => (
              <Badge 
                key={skill} 
                variant="outline" 
                className="rounded-lg px-3 py-1.5 border-2 flex items-center gap-2 bg-white"
              >
                {skill} <div className="h-5 w-5 rounded-full bg-primary-accent" />
              </Badge>
            ))}
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-lg px-3 py-1.5 border-2 bg-background hover:bg-background/80 flex items-center gap-1"
            >
              See More <span className="bg-primary-accent/10 rounded-md px-1.5 py-0.5 text-foreground">12</span>
            </Button>
          </div>
        </SkillSection>

        <SkillSection title="Common Skills" count={14}>
          <div className="flex flex-wrap gap-3">
            {[
              { name: "UI/UX Design Principles", color: "bg-primary-accent" },
              { name: "Communication", color: "bg-primary-icon" },
              { name: "Microsoft Excel", color: "bg-primary-icon" }
            ].map((skill) => (
              <Badge 
                key={skill.name} 
                variant="outline" 
                className="rounded-lg px-4 py-2 border-2 flex items-center gap-2 bg-white"
              >
                {skill.name} <div className={`h-5 w-5 rounded-full ${skill.color}`} />
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