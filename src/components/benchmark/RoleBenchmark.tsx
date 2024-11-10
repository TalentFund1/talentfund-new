import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { RoleSelect } from "./RoleSelect";
import { SkillSection } from "./SkillSection";
import { requiredSkills, preferredSkills, certifications } from "./data/skillsData";
import { roleProfiles } from "./data/roleProfiles";

const RoleBenchmark = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("ai-engineer-p4");

  const handleRoleChange = (value: string) => {
    setSelectedRole(value);
    const [role, level] = value.split("-");
    const profileId = roleProfiles[role as keyof typeof roleProfiles][level].id;
    navigate(`/skills/${profileId}`);
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
        
        <RoleSelect selectedRole={selectedRole} onRoleChange={handleRoleChange} />
        <SkillSection title="Required Skills" skills={requiredSkills} />
        <SkillSection title="Preferred Skills" skills={preferredSkills} />
        
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
  );
};

export default RoleBenchmark;