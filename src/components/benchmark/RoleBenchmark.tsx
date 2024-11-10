import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";

interface Skill {
  name: string;
  level: "advanced" | "intermediate" | "beginner" | "unspecified";
}

const requiredSkills: Skill[] = [
  { name: "React", level: "advanced" as const },
  { name: "JavaScript", level: "advanced" as const },
  { name: "GraphQL", level: "intermediate" as const },
  { name: "HTML and CSS3", level: "advanced" as const },
  { name: "IPA Integrations", level: "intermediate" as const }
].sort((a, b) => {
  const levelOrder = {
    advanced: 0,
    intermediate: 1,
    beginner: 2,
    unspecified: 3
  };
  return levelOrder[a.level] - levelOrder[b.level];
});

const preferredSkills: Skill[] = [
  { name: "UI/UX Design Principles", level: "intermediate" as const },
  { name: "Communication", level: "intermediate" as const },
  { name: "Angular", level: "beginner" as const }
].sort((a, b) => {
  const levelOrder = {
    advanced: 0,
    intermediate: 1,
    beginner: 2,
    unspecified: 3
  };
  return levelOrder[a.level] - levelOrder[b.level];
});

const certifications = [
  { name: "Cybersecurity License" }
];

export const RoleBenchmark = () => {
  const navigate = useNavigate();

  const getLevelStyles = (level: string) => {
    return "border-[#CCDBFF]";
  };

  const getLevelDot = (level: string) => {
    switch (level) {
      case "advanced":
        return "bg-primary-accent";
      case "intermediate":
        return "bg-primary-icon";
      case "beginner":
        return "bg-[#008000]";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-foreground">Role Benchmark</h3>
          <Button 
            variant="outline" 
            className="bg-primary-accent text-white hover:bg-primary-accent/90"
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
                  className={`rounded-md px-4 py-2 border-2 flex items-center gap-2 bg-white hover:bg-background/80 transition-colors ${getLevelStyles(skill.level)}`}
                >
                  {skill.name} <div className={`h-2 w-2 rounded-full ${getLevelDot(skill.level)}`} />
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
                  className={`rounded-md px-4 py-2 border-2 flex items-center gap-2 bg-white hover:bg-background/80 transition-colors ${getLevelStyles(skill.level)}`}
                >
                  {skill.name} <div className={`h-2 w-2 rounded-full ${getLevelDot(skill.level)}`} />
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
            <div className="flex flex-wrap gap-2">
              {certifications.map((cert) => (
                <Badge 
                  key={cert.name}
                  variant="outline" 
                  className="rounded-md px-4 py-2 border border-border bg-white"
                >
                  {cert.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};