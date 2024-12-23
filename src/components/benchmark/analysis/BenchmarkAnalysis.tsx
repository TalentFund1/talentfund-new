import { useSkillsMatrixStore } from "../skills-matrix/SkillsMatrixState";
import { useCompetencyStateReader } from "../../skills/competency/CompetencyStateReader";
import { BenchmarkAnalysisCard } from "./BenchmarkAnalysisCard";
import { roleSkills } from "../../skills/data/roleSkills";
import { useToggledSkills } from "../../skills/context/ToggledSkillsContext";
import { getEmployeeSkills } from "../skills-matrix/initialSkills";
import { useTrack } from "../../skills/context/TrackContext";
import { EmployeeSkillState, RoleSkillState } from "../../../types/skillTypes";

interface BenchmarkAnalysisProps {
  selectedRole: string;
  roleLevel: string;
  employeeId: string;
}

const getLevelPriority = (level: string = 'unspecified') => {
  const priorities: { [key: string]: number } = {
    'advanced': 3,
    'intermediate': 2,
    'beginner': 1,
    'unspecified': 0
  };
  return priorities[level.toLowerCase()] ?? 0;
};

export const BenchmarkAnalysis = ({ selectedRole, roleLevel, employeeId }: BenchmarkAnalysisProps) => {
  const { currentStates } = useSkillsMatrixStore();
  const { getSkillCompetencyState } = useCompetencyStateReader();
  const { toggledSkills } = useToggledSkills();
  const { getTrackForRole } = useTrack();
  
  console.log('BenchmarkAnalysis - Selected Role Analysis:', {
    selectedRole,
    roleLevel,
    employeeId,
    track: getTrackForRole(selectedRole),
    currentStates
  });

  const employeeSkills = getEmployeeSkills(employeeId);
  console.log('Employee skills loaded for comparison:', employeeSkills);

  const currentRoleSkills = roleSkills[selectedRole as keyof typeof roleSkills];
  if (!currentRoleSkills) {
    console.error('No role skills found for selected role:', selectedRole);
    return null;
  }

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
    const roleSkillState = getSkillCompetencyState(skill.title, roleLevel.toLowerCase(), selectedRole);
    if (!roleSkillState) return false;

    const employeeState = currentStates[skill.title] as EmployeeSkillState | undefined;
    if (!employeeState) return false;

    const employeeSkillLevel = employeeState.level || 'unspecified';
    const roleSkillLevel = roleSkillState.level || 'unspecified';

    const employeePriority = getLevelPriority(employeeSkillLevel);
    const rolePriority = getLevelPriority(roleSkillLevel);

    return employeePriority >= rolePriority;
  });

  const skillGoalMatchingSkills = matchingSkills.filter(skill => {
    const roleSkillState = getSkillCompetencyState(skill.title, roleLevel.toLowerCase(), selectedRole);
    if (!roleSkillState) return false;

    const employeeState = currentStates[skill.title] as EmployeeSkillState | undefined;
    if (!employeeState) return false;

    return roleSkillState.requirement === 'required' && employeeState.requirement === 'skill_goal';
  });

  const totalToggledSkills = toggledRoleSkills.length;

  console.log('Benchmark Analysis Calculation:', {
    totalToggled: totalToggledSkills,
    skillMatch: matchingSkills.length,
    competencyMatch: competencyMatchingSkills.length,
    skillGoalMatch: skillGoalMatchingSkills.length,
    matchingSkills: matchingSkills.map(s => s.title),
    competencyMatchingSkills: competencyMatchingSkills.map(s => s.title),
    skillGoalMatchingSkills: skillGoalMatchingSkills.map(s => s.title)
  });

  return (
    <BenchmarkAnalysisCard 
      skillMatch={{
        current: matchingSkills.length,
        total: totalToggledSkills
      }}
      competencyMatch={{
        current: competencyMatchingSkills.length,
        total: totalToggledSkills
      }}
      skillGoals={{
        current: skillGoalMatchingSkills.length,
        total: totalToggledSkills
      }}
    />
  );
};