import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { roleSkills } from "../skills/data/roleSkills";
import { useState } from "react";

interface Skill {
  name: string;
  level: "advanced" | "intermediate" | "beginner" | "unspecified";
}

const roles = {
  "123": "AI Engineer",
  "124": "Backend Engineer",
  "125": "Frontend Engineer",
  "126": "Engineering Manager"
};

export const RoleBenchmark = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<string>("125");

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

  const selectedRoleSkills = roleSkills[selectedRole as keyof typeof roleSkills];

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
          <Select 
            value={selectedRole}
            onValueChange={(value) => setSelectedRole(value)}
          >
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="Select Role">
                {roles[selectedRole as keyof typeof roles]}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {Object.entries(roles).map(([id, title]) => (
                <SelectItem key={id} value={id}>
                  {title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator className="my-6" />

        {selectedRoleSkills && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-white p-6 w-full">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Specialized Skills</span>
                  <span className="bg-[#8073ec]/10 text-[#1F2144] rounded-full px-2 py-0.5 text-xs font-medium">
                    {selectedRoleSkills.specialized.length}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedRoleSkills.specialized.map((skill) => (
                  <Badge 
                    key={skill.title} 
                    variant="outline" 
                    className={`rounded-md px-4 py-2 border-2 flex items-center gap-2 bg-white hover:bg-background/80 transition-colors ${getLevelStyles(skill.level)}`}
                  >
                    {skill.title} <div className={`h-2 w-2 rounded-full ${getLevelDot(skill.level)}`} />
                  </Badge>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-white p-6 w-full">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Common Skills</span>
                  <span className="bg-[#8073ec]/10 text-[#1F2144] rounded-full px-2 py-0.5 text-xs font-medium">
                    {selectedRoleSkills.common.length}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedRoleSkills.common.map((skill) => (
                  <Badge 
                    key={skill.title} 
                    variant="outline" 
                    className={`rounded-md px-4 py-2 border-2 flex items-center gap-2 bg-white hover:bg-background/80 transition-colors ${getLevelStyles(skill.level)}`}
                  >
                    {skill.title} <div className={`h-2 w-2 rounded-full ${getLevelDot(skill.level)}`} />
                  </Badge>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-white p-6 w-full">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Certifications</span>
                  <span className="bg-[#8073ec]/10 text-[#1F2144] rounded-full px-2 py-0.5 text-xs font-medium">
                    {selectedRoleSkills.certifications.length}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedRoleSkills.certifications.map((cert) => (
                  <Badge 
                    key={cert.title}
                    variant="outline" 
                    className="rounded-md px-4 py-2 border border-border bg-white"
                  >
                    {cert.title}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};