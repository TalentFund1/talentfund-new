import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { roleSkills } from "../skills/data/roleSkills";

interface Skill {
  name: string;
  level: "advanced" | "intermediate" | "beginner" | "unspecified";
}

// Map role IDs to display names
const roleDisplayNames = {
  "123": "AI Engineer: P4",
  "124": "Backend Engineer: P4",
  "125": "Frontend Engineer: P4",
  "126": "Engineering Manager: M5"
};

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

  // Convert roleSkills specialized and common skills to required format
  const getRequiredSkills = (roleId: string) => {
    const role = roleSkills[roleId as keyof typeof roleSkills];
    if (!role) return [];

    return [...role.specialized, ...role.common]
      .map(skill => ({
        name: skill.title,
        level: skill.level as "advanced" | "intermediate" | "beginner" | "unspecified"
      }))
      .sort((a, b) => {
        const levelOrder = {
          advanced: 0,
          intermediate: 1,
          beginner: 2,
          unspecified: 3
        };
        return levelOrder[a.level] - levelOrder[b.level];
      });
  };

  // Get certifications for the selected role
  const getCertifications = (roleId: string) => {
    const role = roleSkills[roleId as keyof typeof roleSkills];
    if (!role) return [];
    return role.certifications.map(cert => ({ name: cert.title }));
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
        
        <div className="w-full max-w-[800px]">
          <Select defaultValue="125">
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="Select Role" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(roleDisplayNames).map(([id, name]) => (
                <SelectItem key={id} value={id}>{name}</SelectItem>
              ))}
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
                  {getRequiredSkills("125").length}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {getRequiredSkills("125").map((skill) => (
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
                  {getCertifications("125").length}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {getCertifications("125").map((cert) => (
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