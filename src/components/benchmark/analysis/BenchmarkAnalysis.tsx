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
import { calculateMatchingSkills } from "./analysis/MatchingSkillsCalculator";
import { calculateMatchPercentages } from "./analysis/MatchPercentageCalculator";
import { ProgressBar } from "./analysis/ProgressBar";

export const BenchmarkAnalysis = () => {
  const { id } = useParams<{ id: string }>();
  const { toggledSkills } = useToggledSkills();
  const { currentStates } = useSkillsMatrixStore();
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
  } = calculateMatchingSkills(
    toggledRoleSkills,
    employeeSkills,
    comparisonLevel,
    selectedRole,
    track
  );

  const {
    skillMatchPercentage,
    competencyMatchPercentage,
    skillGoalMatchPercentage,
    averagePercentage
  } = calculateMatchPercentages(
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

  const processedSkills = allRoleSkills
    .filter(skill => toggledSkills.has(skill.title))
    .map(skill => {
      const employeeSkill = employeeSkills.find(empSkill => empSkill.title === skill.title);
      const roleSkillState = getSkillCompetencyState(skill.title, selectedLevel.toLowerCase(), selectedRole);
      
      return {
        ...skill,
        roleLevel: roleSkillState?.level || 'unspecified',
        employeeLevel: currentStates[skill.title]?.level || employeeSkill?.level || 'unspecified',
        goalStatus: currentStates[skill.title]?.goalStatus || 'unknown'
      };
    })
    .sort((a, b) => {
      const aRoleLevel = a.roleLevel;
      const bRoleLevel = b.roleLevel;
      
      const roleLevelDiff = getLevelPriority(aRoleLevel) - getLevelPriority(bRoleLevel);
      if (roleLevelDiff !== 0) return roleLevelDiff;

      const employeeLevelDiff = getLevelPriority(a.employeeLevel) - getLevelPriority(b.employeeLevel);
      if (employeeLevelDiff !== 0) return employeeLevelDiff;

      const requirementDiff = getSkillGoalPriority(a.goalStatus) - getSkillGoalPriority(b.goalStatus);
      if (requirementDiff !== 0) return requirementDiff;

      return a.title.localeCompare(b.title);
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
