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
import { useParams } from "react-router-dom";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";
import { getEmployeeSkills } from "./skills-matrix/initialSkills";
import { CompetencyMatchSection } from "./CompetencyMatchSection";
import { Separator } from "../ui/separator";

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
  const { id } = useParams<{ id: string }>();
  const [selectedLevel, setSelectedLevel] = useState<string>("p4");
  const { toggledSkills } = useToggledSkills();
  const { getTrackForRole, setTrackForRole } = useTrack();
  const { setBenchmarkSearchSkills } = useBenchmarkSearch();
  const { selectedRole, setSelectedRole, selectedLevel: roleLevel, setSelectedLevel: setRoleLevel } = useRoleStore();
  const { currentStates } = useSkillsMatrixStore();
  const employeeSkills = getEmployeeSkills(id || "123");

  const currentTrack = getTrackForRole(selectedRole);
  const currentRoleSkills = roleSkills[selectedRole as keyof typeof roleSkills] || roleSkills["123"];

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

  // Match skills based on role profile skills
  const allRoleSkills = [
    ...currentRoleSkills.specialized,
    ...currentRoleSkills.common,
    ...currentRoleSkills.certifications
  ];

  const matchingSkills = allRoleSkills.filter(roleSkill => {
    const employeeSkill = employeeSkills.find(empSkill => empSkill.title === roleSkill.title);
    return employeeSkill !== undefined && toggledSkills.has(roleSkill.title);
  });

  const matchPercentage = Math.round((matchingSkills.length / allRoleSkills.length) * 100);

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

        <Separator className="my-6" />

        <Card className="p-8 bg-white space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
                Benchmark Analysis
                <span className="bg-[#ECFDF3] text-[#027A48] rounded-full px-3 py-1.5 text-sm font-medium">
                  {matchPercentage}%
                </span>
              </h2>
              <p className="text-sm text-muted-foreground">
                Manage and track employee skills and competencies
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-white p-6 w-full">
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">Skill Match</span>
                  <span className="text-sm text-foreground">
                    {matchingSkills.length} out of {allRoleSkills.length}
                  </span>
                </div>
                <div className="h-2 w-full bg-[#F7F9FF] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#1F2144] rounded-full" 
                    style={{ width: `${matchPercentage}%` }} 
                  />
                </div>
              </div>
            </div>

            <CompetencyMatchSection 
              skills={matchingSkills}
              roleLevel={roleLevel}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};
