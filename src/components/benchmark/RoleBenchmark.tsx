import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { roleSkills } from "../skills/data/roleSkills";
import { useState, useEffect } from "react";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";
import { useTrack } from "../skills/context/TrackContext";
import { RoleSelection } from "./RoleSelection";
import { SkillsDisplay } from "./SkillsDisplay";
import { useBenchmarkSearch } from "../skills/context/BenchmarkSearchContext";
import { MissingSkills } from "./MissingSkills";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
  const [selectedSkillLevel, setSelectedSkillLevel] = useState<string>("all");
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
        
        <div className="flex flex-col gap-4">
          <RoleSelection 
            selectedRole={selectedRole}
            selectedLevel={selectedLevel}
            currentTrack={currentTrack}
            onRoleChange={setSelectedRole}
            onLevelChange={setSelectedLevel}
            onTrackChange={handleTrackChange}
            roles={roles}
          />

          <Select
            value={selectedSkillLevel}
            onValueChange={setSelectedSkillLevel}
          >
            <SelectTrigger className="w-[200px] bg-white">
              <SelectValue placeholder="Filter by skill level">
                {selectedSkillLevel === 'all' ? 'All Levels' : 
                 selectedSkillLevel.charAt(0).toUpperCase() + selectedSkillLevel.slice(1)}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="unspecified">Unspecified</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator className="my-6" />

        <SkillsDisplay 
          selectedRoleSkills={selectedRoleSkills}
          toggledSkills={toggledSkills}
          roleId={selectedRole}
          selectedLevel={selectedLevel}
          selectedSkillLevel={selectedSkillLevel}
        />

        <MissingSkills roleId={selectedRole} employeeId="123" />
      </div>
    </div>
  );
};