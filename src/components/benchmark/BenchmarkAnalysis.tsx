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
import { EmployeeSkillState, RoleSkillState, UnifiedSkill } from "@/types/skillTypes";

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
  }, [employeeRoleId, employeeLevel, setSelectedRole, setSelectedLevel, employee?.role, id]);
  
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

  const matchingSkills = toggledRoleSkills.filter(roleSkill => {
    const employeeSkill = employeeSkills.find(empSkill => empSkill.title === roleSkill.title);
    return employeeSkill !== undefined;
  });

  const competencyMatchingSkills = matchingSkills.filter(skill => {
    const roleSkillState = getSkillCompetencyState(skill.title, comparisonLevel, selectedRole) as RoleSkillState | undefined;
    if (!roleSkillState) return false;

    const employeeState = currentStates[skill.title] as EmployeeSkillState | undefined;
    if (!employeeState) return false;

    const employeeSkillLevel = employeeState.level || 'unspecified';
    const roleSkillLevel = roleSkillState.level || 'unspecified';

    const getLevelPriority = (level: string = 'unspecified') => {
      const priorities: { [key: string]: number } = {
        'advanced': 3,
        'intermediate': 2,
        'beginner': 1,
        'unspecified': 0
      };
      return priorities[level.toLowerCase()] ?? 0;
    };

    const employeePriority = getLevelPriority(employeeSkillLevel);
    const rolePriority = getLevelPriority(roleSkillLevel);

    return track === "Professional" 
      ? employeePriority === rolePriority 
      : employeePriority >= rolePriority;
  });

  const skillGoalMatchingSkills = matchingSkills.filter(skill => {
    const roleSkillState = getSkillCompetencyState(skill.title, comparisonLevel, selectedRole) as RoleSkillState | undefined;
    if (!roleSkillState) return false;

    const employeeState = currentStates[skill.title] as EmployeeSkillState | undefined;
    if (!employeeState) return false;

    return roleSkillState.requirement === 'required' && employeeState.requirement === 'skill_goal';
  });

  const totalToggledSkills = toggledRoleSkills.length;
  const matchingSkillsCount = matchingSkills.length;
  const competencyMatchCount = competencyMatchingSkills.length;
  const skillGoalMatchCount = skillGoalMatchingSkills.length;

  const skillMatchPercentage = totalToggledSkills > 0 ? (matchingSkillsCount / totalToggledSkills) * 100 : 0;
  const competencyMatchPercentage = totalToggledSkills > 0 ? (competencyMatchCount / totalToggledSkills) * 100 : 0;
  const skillGoalMatchPercentage = totalToggledSkills > 0 ? (skillGoalMatchCount / totalToggledSkills) * 100 : 0;

  console.log('Benchmark Analysis Calculation:', {
    totalToggled: totalToggledSkills,
    skillMatch: { count: matchingSkillsCount, percentage: skillMatchPercentage },
    competencyMatch: { count: competencyMatchCount, percentage: competencyMatchPercentage },
    skillGoalMatch: { count: skillGoalMatchCount, percentage: skillGoalMatchPercentage },
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
          <div className="rounded-2xl border border-border bg-white p-6 w-full">
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Skill Match</span>
                <span className="text-sm text-foreground">
                  {matchingSkills.length} out of {totalToggledSkills}
                </span>
              </div>
              <div className="h-2 w-full bg-[#F7F9FF] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#1F2144] rounded-full" 
                  style={{ width: `${skillMatchPercentage}%` }} 
                />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};