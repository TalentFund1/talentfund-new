import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";

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

const certifications = [
  { name: "Cybersecurity License" }
];

export const RoleBenchmark = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-foreground">Role Benchmark</h3>
          <Button 
            variant="outline" 
            className="bg-white"
            onClick={() => navigate('/skills')}
          >
            See Skill Profile
          </Button>
        </div>
        
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
                className="rounded-lg px-3 py-1.5 border-2 flex items-center gap-2 bg-white h-8 w-[120px] justify-center"
              >
                {skill.name} <div className="h-2 w-2 rounded-full bg-primary-accent" />
              </Badge>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white p-6 w-full">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Preferred Skills</span>
              <span className="bg-[#8073ec]/10 text-[#1F2144] rounded-full px-2 py-0.5 text-xs font-medium">
                {preferredSkills.length}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {preferredSkills.map((skill) => (
              <Badge 
                key={skill.name} 
                variant="outline" 
                className="rounded-lg px-3 py-1.5 border-2 flex items-center gap-2 bg-white h-8 w-[120px] justify-center"
              >
                {skill.name} <div className="h-2 w-2 rounded-full bg-primary-icon" />
              </Badge>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white p-6 w-full">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Certifications</span>
              <span className="bg-[#8073ec]/10 text-[#1F2144] rounded-full px-2 py-0.5 text-xs font-medium">
                {certifications.length}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {certifications.map((cert) => (
              <Badge 
                key={cert.name}
                variant="outline" 
                className="rounded-lg px-3 py-1.5 border-2 bg-white h-8 w-[120px] justify-center"
              >
                {cert.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
