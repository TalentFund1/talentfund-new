import { Card } from "@/components/ui/card";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useBenchmarkSearch } from "../skills/context/BenchmarkSearchContext";
import { RoleSelection } from "./RoleSelection";
import { useRoleStore } from "./RoleBenchmark";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";
import { CategorizedSkills } from "./CategorizedSkills";
import { useTrack } from "../skills/context/TrackContext";
import { SkillGoalSection } from "./SkillGoalSection";
import { SkillsMatrixContent } from "./skills-matrix/SkillsMatrixContent";

const roles = {
  "123": "AI Engineer",
  "124": "Backend Engineer",
  "125": "Frontend Engineer",
  "126": "Engineering Manager"
};

export const BenchmarkSkillsMatrix = () => {
  const { id } = useParams<{ id: string }>();
  const { benchmarkSearchSkills } = useBenchmarkSearch();
  const [selectedSearchSkills, setSelectedSearchSkills] = useState<string[]>([]);
  const { selectedRole, setSelectedRole, selectedLevel: roleLevel, setSelectedLevel: setRoleLevel } = useRoleStore();
  const { toggledSkills } = useToggledSkills();
  const { getTrackForRole } = useTrack();

  return (
    <div className="space-y-6">
      <Card className="p-8 bg-white space-y-8">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold text-foreground">Skills Matrix</h2>
          <p className="text-sm text-muted-foreground">
            Manage and track employee skills and competencies
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <RoleSelection 
            selectedRole={selectedRole}
            selectedLevel={roleLevel}
            currentTrack={getTrackForRole(selectedRole)}
            onRoleChange={setSelectedRole}
            onLevelChange={setRoleLevel}
            onTrackChange={() => {}}
            roles={roles}
          />
        </div>

        <CategorizedSkills 
          roleId={selectedRole}
          employeeId={id || ""}
          selectedLevel={roleLevel}
        />

        <SkillsMatrixContent
          id={id || ""}
          selectedSearchSkills={selectedSearchSkills}
          setSelectedSearchSkills={setSelectedSearchSkills}
        />
      </Card>
    </div>
  );
};