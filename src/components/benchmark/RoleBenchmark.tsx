import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { roleSkills } from "../skills/data/roleSkills";
import { useState, useEffect } from "react";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";
import { useTrack } from "../skills/context/TrackContext";
import { RoleSelection } from "./RoleSelection";
import { SkillsDisplay } from "./SkillsDisplay";
import { CompetencyGraph } from "../skills/CompetencyGraph";
import { Card } from "@/components/ui/card";

const roles = {
  "123": "AI Engineer",
  "124": "Backend Engineer",
  "125": "Frontend Engineer",
  "126": "Engineering Manager"
};

export const RoleBenchmark = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<string>("125");
  const [selectedLevel, setSelectedLevel] = useState<string>("p4");
  const { toggledSkills } = useToggledSkills();
  const { getTrackForRole, setTrackForRole } = useTrack();

  const currentTrack = getTrackForRole(selectedRole);

  useEffect(() => {
    if (currentTrack === "Professional" && selectedLevel.toLowerCase().startsWith("m")) {
      setSelectedLevel("p4");
    } else if (currentTrack === "Managerial" && selectedLevel.toLowerCase().startsWith("p")) {
      setSelectedLevel("m3");
    }
  }, [currentTrack]);

  const selectedRoleSkills = roleSkills[selectedRole as keyof typeof roleSkills] || roleSkills["123"];

  const handleSeeSkillProfile = () => {
    navigate(`/skills/${selectedRole}`);
  };

  const handleTrackChange = (value: string) => {
    setTrackForRole(selectedRole, value as "Professional" | "Managerial");
  };

  const getCategoryCount = (category: 'specialized' | 'common' | 'certifications') => {
    return selectedRoleSkills[category]?.length || 0;
  };

  const getTotalSkillsCount = () => {
    return (
      getCategoryCount('specialized') +
      getCategoryCount('common') +
      getCategoryCount('certifications')
    );
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-foreground">Role Benchmark</h3>
          <Button 
            variant="outline" 
            className="bg-[#F7F9FF] text-[#1F2144] hover:bg-[#F7F9FF]/90 border border-[#CCDBFF]"
            onClick={handleSeeSkillProfile}
          >
            See Skill Profile
          </Button>
        </div>
        
        <RoleSelection 
          selectedRole={selectedRole}
          selectedLevel={selectedLevel}
          currentTrack={currentTrack}
          onRoleChange={setSelectedRole}
          onLevelChange={setSelectedLevel}
          onTrackChange={handleTrackChange}
          roles={roles}
        />

        <div className="grid grid-cols-4 gap-4">
          <Card className="p-4 bg-[#F7F9FF] border border-[#CCDBFF]">
            <div className="space-y-1">
              <h4 className="text-sm font-medium text-[#6E56CF]">All Categories</h4>
              <p className="text-xs text-muted-foreground">{getTotalSkillsCount()} skills</p>
            </div>
          </Card>
          <Card className="p-4 bg-white border border-[#CCDBFF]">
            <div className="space-y-1">
              <h4 className="text-sm font-medium text-foreground">Specialized Skills</h4>
              <p className="text-xs text-muted-foreground">{getCategoryCount('specialized')} skills</p>
            </div>
          </Card>
          <Card className="p-4 bg-white border border-[#CCDBFF]">
            <div className="space-y-1">
              <h4 className="text-sm font-medium text-foreground">Common Skills</h4>
              <p className="text-xs text-muted-foreground">{getCategoryCount('common')} skills</p>
            </div>
          </Card>
          <Card className="p-4 bg-white border border-[#CCDBFF]">
            <div className="space-y-1">
              <h4 className="text-sm font-medium text-foreground">Certification</h4>
              <p className="text-xs text-muted-foreground">{getCategoryCount('certifications')} skills</p>
            </div>
          </Card>
        </div>

        <Separator className="my-6" />

        <SkillsDisplay 
          selectedRoleSkills={selectedRoleSkills}
          toggledSkills={toggledSkills}
          roleId={selectedRole}
          selectedLevel={selectedLevel}
        />

        <CompetencyGraph roleId={selectedRole} track={currentTrack} />
      </div>
    </div>
  );
};