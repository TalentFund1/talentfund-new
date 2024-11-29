import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { roleSkills } from "../skills/data/roleSkills";
import { useState, useEffect } from "react";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";
import { useTrack } from "../skills/context/TrackContext";
import { RoleSelection } from "./RoleSelection";
import { useBenchmarkSearch } from "../skills/context/BenchmarkSearchContext";
import { create } from "zustand";
import { useParams } from "react-router-dom";
import { getEmployeeSkills } from "./skills-matrix/initialSkills";
import { getSkillProfileId, getBaseRole, getLevel } from "../EmployeeTable";
import { useEmployeeStore } from "../employee/store/employeeStore";
import { BenchmarkAnalysis } from "./analysis/BenchmarkAnalysis";
import { ToggledSkillsProvider } from "../skills/context/ToggledSkillsContext";

interface RoleStore {
  selectedRole: string;
  setSelectedRole: (role: string) => void;
  selectedLevel: string;
  setSelectedLevel: (level: string) => void;
}

export const useRoleStore = create<RoleStore>((set) => ({
  selectedRole: "123", // Default to AI Engineer
  setSelectedRole: (role) => set({ selectedRole: role }),
  selectedLevel: "p4",
  setSelectedLevel: (level) => set({ selectedLevel: level }),
}));

const roles = {
  "123": "AI Engineer",
  "124": "Backend Engineer",
  "125": "Frontend Engineer",
  "126": "Engineering Manager",
  "127": "DevOps Engineer"
};

export const RoleBenchmark = () => {
  const navigate = useNavigate();
  const { toggledSkills } = useToggledSkills();
  const { getTrackForRole, setTrackForRole } = useTrack();
  const { setBenchmarkSearchSkills } = useBenchmarkSearch();
  const { selectedRole, setSelectedRole, selectedLevel: roleLevel, setSelectedLevel: setRoleLevel } = useRoleStore();
  const { id } = useParams<{ id: string }>();
  const employees = useEmployeeStore((state) => state.employees);
  const [currentTrack, setCurrentTrack] = useState<"Professional" | "Managerial">("Professional");

  const employee = employees.find(emp => emp.id === id);
  const currentRoleSkills = roleSkills[selectedRole as keyof typeof roleSkills];

  // Effect to handle track changes only
  useEffect(() => {
    if (selectedRole) {
      const track = getTrackForRole(selectedRole);
      console.log('Track update:', { selectedRole, track });
      setCurrentTrack(track);
      
      // Only adjust level if track mismatch
      const isManagerial = track === "Managerial";
      const currentLevel = roleLevel.toLowerCase();
      const needsLevelAdjustment = (isManagerial && currentLevel.startsWith('p')) || 
                                  (!isManagerial && currentLevel.startsWith('m'));
      
      if (needsLevelAdjustment) {
        setRoleLevel(isManagerial ? 'm3' : 'p4');
      }
    }
  }, [selectedRole, getTrackForRole]);

  // Handle skill updates when role changes
  useEffect(() => {
    if (!currentRoleSkills) return;

    const allSkills = [
      ...currentRoleSkills.specialized,
      ...currentRoleSkills.common,
      ...currentRoleSkills.certifications
    ]
    .map(skill => skill.title)
    .filter(skillTitle => toggledSkills.has(skillTitle));
    
    setBenchmarkSearchSkills(allSkills);
  }, [currentRoleSkills, setBenchmarkSearchSkills, toggledSkills]);

  const handleSeeSkillProfile = () => {
    navigate(`/skills/${selectedRole}`);
  };

  const handleRoleChange = (newRole: string) => {
    const newTrack = getTrackForRole(newRole);
    console.log('Role change:', { newRole, newTrack, roleName: roles[newRole as keyof typeof roles] });
    
    setSelectedRole(newRole);
    setCurrentTrack(newTrack);
    
    // Adjust level based on new track if needed
    const isManagerial = newTrack === "Managerial";
    const currentLevel = roleLevel.toLowerCase();
    const needsLevelAdjustment = (isManagerial && currentLevel.startsWith('p')) || 
                                (!isManagerial && currentLevel.startsWith('m'));
    
    if (needsLevelAdjustment) {
      setRoleLevel(isManagerial ? 'm3' : 'p4');
    }
  };

  const handleTrackChange = (value: string) => {
    setTrackForRole(selectedRole, value as "Professional" | "Managerial");
    setCurrentTrack(value as "Professional" | "Managerial");
  };

  if (!currentRoleSkills) {
    console.log('No role skills found for role:', selectedRole);
    return null;
  }

  return (
    <ToggledSkillsProvider>
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
            onRoleChange={handleRoleChange}
            onLevelChange={setRoleLevel}
            onTrackChange={handleTrackChange}
            roles={roles}
          />

          {id && <BenchmarkAnalysis 
            selectedRole={selectedRole}
            roleLevel={roleLevel}
            employeeId={id}
          />}
        </div>
      </div>
    </ToggledSkillsProvider>
  );
};