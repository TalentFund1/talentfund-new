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
import { BenchmarkAnalysisCard } from "./analysis/BenchmarkAnalysisCard";
import { EmployeeSkillState } from "@/types/skillTypes";

const getLevelPriority = (level: string = 'unspecified') => {
  const priorities: { [key: string]: number } = {
    'advanced': 3,
    'intermediate': 2,
    'beginner': 1,
    'unspecified': 0
  };
  return priorities[level.toLowerCase()] ?? 0;
};

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
    const roleSkillState = getSkillCompetencyState(skill.title, comparisonLevel, selectedRole);
    if (!roleSkillState) return false;

    const employeeState = currentStates[skill.title] as EmployeeSkillState;
    if (!employeeState) return false;

    const employeeSkillLevel = employeeState.level || 'unspecified';
    const roleSkillLevel = roleSkillState.level || 'unspecified';

    const employeePriority = getLevelPriority(employeeSkillLevel);
    const rolePriority = getLevelPriority(roleSkillLevel);

    return track === "Professional" 
      ? employeePriority === rolePriority 
      : employeePriority >= rolePriority;
  });

  const skillGoalMatchingSkills = matchingSkills.filter(skill => {
    const roleSkillState = getSkillCompetencyState(skill.title, comparisonLevel, selectedRole);
    if (!roleSkillState) return false;

    const employeeState = currentStates[skill.title] as EmployeeSkillState;
    if (!employeeState) return false;

    return roleSkillState.requirement === 'required' && employeeState.requirement === 'skill_goal';
  });

  const totalToggledSkills = toggledRoleSkills.length;
  const matchingSkillsCount = matchingSkills.length;
  const competencyMatchCount = competencyMatchingSkills.length;
  const skillGoalMatchCount = skillGoalMatchingSkills.length;

  console.log('Benchmark Analysis Results:', {
    totalToggled: totalToggledSkills,
    matching: matchingSkillsCount,
    competencyMatch: competencyMatchCount,
    skillGoalMatch: skillGoalMatchCount
  });

  return (
    <div className="space-y-6">
      <BenchmarkAnalysisCard
        skillMatch={{
          current: matchingSkillsCount,
          total: totalToggledSkills
        }}
        competencyMatch={{
          current: competencyMatchCount,
          total: totalToggledSkills
        }}
        skillGoals={{
          current: skillGoalMatchCount,
          total: totalToggledSkills
        }}
      />
    </div>
  );
};