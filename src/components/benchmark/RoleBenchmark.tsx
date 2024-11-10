import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

interface Skill {
  name: string;
  level: "advanced" | "intermediate" | "beginner" | "unspecified";
}

const technicalLevels = ["P1", "P2", "P3", "P4", "P5", "P6"];
const managerialLevels = ["M3", "M4", "M5", "M6"];

const requiredSkills: Skill[] = [
  { name: "React", level: "advanced" },
  { name: "JavaScript", level: "advanced" },
  { name: "GraphQL", level: "intermediate" },
  { name: "HTML and CSS3", level: "advanced" },
  { name: "IPA Integrations", level: "intermediate" }
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
  { name: "UI/UX Design Principles", level: "intermediate" },
  { name: "Communication", level: "intermediate" },
  { name: "Angular", level: "beginner" }
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

const RoleBenchmark = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [roleType, setRoleType] = useState<"technical" | "managerial">("technical");
  const [selectedRole, setSelectedRole] = useState("senior-frontend");

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

  const handleRoleTypeChange = (value: "technical" | "managerial") => {
    setRoleType(value);
    // Reset selected role when changing type
    setSelectedRole(value === "technical" ? "senior-frontend" : "engineering-manager");
    
    toast({
      title: "Role Type Updated",
      description: `Switched to ${value === "technical" ? "Technical" : "Managerial"} track`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-foreground">Role Benchmark</h3>
          <Button 
            variant="outline" 
            className="bg-[#F7F9FF] text-[#1F2144] hover:bg-[#F7F9FF]/90 border border-[#CCDBFF]"
            onClick={() => navigate('/skills')}
          >
            See Skill Profile
          </Button>
        </div>
        
        <div className="flex items-center gap-4 w-full max-w-[800px]">
          <Select value={roleType} onValueChange={handleRoleTypeChange}>
            <SelectTrigger className="w-[200px] bg-white">
              <SelectValue placeholder="Select Role Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="technical">Technical Track</SelectItem>
              <SelectItem value="managerial">Managerial Track</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedRole} onValueChange={setSelectedRole}>
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="Select Role" />
            </SelectTrigger>
            <SelectContent>
              {roleType === "technical" ? (
                <>
                  <SelectItem value="senior-frontend">Senior Frontend Engineer: P4</SelectItem>
                  <SelectItem value="lead-frontend">Lead Frontend Engineer: P5</SelectItem>
                  <SelectItem value="principal">Principal Engineer: P6</SelectItem>
                </>
              ) : (
                <>
                  <SelectItem value="engineering-manager">Engineering Manager: M3</SelectItem>
                  <SelectItem value="senior-manager">Senior Engineering Manager: M4</SelectItem>
                  <SelectItem value="director">Engineering Director: M5</SelectItem>
                  <SelectItem value="vp">VP of Engineering: M6</SelectItem>
                </>
              )}
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

export default RoleBenchmark;