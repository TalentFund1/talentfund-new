import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BenchmarkAnalysis } from "./BenchmarkAnalysis";
import { SkillsTable } from "@/components/SkillsTable";
import { SkillSection } from "@/components/skills/SkillSection";

const requiredSkills = [
  { name: "React", level: "advanced" },
  { name: "JavaScript", level: "advanced" },
  { name: "GraphQL", level: "intermediate" },
  { name: "HTML and CSS3", level: "advanced" },
  { name: "IPA Integrations", level: "intermediate" },
];

const preferredSkills = [
  { name: "UI/UX Design Principles", level: "intermediate" },
  { name: "Communication", level: "intermediate" },
  { name: "Angular", level: "beginner" },
];

const missingSkills = [
  { name: "React", level: "advanced" },
  { name: "JavaScript", level: "advanced" },
  { name: "GraphQL", level: "intermediate" },
  { name: "HTML and CSS3", level: "intermediate" },
  { name: "Angular", level: "beginner" },
  { name: "IPA Integrations", level: "intermediate" },
];

export const RoleBenchmark = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-foreground">Role Benchmark</h3>
        
        <div className="w-full max-w-[800px]">
          <Select defaultValue="senior-frontend">
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="Select Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="senior-frontend">Senior Frontend Engineer: P4</SelectItem>
              <SelectItem value="lead-frontend">Lead Frontend Engineer: P5</SelectItem>
              <SelectItem value="principal">Principal Engineer: P6</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-6">
          <SkillSection title="Required Skills" count={requiredSkills.length}>
            <div className="flex flex-wrap gap-2">
              {requiredSkills.map((skill) => (
                <Badge 
                  key={skill.name} 
                  variant="outline" 
                  className="rounded-lg px-3 py-1.5 border-2 flex items-center gap-2 bg-white"
                >
                  {skill.name} <div className="h-2 w-2 rounded-full bg-primary-accent" />
                </Badge>
              ))}
            </div>
          </SkillSection>

          <SkillSection title="Preferred Skills" count={preferredSkills.length}>
            <div className="flex flex-wrap gap-2">
              {preferredSkills.map((skill) => (
                <Badge 
                  key={skill.name} 
                  variant="outline" 
                  className="rounded-lg px-3 py-1.5 border-2 flex items-center gap-2 bg-white"
                >
                  {skill.name} <div className="h-2 w-2 rounded-full bg-primary-icon" />
                </Badge>
              ))}
            </div>
          </SkillSection>

          <Separator className="my-6" />

          <BenchmarkAnalysis />

          <SkillSection title="Missing Skills / Seniority or Certification" count={missingSkills.length}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex flex-wrap gap-2">
                {missingSkills.map((skill) => (
                  <Badge 
                    key={skill.name} 
                    variant="outline" 
                    className="rounded-lg px-3 py-1.5 border-2 flex items-center gap-2 bg-white"
                  >
                    {skill.name} <div className="h-2 w-2 rounded-full bg-[#008000]" />
                  </Badge>
                ))}
              </div>
              <Button variant="outline" size="sm" className="text-xs">
                See Skill Profile
              </Button>
            </div>
          </SkillSection>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">Skills Matrix</h3>
            <SkillsTable />
          </div>
        </div>
      </div>
    </div>
  );
};