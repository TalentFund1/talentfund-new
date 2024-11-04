import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const requiredSkills = [
  { name: "React", level: "advanced" },
  { name: "JavaScript", level: "advanced" },
  { name: "GraphQL", level: "intermediate" },
  { name: "HTML and CSS3", level: "advanced" },
  { name: "IPA Integrations", level: "intermediate" },
];

const softSkills = [
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

        <Separator className="my-6" />

        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-white p-6 w-full">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Required Skills</span>
                <span className="bg-[#8073ec]/10 text-[#1F2144] rounded-full px-2 py-0.5 text-xs font-medium">
                  {requiredSkills.length}
                </span>
              </div>
            </div>
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
          </div>

          <div className="rounded-2xl border border-border bg-white p-6 w-full">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Soft Skills</span>
                <span className="bg-[#8073ec]/10 text-[#1F2144] rounded-full px-2 py-0.5 text-xs font-medium">
                  {softSkills.length}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {softSkills.map((skill) => (
                <Badge 
                  key={skill.name} 
                  variant="outline" 
                  className="rounded-lg px-3 py-1.5 border-2 flex items-center gap-2 bg-white"
                >
                  {skill.name} <div className="h-2 w-2 rounded-full bg-primary-icon" />
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Benchmark Analysis</h4>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                89%
              </span>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Experience Match</span>
                  <span className="font-medium">8 out of 12</span>
                </div>
                <Progress value={66} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Skill Match</span>
                  <span className="font-medium">2 out of 6</span>
                </div>
                <Progress value={33} className="h-2" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Missing Skills / Seniority or Certification</h4>
              <Button variant="outline" size="sm" className="text-xs">
                See Skill Profile
              </Button>
            </div>
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
          </div>
        </div>
      </div>
    </div>
  );
};