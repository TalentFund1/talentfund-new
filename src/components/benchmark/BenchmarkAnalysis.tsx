import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useParams } from "react-router-dom";
import { roleSkills } from "../skills/data/roleSkills";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";
import { useTrack } from "../skills/context/TrackContext";
import { useBenchmarkSearch } from "../skills/context/BenchmarkSearchContext";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";
import { getEmployeeSkills } from "./skills-matrix/initialSkills";
import { useRoleStore } from "./RoleBenchmark";
import { professionalLevels, managerialLevels } from "./data/levelData";
import { RoleSelection } from "./RoleSelection";

const roles = {
  "123": "AI Engineer",
  "124": "Backend Engineer",
  "125": "Frontend Engineer",
  "126": "Engineering Manager"
};

export const BenchmarkAnalysis = () => {
  const { id } = useParams<{ id: string }>();
  const { toggledSkills } = useToggledSkills();
  const { currentStates } = useSkillsMatrixStore();
  const employeeSkills = getEmployeeSkills(id || "123");
  const { selectedRole, setSelectedRole, selectedLevel, setSelectedLevel } = useRoleStore();
  const { getTrackForRole } = useTrack();
  
  // Get all skills for the selected role
  const currentRoleSkills = roleSkills[selectedRole as keyof typeof roleSkills] || roleSkills["123"];
  
  // Get the current track for the selected role
  const currentTrack = getTrackForRole(selectedRole);
  
  // Get all toggled skills for the role
  const toggledRoleSkills = [
    ...currentRoleSkills.specialized,
    ...currentRoleSkills.common,
    ...currentRoleSkills.certifications
  ].filter(skill => toggledSkills.has(skill.title));

  // Calculate matching skills by comparing employee's skills with toggled role requirements
  const matchingSkills = toggledRoleSkills.filter(roleSkill => 
    employeeSkills.some(empSkill => empSkill.title === roleSkill.title)
  );

  const totalSkillsCount = toggledRoleSkills.length;
  const matchingSkillsCount = matchingSkills.length;
  const matchPercentage = Math.round((matchingSkillsCount / totalSkillsCount) * 100);

  // Calculate competency match
  const competencyTotal = 12;
  const competencyMatch = 12;

  // Calculate skill goals
  const skillGoalTotal = 12;
  const skillGoalMatch = 8;

  return (
    <div className="space-y-6">
      <Card className="p-8 bg-white space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
              Benchmark Analysis
              <span className="bg-[#ECFDF3] text-[#027A48] rounded-full px-3 py-1.5 text-sm font-medium">
                {matchPercentage}%
              </span>
            </h2>
            <p className="text-sm text-muted-foreground">
              Manage and track employee skills and competencies
            </p>
          </div>
          <div className="flex gap-4">
            <RoleSelection 
              selectedRole={selectedRole}
              selectedLevel={selectedLevel}
              currentTrack={currentTrack}
              onRoleChange={setSelectedRole}
              onLevelChange={setSelectedLevel}
              onTrackChange={() => {}}
              roles={roles}
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-white p-6 w-full">
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Skill Match</span>
                <span className="text-sm text-foreground">
                  {matchingSkillsCount} out of {totalSkillsCount}
                </span>
              </div>
              <div className="h-2 w-full bg-[#F7F9FF] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#1F2144] rounded-full" 
                  style={{ width: `${matchPercentage}%` }} 
                />
              </div>
            </div>

            <div className="space-y-4 mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Competency Match</span>
                <span className="text-sm text-foreground">{competencyMatch} out of {competencyTotal}</span>
              </div>
              <div className="h-2 w-full bg-[#F7F9FF] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#1F2144] rounded-full" 
                  style={{ width: `${(competencyMatch/competencyTotal) * 100}%` }} 
                />
              </div>
            </div>

            <div className="space-y-4 mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Skill Goal</span>
                <span className="text-sm text-foreground">{skillGoalMatch} out of {skillGoalTotal}</span>
              </div>
              <div className="h-2 w-full bg-[#F7F9FF] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#1F2144] rounded-full" 
                  style={{ width: `${(skillGoalMatch/skillGoalTotal) * 100}%` }} 
                />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};