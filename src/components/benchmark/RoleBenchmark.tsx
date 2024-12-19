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
import { ToggledSkillsProvider } from "../skills/context/ToggledSkillsContext";
import { useToast } from "@/components/ui/use-toast";

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

const RoleBenchmarkContent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { toggledSkills } = useToggledSkills();
  const { setBenchmarkSearchSkills } = useBenchmarkSearch();
  const { selectedRole, selectedLevel, setSelectedRole, setSelectedLevel } = useRoleStore();
  const { id } = useParams<{ id: string }>();
  const employees = useEmployeeStore((state) => state.employees);
  const updateEmployee = useEmployeeStore((state) => state.updateEmployee);
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
  const track = getTrackForRole(selectedRole);

  // Handle role changes and persist them
  const handleRoleChange = (newRole: string) => {
    console.log('Role changed:', { newRole, currentEmployee: employee });
    setSelectedRole(newRole);
    
    if (employee) {
      const roleTitle = Object.entries(roleSkills).find(([id]) => id === newRole)?.[1]?.title;
      if (roleTitle) {
        const updatedEmployee = {
          ...employee,
          role: `${roleTitle}: ${selectedLevel.toUpperCase()}`
        };
        updateEmployee(updatedEmployee);
        console.log('Updated employee role:', updatedEmployee.role);
        toast({
          title: "Role Updated",
          description: `Employee role updated to ${updatedEmployee.role}`,
        });
      }
    }
  };

  // Handle level changes and persist them
  const handleLevelChange = (newLevel: string) => {
    console.log('Level changed:', { newLevel, currentEmployee: employee });
    setSelectedLevel(newLevel);
    
    if (employee) {
      const roleTitle = Object.entries(roleSkills).find(([id]) => id === selectedRole)?.[1]?.title;
      if (roleTitle) {
        const updatedEmployee = {
          ...employee,
          role: `${roleTitle}: ${newLevel.toUpperCase()}`
        };
        updateEmployee(updatedEmployee);
        console.log('Updated employee level:', updatedEmployee.role);
        toast({
          title: "Level Updated",
          description: `Employee level updated to ${newLevel.toUpperCase()}`,
        });
      }
    }
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

  console.log('RoleBenchmark rendering with:', {
    selectedRole,
    selectedLevel,
    track,
    employeeTrack,
    employeeLevel,
    hasSkills: !!currentRoleSkills,
    employeeRole: employee?.role,
    employeeRoleId
  });

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
          <Select value={selectedRole} onValueChange={handleRoleChange}>
            <SelectTrigger className="w-[400px]">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="123">AI Engineer</SelectItem>
              <SelectItem value="124">Backend Engineer</SelectItem>
              <SelectItem value="125">Frontend Engineer</SelectItem>
              <SelectItem value="126">Engineering Manager</SelectItem>
              <SelectItem value="127">DevOps Engineer</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedLevel} onValueChange={handleLevelChange}>
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

        {id && <BenchmarkAnalysis 
          selectedRole={selectedRole}
          roleLevel={selectedLevel}
          employeeId={id}
        />}
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