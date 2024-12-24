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
import { getSkillProfileId } from "../EmployeeTable";
import { getEmployeeTrack } from "../employee/utils/employeeTrackUtils";
import { ToggledSkillsProvider } from "../skills/context/ToggledSkillsContext";
import { RoleSelectionSection } from "./role-selection/RoleSelectionSection";

interface RoleStore {
  selectedRole: string;
  selectedLevel: string;
  setSelectedRole: (role: string) => void;
  setSelectedLevel: (level: string) => void;
}

export const useRoleStore = create<RoleStore>((set) => ({
  selectedRole: "",
  selectedLevel: "p4",
  setSelectedRole: (role) => set({ selectedRole: role }),
  setSelectedLevel: (level) => set({ selectedLevel: level })
}));

export const RoleBenchmarkContent = () => {
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
  const employeeLevel = employee?.role.split(':')[1]?.trim().toLowerCase() || "p4";

  // Set initial role and level based on employee's assigned role
  useEffect(() => {
    if (employeeRoleId && employeeLevel) {
      console.log('Setting initial role and level in RoleBenchmark:', {
        employeeId: id,
        employeeRole: employee?.role,
        roleId: employeeRoleId,
        level: employeeLevel,
        employeeTrack
      });
      setSelectedRole(employeeRoleId);
      setSelectedLevel(employeeLevel);
    }
  }, [employeeRoleId, employeeLevel, setSelectedRole, setSelectedLevel, employee?.role]);

  const currentRoleSkills = roleSkills[selectedRole as keyof typeof roleSkills];

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

  console.log('RoleBenchmark rendering with:', {
    selectedRole,
    selectedLevel,
    employeeTrack,
    employeeLevel,
    hasSkills: !!currentRoleSkills,
    employeeRole: employee?.role,
    employeeRoleId
  });

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

        <RoleSelectionSection
          selectedRole={selectedRole}
          selectedLevel={selectedLevel}
          employeeId={id}
          onRoleChange={setSelectedRole}
          onLevelChange={setSelectedLevel}
        />

        <Separator className="my-6" />

        {id && <BenchmarkAnalysis />}
      </div>
    </div>
  );
};

export const RoleBenchmark = () => {
  return (
    <ToggledSkillsProvider>
      <RoleBenchmarkContent />
    </ToggledSkillsProvider>
  );
};
