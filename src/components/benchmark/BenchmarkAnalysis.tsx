import { Card } from "@/components/ui/card";
import { useParams } from "react-router-dom";
import { roleSkills } from "../skills/data/roleSkills";
import { useToggledSkills } from "../skills/context/ToggledSkillsContext";
import { useTrack } from "../skills/context/TrackContext";
import { useSkillsMatrixStore } from "./skills-matrix/SkillsMatrixState";
import { getEmployeeSkills } from "./skills-matrix/initialSkills";
import { useRoleStore } from "./RoleBenchmark";
import { useCompetencyStateReader } from "../skills/competency/CompetencyStateReader";
import { useEmployeeStore } from "../employee/store/employeeStore";
import { getSkillProfileId } from "../EmployeeTable";
import { useEffect } from "react";
import { ProgressBar } from "./analysis/ProgressBar";
import { unifiedBenchmarkCalculator } from "../../services/benchmarking/services/UnifiedBenchmarkCalculator";

export const BenchmarkAnalysis = () => {
  const { id } = useParams<{ id: string }>();
  const { toggledSkills } = useToggledSkills();
  const { getSkillState } = useSkillsMatrixStore();
  const employeeSkills = getEmployeeSkills(id || "");
  const { selectedRole, selectedLevel, setSelectedRole, setSelectedLevel } = useRoleStore();
  const { getTrackForRole } = useTrack();
  const { getSkillCompetencyState } = useCompetencyStateReader();
  const employees = useEmployeeStore((state) => state.employees);
  
  const employee = employees.find(emp => emp.id === id);
  const employeeRoleId = employee ? getSkillProfileId(employee.role) : "";
  const employeeLevel = employee?.role.split(":")[1]?.trim().toLowerCase() || "p4";

  useEffect(() => {
    if (employeeRoleId) {
      console.log('Setting initial role and level in BenchmarkAnalysis:', {
        employeeId: id,
        employeeRole: employee?.role,
        roleId: employeeRoleId,
        level: employeeLevel
      });
      setSelectedRole(employeeRoleId);
      setSelectedLevel(employeeLevel);
    }
  }, [employeeRoleId, employeeLevel, setSelectedRole, setSelectedLevel]);
  
  const currentRoleSkills = roleSkills[selectedRole as keyof typeof roleSkills];
  if (!currentRoleSkills) {
    console.error('No role skills found for role:', selectedRole);
    return null;
  }

  const track = getTrackForRole(selectedRole);
  console.log('Current track and selected level:', { track, selectedLevel });

  const comparisonLevel = selectedLevel.toLowerCase();
  console.log('Using comparison level:', comparisonLevel);

  const allRoleSkills = [
    ...currentRoleSkills.specialized,
    ...currentRoleSkills.common,
    ...currentRoleSkills.certifications
  ];

  const toggledRoleSkills = allRoleSkills.filter(skill => toggledSkills.has(skill.title));

  console.log('Toggled skills for role:', {
    roleId: selectedRole,
    level: comparisonLevel,
    count: toggledRoleSkills.length,
    skills: toggledRoleSkills.map(s => s.title)
  });

  const {
    matchingSkills,
    competencyMatchingSkills,
    skillGoalMatchingSkills,
    totalToggledSkills
  } = unifiedBenchmarkCalculator.calculateMatchingSkills(
    toggledRoleSkills,
    employeeSkills,
    comparisonLevel,
    selectedRole
  );

  const {
    skillMatchPercentage,
    competencyMatchPercentage,
    skillGoalMatchPercentage,
    averagePercentage
  } = unifiedBenchmarkCalculator.calculateMatchPercentages(
    matchingSkills.length,
    competencyMatchingSkills.length,
    skillGoalMatchingSkills.length,
    totalToggledSkills
  );

  console.log('Benchmark Analysis Calculation:', {
    totalToggled: totalToggledSkills,
    skillMatch: { count: matchingSkills.length, percentage: skillMatchPercentage },
    competencyMatch: { count: competencyMatchingSkills.length, percentage: competencyMatchPercentage },
    skillGoalMatch: { count: skillGoalMatchingSkills.length, percentage: skillGoalMatchPercentage },
    averagePercentage,
    track,
    comparisonLevel
  });

  return (
    <div className="space-y-6">
      <Card className="p-8 bg-white space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-foreground">
              Benchmark Analysis
            </h2>
            <p className="text-sm text-muted-foreground">
              Manage and track employee skills and competencies
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <ProgressBar
            percentage={skillMatchPercentage}
            matchCount={matchingSkills.length}
            total={totalToggledSkills}
            label="Skill Match"
          />
          <ProgressBar
            percentage={competencyMatchPercentage}
            matchCount={competencyMatchingSkills.length}
            total={totalToggledSkills}
            label="Competency Match"
          />
          <ProgressBar
            percentage={skillGoalMatchPercentage}
            matchCount={skillGoalMatchingSkills.length}
            total={totalToggledSkills}
            label="Skill Goal Match"
          />
        </div>
      </Card>
    </div>
  );
};