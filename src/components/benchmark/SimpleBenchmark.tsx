import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCompetencyStore } from "../skills/competency/CompetencyState";
import { useState, useEffect } from "react";
import { professionalLevels } from "./data/levelData";

const roles = {
  "124": "Backend Engineer",
  "123": "AI Engineer",
  "125": "Frontend Engineer",
  "126": "Engineering Manager"
};

export const SimpleBenchmark = () => {
  const { currentStates } = useCompetencyStore();
  const [selectedRole, setSelectedRole] = useState("123");
  const [selectedLevel, setSelectedLevel] = useState("p4");

  // Get the primary role ID that contains the saved states
  const getPrimaryRoleId = (): string => {
    const availableRoles = Object.keys(currentStates);
    console.log('Available roles in competency store:', availableRoles);
    
    if (availableRoles.length === 0) {
      console.log('No roles found in competency store, using default role: 123 (AI Engineer)');
      return "123";
    }
    
    console.log('Using primary role from competency store:', {
      roleId: availableRoles[0],
      roleName: roles[availableRoles[0] as keyof typeof roles]
    });
    return availableRoles[0];
  };

  useEffect(() => {
    const primaryRoleId = getPrimaryRoleId();
    console.log('Setting selected role from competency store:', {
      previousRole: selectedRole,
      newRole: primaryRoleId,
      availableStates: Object.keys(currentStates)
    });
    setSelectedRole(primaryRoleId);
  }, [currentStates]);

  const getLevelDescription = (level: string) => {
    switch (level.toLowerCase()) {
      case 'p1': return 'Entry';
      case 'p2': return 'Developing';
      case 'p3': return 'Career';
      case 'p4': return 'Senior';
      case 'p5': return 'Expert';
      case 'p6': return 'Principal';
      default: return '';
    }
  };

  console.log('Current benchmark state:', {
    selectedRole,
    selectedLevel,
    roleName: roles[selectedRole as keyof typeof roles],
    levelDescription: getLevelDescription(selectedLevel)
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
                {professionalLevels[selectedLevel.toLowerCase() as keyof typeof professionalLevels]} - {getLevelDescription(selectedLevel)}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {Object.entries(professionalLevels).map(([id, title]) => (
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