import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCompetencyStore } from "../skills/competency/CompetencyState";
import { useState, useEffect } from "react";
import { professionalLevels, managerialLevels } from "./data/levelData";
import { useParams } from "react-router-dom";
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
  const { currentStates } = useCompetencyStore();
  const getEmployeeById = useEmployeeStore((state) => state.getEmployeeById);
  const { getTrackForRole } = useTrack();
  const employee = getEmployeeById(id || "");
  
  // Initialize with employee's role
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

  // Get the primary role ID that contains the saved states
  const getPrimaryRoleId = (): string => {
    const availableRoles = Object.keys(currentStates);
    console.log('Available roles in competency store:', availableRoles);
    
    if (!employee) {
      console.log('No employee found, cannot determine role');
      return "";
    }

    const profileId = getSkillProfileId(employee.role);
    console.log('Using employee role:', {
      employeeRole: employee.role,
      mappedProfileId: profileId
    });
    return profileId;
  };

  useEffect(() => {
    const primaryRoleId = getPrimaryRoleId();
    if (primaryRoleId) {
      console.log('Setting selected role from employee:', {
        previousRole: selectedRole,
        newRole: primaryRoleId,
        availableStates: Object.keys(currentStates)
      });
      setSelectedRole(primaryRoleId);
    }
  }, [currentStates, employee]);

  // Update level when track changes
  useEffect(() => {
    const isManagerial = track === "Managerial";
    const currentLevel = selectedLevel.toLowerCase();
    const isWrongTrack = (isManagerial && currentLevel.startsWith('p')) || 
                        (!isManagerial && currentLevel.startsWith('m'));
    
    if (isWrongTrack) {
      const newLevel = isManagerial ? 'm3' : 'p4';
      console.log('Updating level to match track:', {
        previousLevel: selectedLevel,
        newLevel,
        track
      });
      setSelectedLevel(newLevel);
    }
  }, [track, selectedLevel]);

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
        </div>
        
        <div className="flex gap-4 w-full max-w-[800px]">
          <Select 
            value={selectedRole}
            onValueChange={(value) => {
              console.log('Role selection changed:', {
                previousRole: selectedRole,
                newRole: value,
                roleName: roles[value as keyof typeof roles]
              });
              setSelectedRole(value);
            }}
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