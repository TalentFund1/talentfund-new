import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";
import { useTrack } from "../skills/context/TrackContext";
import { RoleSelection } from "./RoleSelection";
import { useBenchmarkSearch } from "../skills/context/BenchmarkSearchContext";
import { getSkillProfileId, getBaseRole, getLevel } from "../EmployeeTable";
import { useEmployeeStore } from "../employee/store/employeeStore";
import { BenchmarkAnalysis } from "./analysis/BenchmarkAnalysis";
import { useRoleBenchmarkStore } from "./role/RoleBenchmarkState";
import { saveRoleSkills } from "./role/RoleSkillsManager";

const roles = {
  "123": "AI Engineer",
  "124": "Backend Engineer",
  "125": "Frontend Engineer",
  "126": "Engineering Manager",
  "127": "DevOps Engineer"
};

export const RoleBenchmark = () => {
  const navigate = useNavigate();
  const { toggledSkills, setToggledSkills } = useToggledSkills();
  const { getTrackForRole, setTrackForRole } = useTrack();
  const { setBenchmarkSearchSkills } = useBenchmarkSearch();
  const { id } = useParams<{ id: string }>();
  const employees = useEmployeeStore((state) => state.employees);
  const [currentTrack, setCurrentTrack] = useState<"Professional" | "Managerial">("Professional");

  const { 
    selectedRole, 
    selectedLevel: roleLevel,
    setSelectedRole,
    setSelectedLevel,
    initializeSkills
  } = useRoleBenchmarkStore();

  const employee = employees.find(emp => emp.id === id);

  // Override role when employee profile is loaded
  useEffect(() => {
    if (id && employee) {
      const employeeRoleId = getSkillProfileId(getBaseRole(employee.role));
      const employeeLevel = getLevel(employee.role);
      
      console.log('Loading employee profile:', {
        employeeId: id,
        roleId: employeeRoleId,
        level: employeeLevel,
        existingToggledSkills: toggledSkills.size
      });
      
      setSelectedRole(employeeRoleId);
      setSelectedLevel(employeeLevel.toLowerCase());
      
      const newSkills = initializeSkills(employeeRoleId, toggledSkills);
      if (newSkills.size !== toggledSkills.size) {
        setToggledSkills(newSkills);
      }
    }
  }, [id, employee, setSelectedRole, setSelectedLevel, initializeSkills, setToggledSkills, toggledSkills]);

  // Effect to handle track changes
  useEffect(() => {
    if (selectedRole) {
      const track = getTrackForRole(selectedRole);
      setCurrentTrack(track);
      
      const isManagerial = track === "Managerial";
      const currentLevel = roleLevel.toLowerCase();
      const needsLevelAdjustment = (isManagerial && currentLevel.startsWith('p')) || 
                                  (!isManagerial && currentLevel.startsWith('m'));
      
      if (needsLevelAdjustment) {
        setSelectedLevel(isManagerial ? 'm3' : 'p4');
      }
    }
  }, [selectedRole, getTrackForRole, roleLevel, setSelectedLevel]);

  const handleSeeSkillProfile = () => {
    navigate(`/skills/${selectedRole}`);
  };

  const handleRoleChange = (newRole: string) => {
    const newTrack = getTrackForRole(newRole);
    console.log('Role change:', { newRole, newTrack, roleName: roles[newRole as keyof typeof roles] });
    
    setSelectedRole(newRole);
    setCurrentTrack(newTrack);
    
    const newSkills = initializeSkills(newRole, toggledSkills);
    setToggledSkills(newSkills);
    
    const isManagerial = newTrack === "Managerial";
    const currentLevel = roleLevel.toLowerCase();
    const needsLevelAdjustment = (isManagerial && currentLevel.startsWith('p')) || 
                                (!isManagerial && currentLevel.startsWith('m'));
    
    if (needsLevelAdjustment) {
      setSelectedLevel(isManagerial ? 'm3' : 'p4');
    }
  };

  const handleTrackChange = (value: string) => {
    setTrackForRole(selectedRole, value as "Professional" | "Managerial");
    setCurrentTrack(value as "Professional" | "Managerial");
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
          onRoleChange={handleRoleChange}
          onLevelChange={setSelectedLevel}
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