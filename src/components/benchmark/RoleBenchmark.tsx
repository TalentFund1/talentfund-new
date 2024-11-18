import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { roleSkills } from "../skills/data/roleSkills";
import { useState, useEffect } from "react";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";
import { useTrack } from "../skills/context/TrackContext";
import { RoleSelection } from "./RoleSelection";
import { useBenchmarkSearch } from "../skills/context/BenchmarkSearchContext";
import { Card } from "../ui/card";
import { create } from "zustand";

interface RoleStore {
  selectedRole: string;
  setSelectedRole: (role: string) => void;
  selectedLevel: string;
  setSelectedLevel: (level: string) => void;
}

export const useRoleStore = create<RoleStore>((set) => ({
  selectedRole: "123",
  setSelectedRole: (role) => set({ selectedRole: role }),
  selectedLevel: "p4",
  setSelectedLevel: (level) => set({ selectedLevel: level }),
}));

const roles = {
  "123": "AI Engineer",
  "124": "Backend Engineer",
  "125": "Frontend Engineer",
  "126": "Engineering Manager"
};

export const RoleBenchmark = () => {
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState<string>("p4");
  const { toggledSkills } = useToggledSkills();
  const { getTrackForRole, setTrackForRole } = useTrack();
  const { setBenchmarkSearchSkills } = useBenchmarkSearch();
  const { selectedRole, setSelectedRole, selectedLevel: roleLevel, setSelectedLevel: setRoleLevel } = useRoleStore();

  const currentTrack = getTrackForRole(selectedRole);

  useEffect(() => {
    if (currentTrack === "Professional" && roleLevel.toLowerCase().startsWith("m")) {
      setRoleLevel("p4");
    } else if (currentTrack === "Managerial" && roleLevel.toLowerCase().startsWith("p")) {
      setRoleLevel("m3");
    }
  }, [currentTrack]);

  const selectedRoleSkills = roleSkills[selectedRole as keyof typeof roleSkills] || roleSkills["123"];

  useEffect(() => {
    const allSkills = [
      ...(selectedRoleSkills.specialized || []),
      ...(selectedRoleSkills.common || []),
      ...(selectedRoleSkills.certifications || [])
    ]
    .map(skill => skill.title)
    .filter(skillTitle => toggledSkills.has(skillTitle));
    
    setBenchmarkSearchSkills(allSkills);
  }, [selectedRole, selectedRoleSkills, setBenchmarkSearchSkills, toggledSkills]);

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
          selectedLevel={roleLevel}
          currentTrack={currentTrack}
          onRoleChange={setSelectedRole}
          onLevelChange={setRoleLevel}
          onTrackChange={handleTrackChange}
          roles={roles}
        />
      </div>
    </div>
  );
};