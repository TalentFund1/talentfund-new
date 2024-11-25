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

interface RoleStore {
  selectedRole: string;
  setSelectedRole: (role: string) => void;
  selectedLevel: string;
  setSelectedLevel: (level: string) => void;
}

export const useRoleStore = create<RoleStore>((set) => ({
  selectedRole: "123", // Default to AI Engineer
  setSelectedRole: (role) => set({ selectedRole: role }),
  selectedLevel: "p4", // Default to P4
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
  const { toggledSkills, setToggledSkills } = useToggledSkills();
  const { getTrackForRole, setTrackForRole } = useTrack();
  const { setBenchmarkSearchSkills } = useBenchmarkSearch();
  const { selectedRole, setSelectedRole, selectedLevel: roleLevel, setSelectedLevel: setRoleLevel } = useRoleStore();
  const { id } = useParams<{ id: string }>();
  const employees = useEmployeeStore((state) => state.employees);

  // Find the employee and get their role
  const employee = employees.find(emp => emp.id === id);
  const currentRoleSkills = roleSkills[selectedRole as keyof typeof roleSkills];
  const currentTrack = getTrackForRole(selectedRole);
  
  // Set initial role and level based on employee's role
  useEffect(() => {
    if (employee) {
      const profileId = getSkillProfileId(employee.role);
      const level = getLevel(employee.role).toLowerCase();
      console.log('Setting initial role and level:', { profileId, level, employeeRole: employee.role });
      setSelectedRole(profileId);
      setRoleLevel(level || 'p4'); // Default to p4 if no level found
    }
  }, [employee, setSelectedRole, setRoleLevel]);

  // Initialize toggled skills when role changes
  useEffect(() => {
    if (!currentRoleSkills) {
      console.warn('No role skills found for role:', selectedRole);
      return;
    }

    const allSkills = [
      ...currentRoleSkills.specialized,
      ...currentRoleSkills.common,
      ...currentRoleSkills.certifications
    ];

    // Initialize all skills as toggled for the selected role
    const newToggledSkills = new Set(allSkills.map(skill => skill.title));
    console.log('Initializing toggled skills for role:', {
      role: selectedRole,
      skillsCount: newToggledSkills.size,
      skills: Array.from(newToggledSkills)
    });
    
    setToggledSkills(newToggledSkills);
    setBenchmarkSearchSkills(Array.from(newToggledSkills));
  }, [selectedRole, currentRoleSkills, setToggledSkills, setBenchmarkSearchSkills]);

  // Handle track changes
  useEffect(() => {
    if (currentTrack === "Professional" && roleLevel.toLowerCase().startsWith("m")) {
      console.log('Adjusting level for Professional track:', { from: roleLevel, to: 'p4' });
      setRoleLevel("p4");
    } else if (currentTrack === "Managerial" && roleLevel.toLowerCase().startsWith("p")) {
      console.log('Adjusting level for Managerial track:', { from: roleLevel, to: 'm3' });
      setRoleLevel("m3");
    }
  }, [currentTrack, roleLevel, setRoleLevel]);

  const handleSeeSkillProfile = () => {
    navigate(`/skills/${selectedRole}`);
  };

  const handleTrackChange = (value: string) => {
    setTrackForRole(selectedRole, value as "Professional" | "Managerial");
  };

  if (!currentRoleSkills) {
    console.error('No role skills found for role:', selectedRole);
    return null;
  }

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

        {id && <BenchmarkAnalysis 
          selectedRole={selectedRole}
          roleLevel={roleLevel}
          employeeId={id}
        />}
      </div>
    </div>
  );
};