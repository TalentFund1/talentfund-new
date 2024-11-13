import { useState } from "react";
import { Card } from "@/components/ui/card";
import { RoleSelection } from "./RoleSelection";
import { SkillsDisplay } from "./SkillsDisplay";
import { useBenchmarkSearch } from "../skills/context/BenchmarkSearchContext";
import { MissingSkills2 } from "./MissingSkills2";
import { SkillsMatrix } from "./SkillsMatrix";
import { SkillsMatch } from "./SkillsMatch";

const roles = {
  "123": "AI Engineer",
  "124": "Backend Engineer",
  "125": "Frontend Engineer",
  "126": "Engineering Manager"
};

export const RoleBenchmark = () => {
  const [selectedRole, setSelectedRole] = useState("125");
  const [selectedLevel, setSelectedLevel] = useState("P4");
  const [currentTrack, setCurrentTrack] = useState("Professional");
  const { setBenchmarkSearchSkills } = useBenchmarkSearch();

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-white">
        <RoleSelection
          selectedRole={selectedRole}
          selectedLevel={selectedLevel}
          currentTrack={currentTrack}
          onRoleChange={setSelectedRole}
          onLevelChange={setSelectedLevel}
          onTrackChange={setCurrentTrack}
          roles={roles}
        />
      </Card>

      <SkillsDisplay
        selectedRoleSkills={[]}
        toggledSkills={new Set()}
        roleId={selectedRole}
        selectedLevel={selectedLevel}
      />

      <MissingSkills2
        roleId={selectedRole}
        employeeId="123"
        selectedLevel={selectedLevel}
      />

      <SkillsMatrix />
      
      <SkillsMatch />
    </div>
  );
};