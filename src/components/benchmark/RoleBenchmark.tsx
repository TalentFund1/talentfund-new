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
import { getSkillProfileId } from "../EmployeeTable";
import { useEmployeeStore } from "../employee/store/employeeStore";
import { BenchmarkAnalysis } from "./analysis/BenchmarkAnalysis";
import { ToggledSkillsProvider } from "../skills/context/ToggledSkillsContext";
import { jobTitles } from "../skills/competency/skillProfileData";

interface RoleStore {
  selectedRole: string;
  setSelectedRole: (role: string) => void;
  selectedLevel: string;
  setSelectedLevel: (level: string) => void;
}

// Create a mapping between role titles and IDs that matches roleSkills.ts
const roleMapping: { [key: string]: string } = {
  "AI Engineer": "123",
  "Backend Engineer": "124",
  "Frontend Engineer": "125",
  "Engineering Manager": "126",
  "DevOps Engineer": "127"
};

export const useRoleStore = create<RoleStore>((set) => {
  const employeeId = window.location.pathname.split('/').pop();
  const employees = useEmployeeStore.getState().employees;
  const employee = employees.find(emp => emp.id === employeeId);
  
  // Get role ID from employee's role title
  const employeeRoleTitle = employee?.role || "";
  const defaultRoleId = roleMapping[employeeRoleTitle] || "123";

  console.log('Initializing RoleStore with:', {
    employeeId,
    defaultRoleId,
    employeeFound: !!employee,
    employeeRole: employee?.role,
    availableRoles: roleMapping
  });

  return {
    selectedRole: defaultRoleId,
    setSelectedRole: (role) => set({ selectedRole: role }),
    selectedLevel: "p4",
    setSelectedLevel: (level) => set({ selectedLevel: level }),
  };
});

// Use roleMapping to create roles object that matches roleSkills.ts
const roles = Object.entries(roleMapping).reduce((acc, [title, id]) => {
  acc[id] = title;
  return acc;
}, {} as { [key: string]: string });

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

  // Initialize role based on employee data
  useEffect(() => {
    if (employee?.role) {
      const roleId = roleMapping[employee.role];
      if (roleId && selectedRole !== roleId) {
        console.log('Updating selected role to match employee:', {
          employeeId: id,
          newRoleId: roleId,
          previousRole: selectedRole,
          employeeRole: employee.role,
          availableRoles: roles
        });
        setSelectedRole(roleId);
      }
    }
  }, [employee, selectedRole, setSelectedRole, id]);

  useEffect(() => {
    if (selectedRole) {
      const track = getTrackForRole(selectedRole);
      console.log('Track update:', { selectedRole, track });
      setCurrentTrack(track);
      
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

  const handleTrackChange = (value: string) => {
    setTrackForRole(selectedRole, value as "Professional" | "Managerial");
    setCurrentTrack(value as "Professional" | "Managerial");
  };

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
    </ToggledSkillsProvider>
  );
};