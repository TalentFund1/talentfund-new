import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { roleSkills } from "../skills/data/roleSkills";
import { useState, useEffect } from "react";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";
import { useTrack } from "../skills/context/TrackContext";
import { useBenchmarkSearch } from "../skills/context/BenchmarkSearchContext";
import { create } from "zustand";
import { useParams } from "react-router-dom";
import { getEmployeeSkills } from "./skills-matrix/initialSkills";
import { useEmployeeStore } from "../employee/store/employeeStore";
import { BenchmarkAnalysis } from "./analysis/BenchmarkAnalysis";
import { ToggledSkillsProvider } from "../skills/context/ToggledSkillsContext";

interface RoleStore {
  selectedRole: string;
  setSelectedRole: (role: string) => void;
}

export const useRoleStore = create<RoleStore>((set) => {
  const employeeId = window.location.pathname.split('/').pop();
  const employees = useEmployeeStore.getState().employees;
  const employee = employees.find(emp => emp.id === employeeId);
  const defaultRoleId = "123"; // Default to AI Engineer role

  console.log('Initializing RoleStore with:', {
    employeeId,
    defaultRoleId,
    employeeFound: !!employee,
    employeeRole: employee?.role
  });

  return {
    selectedRole: defaultRoleId,
    setSelectedRole: (role) => set({ selectedRole: role })
  };
});

export const RoleBenchmark = () => {
  const navigate = useNavigate();
  const { toggledSkills } = useToggledSkills();
  const { setBenchmarkSearchSkills } = useBenchmarkSearch();
  const { selectedRole, setSelectedRole } = useRoleStore();
  const { id } = useParams<{ id: string }>();
  const employees = useEmployeeStore((state) => state.employees);

  const employee = employees.find(emp => emp.id === id);
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

  if (!currentRoleSkills) {
    console.error('No role skills found for role:', selectedRole);
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
              onClick={() => navigate(`/skills/${selectedRole}`)}
            >
              See Skill Profile
            </Button>
          </div>

          {id && <BenchmarkAnalysis 
            selectedRole={selectedRole}
            roleLevel="p4"
            employeeId={id}
          />}
        </div>
      </div>
    </ToggledSkillsProvider>
  );
};