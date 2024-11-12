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
import { useBenchmarkSearch } from "../skills/context/BenchmarkSearchContext";

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
  const { setBenchmarkSearchSkills } = useBenchmarkSearch();

  const currentTrack = getTrackForRole(selectedRole);

  useEffect(() => {
    if (currentTrack === "Professional" && selectedLevel.toLowerCase().startsWith("m")) {
      setSelectedLevel("p4");
    } else if (currentTrack === "Managerial" && selectedLevel.toLowerCase().startsWith("p")) {
      setSelectedLevel("m3");
    }
  }, [currentTrack]);

  const selectedRoleSkills = roleSkills[selectedRole as keyof typeof roleSkills] || roleSkills["123"];

  // Update search skills when role changes
  useEffect(() => {
    const allSkills = [
      ...(selectedRoleSkills.specialized || []),
      ...(selectedRoleSkills.common || []),
      ...(selectedRoleSkills.certifications || [])
    ].map(skill => skill.title);
    
    setBenchmarkSearchSkills(allSkills);
  }, [selectedRole, selectedRoleSkills, setBenchmarkSearchSkills]);

  const handleSeeSkillProfile = () => {
    navigate(`/skills/${selectedRole}`);
  };

  const handleTrackChange = (value: string) => {
    setTrackForRole(selectedRole, value as "Professional" | "Managerial");
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