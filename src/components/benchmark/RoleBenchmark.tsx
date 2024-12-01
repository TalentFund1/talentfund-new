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
import { Separator } from "@/components/ui/separator";
import { useTrack } from "../skills/context/TrackContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { professionalLevels, managerialLevels } from "./data/levelData";
import { getSkillProfileId } from "../EmployeeTable";
import { getEmployeeTrack } from "../employee/utils/employeeTrackUtils";

interface RoleStore {
  selectedRole: string;
  selectedLevel: string;
  setSelectedRole: (role: string) => void;
  setSelectedLevel: (level: string) => void;
}

export const useRoleStore = create<RoleStore>((set) => ({
  selectedRole: "",
  selectedLevel: "p4", // Default to P4 for professional track
  setSelectedRole: (role) => set({ selectedRole: role }),
  setSelectedLevel: (level) => set({ selectedLevel: level })
}));

// Role mapping between form roles and role IDs
const roleMapping: { [key: string]: string } = {
  "AI Engineer": "123",
  "Backend Engineer": "124",
  "Frontend Engineer": "125",
  "Engineering Manager": "126",
  "DevOps Engineer": "127"
};

// Reverse mapping for displaying role names
const reverseRoleMapping: { [key: string]: string } = Object.entries(roleMapping).reduce(
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

export const RoleBenchmark = () => {
  const navigate = useNavigate();
  const { toggledSkills } = useToggledSkills();
  const { setBenchmarkSearchSkills } = useBenchmarkSearch();
  const { selectedRole, selectedLevel, setSelectedRole, setSelectedLevel } = useRoleStore();
  const { id } = useParams<{ id: string }>();
  const employees = useEmployeeStore((state) => state.employees);
  const { getTrackForRole } = useTrack();

  const employee = employees.find(emp => emp.id === id);
  const employeeRoleId = employee ? getSkillProfileId(employee.role) : "";
  const employeeTrack = employee ? getEmployeeTrack(employee.role) : "Professional";
  
  // Set initial role based on employee's assigned role
  useEffect(() => {
    if (employeeRoleId) {
      console.log('Setting initial role based on employee role:', {
        employeeId: id,
        employeeRole: employee?.role,
        roleId: employeeRoleId,
        employeeTrack,
        mappedRole: reverseRoleMapping[employeeRoleId]
      });
      setSelectedRole(employeeRoleId);
    }
  }, [employeeRoleId, setSelectedRole]);

  const currentRoleSkills = roleSkills[selectedRole as keyof typeof roleSkills];
  const track = getTrackForRole(selectedRole);

  // Set the appropriate level based on employee's track when role changes
  useEffect(() => {
    const defaultLevel = employeeTrack === "Managerial" ? "m3" : "p4";
    console.log('Setting default level based on employee track:', {
      employeeTrack,
      defaultLevel,
      currentTrack: track
    });
    setSelectedLevel(defaultLevel);
  }, [track, setSelectedLevel, employeeTrack]);

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

  const getLevelDescription = (level: string) => {
    switch (level.toLowerCase()) {
      case 'p1': return 'Entry';
      case 'p2': return 'Developing';
      case 'p3': return 'Career';
      case 'p4': return 'Senior';
      case 'p5': return 'Expert';
      case 'p6': return 'Principal';
      case 'm3': return 'Manager';
      case 'm4': return 'Senior Manager';
      case 'm5': return 'Director';
      case 'm6': return 'Senior Director';
      default: return '';
    }
  };

  // Determine which levels to show based on employee's track
  const availableLevels = employeeTrack === "Managerial" ? managerialLevels : professionalLevels;

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-foreground">Role Benchmark</h3>
          <Button 
            variant="outline" 
            className="bg-[#F7F9FF] text-[#1F2144] hover:bg-[#F7F9FF]/90 border border-[#CCDBFF]"
            onClick={() => navigate(`/skills/${selectedRole}`)}
          >
            See Skill Profile
          </Button>
        </div>

        <div className="flex items-center gap-4 mt-4">
          <Select value={selectedRole} onValueChange={setSelectedRole}>
            <SelectTrigger className="w-[400px]">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(roleMapping).map(([title, id]) => (
                <SelectItem key={id} value={id}>{title}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedLevel} onValueChange={setSelectedLevel}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(availableLevels).map(([key, value]) => (
                <SelectItem key={key} value={key.toLowerCase()}>
                  {value} - {getLevelDescription(key)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator className="my-6" />

        {id && <BenchmarkAnalysis />}
      </div>
    </div>
  );
};