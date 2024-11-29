import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useCompetencyStore } from "../skills/competency/CompetencyState";
import { useState, useEffect } from "react";
import { professionalLevels, managerialLevels } from "./data/levelData";
import { useParams, useNavigate } from "react-router-dom";
import { useEmployeeStore } from "../employee/store/employeeStore";
import { getSkillProfileId, getLevel } from "../EmployeeTable";
import { useTrack } from "../skills/context/TrackContext";

const roles = {
  "124": "Backend Engineer",
  "123": "AI Engineer",
  "125": "Frontend Engineer",
  "126": "Engineering Manager"
};

export const SimpleBenchmark = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentStates } = useCompetencyStore();
  const getEmployeeById = useEmployeeStore((state) => state.getEmployeeById);
  const { getTrackForRole } = useTrack();
  const employee = getEmployeeById(id || "");
  
  // Initialize with employee's role and level
  const [selectedRole, setSelectedRole] = useState(() => {
    if (employee) {
      const profileId = getSkillProfileId(employee.role);
      console.log('Initializing with employee role:', {
        employeeRole: employee.role,
        mappedProfileId: profileId
      });
      return profileId;
    }
    return "";
  });

  const [selectedLevel, setSelectedLevel] = useState(() => {
    if (employee) {
      const level = getLevel(employee.role).toLowerCase();
      console.log('Initializing with employee level:', {
        employeeRole: employee.role,
        extractedLevel: level
      });
      return level;
    }
    return "p4";
  });

  const track = getTrackForRole(selectedRole);
  const levels = track === "Managerial" ? managerialLevels : professionalLevels;

  // Single effect to handle initial synchronization
  useEffect(() => {
    if (employee) {
      const profileId = getSkillProfileId(employee.role);
      const level = getLevel(employee.role).toLowerCase();
      const newTrack = getTrackForRole(profileId);
      
      console.log('Initial synchronization:', {
        profileId,
        level,
        track: newTrack
      });

      if (profileId !== selectedRole) {
        setSelectedRole(profileId);
        
        // Adjust level based on new role's track if needed
        const isManagerial = newTrack === "Managerial";
        const isWrongTrack = (isManagerial && level.startsWith('p')) || 
                            (!isManagerial && level.startsWith('m'));
        
        if (isWrongTrack) {
          setSelectedLevel(isManagerial ? 'm3' : 'p4');
        } else {
          setSelectedLevel(level);
        }
      }
    }
  }, [employee]); // Only depend on employee changes

  const handleRoleChange = (newRole: string) => {
    console.log('Role selection changed:', {
      previousRole: selectedRole,
      newRole,
      roleName: roles[newRole as keyof typeof roles]
    });
    
    setSelectedRole(newRole);
    
    // Adjust level based on new role's track
    const newTrack = getTrackForRole(newRole);
    const isManagerial = newTrack === "Managerial";
    const currentLevel = selectedLevel.toLowerCase();
    const isWrongTrack = (isManagerial && currentLevel.startsWith('p')) || 
                        (!isManagerial && currentLevel.startsWith('m'));
    
    if (isWrongTrack) {
      setSelectedLevel(isManagerial ? 'm3' : 'p4');
    }
  };

  const handleSeeSkillProfile = () => {
    navigate(`/skills/${selectedRole}`);
  };

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

  console.log('Current benchmark state:', {
    selectedRole,
    selectedLevel,
    roleName: roles[selectedRole as keyof typeof roles],
    levelDescription: getLevelDescription(selectedLevel),
    track
  });

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
        
        <div className="flex gap-4 w-full max-w-[800px]">
          <Select 
            value={selectedRole}
            onValueChange={handleRoleChange}
          >
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="Select Role">
                {roles[selectedRole as keyof typeof roles]}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {Object.entries(roles).map(([id, title]) => (
                <SelectItem key={id} value={id}>
                  {title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={selectedLevel}
            onValueChange={(value) => {
              console.log('Level selection changed:', {
                previousLevel: selectedLevel,
                newLevel: value,
                description: getLevelDescription(value)
              });
              setSelectedLevel(value);
            }}
          >
            <SelectTrigger className="w-[200px] bg-white">
              <SelectValue placeholder="Select Level">
                {levels[selectedLevel.toLowerCase() as keyof typeof levels]} - {getLevelDescription(selectedLevel)}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {Object.entries(levels).map(([id, title]) => (
                <SelectItem key={id} value={id}>
                  <span className="flex items-center justify-between w-full">
                    <span>{title}</span>
                    <span className="text-muted-foreground ml-2">- {getLevelDescription(id)}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};