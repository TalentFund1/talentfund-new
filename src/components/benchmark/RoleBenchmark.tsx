import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { roleSkills } from "../skills/data/roleSkills";
import { useState, useEffect } from "react";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";
import { useBenchmarkSearch } from "../skills/context/BenchmarkSearchContext";
import { create } from "zustand";
import { useParams } from "react-router-dom";
import { useEmployeeStore } from "../employee/store/employeeStore";
import { BenchmarkAnalysis } from "./analysis/BenchmarkAnalysis";
import { ToggledSkillsProvider } from "../skills/context/ToggledSkillsContext";
import { Separator } from "@/components/ui/separator";
import { useTrack } from "../skills/context/TrackContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { professionalLevels, managerialLevels } from "./data/levelData";

interface RoleStore {
  selectedRole: string;
  selectedLevel: string;
  setSelectedRole: (role: string) => void;
  setSelectedLevel: (level: string) => void;
}

export const useRoleStore = create<RoleStore>((set) => {
  console.log('Initializing RoleStore with default role: 123');
  
  return {
    selectedRole: "123", // Always default to AI Engineer
    selectedLevel: "p4", // Default to P4 for professional track
    setSelectedRole: (role) => set({ selectedRole: role }),
    setSelectedLevel: (level) => set({ selectedLevel: level })
  };
});

export const RoleBenchmark = () => {
  const navigate = useNavigate();
  const { toggledSkills } = useToggledSkills();
  const { setBenchmarkSearchSkills } = useBenchmarkSearch();
  const { selectedRole, selectedLevel, setSelectedRole, setSelectedLevel } = useRoleStore();
  const { id } = useParams<{ id: string }>();
  const employees = useEmployeeStore((state) => state.employees);
  const { getTrackForRole } = useTrack();

  const employee = employees.find(emp => emp.id === id);
  const currentRoleSkills = roleSkills[selectedRole as keyof typeof roleSkills];
  const track = getTrackForRole(selectedRole);

  const getLevelOptions = () => {
    return track === "Managerial" ? managerialLevels : professionalLevels;
  };

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

  if (!currentRoleSkills) {
    console.error('No role skills found for role:', selectedRole);
    return null;
  }

  console.log('RoleBenchmark rendering with:', {
    selectedRole,
    selectedLevel,
    track,
    hasSkills: !!currentRoleSkills
  });

  return (
    <ToggledSkillsProvider>
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h3 className="text-xl font-semibold text-foreground">Role Benchmark</h3>
              <div className="flex items-center gap-2">
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="123">AI Engineer</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(getLevelOptions()).map(([key, value]) => (
                      <SelectItem key={key} value={key}>{value}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="bg-[#F7F9FF] text-[#1F2144] hover:bg-[#F7F9FF]/90 border border-[#CCDBFF]"
              onClick={() => navigate(`/skills/${selectedRole}`)}
            >
              See Skill Profile
            </Button>
          </div>
          <Separator className="my-2" />

          {id && <BenchmarkAnalysis 
            selectedRole={selectedRole}
            roleLevel={selectedLevel}
            employeeId={id}
          />}
        </div>
      </div>
    </ToggledSkillsProvider>
  );
};