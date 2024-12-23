import { useSkillsMatrixStore } from "../skills-matrix/SkillsMatrixState";
import { useCompetencyStateReader } from "../../skills/competency/CompetencyStateReader";
import { BenchmarkAnalysisCard } from "./BenchmarkAnalysisCard";
import { roleSkills } from "../../skills/data/roleSkills";
import { useToggledSkills } from "../../skills/context/ToggledSkillsContext";
import { getEmployeeSkills } from "../skills-matrix/initialSkills";
import { useTrack } from "../../skills/context/TrackContext";
import { EmployeeSkillRequirement, RoleSkillState } from "../../../types/skillTypes";

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

  const processedSkills = allRoleSkills
    .filter(skill => toggledSkills.has(skill.title))
    .map(skill => {
      const employeeSkill = employeeSkills.find(empSkill => empSkill.title === skill.title);
      const roleSkillState = getSkillCompetencyState(skill.title, roleLevel.toLowerCase(), selectedRole);
      
      return {
        ...skill,
        roleLevel: roleSkillState?.level || 'unspecified',
        employeeLevel: currentStates[skill.title]?.level || employeeSkill?.level || 'unspecified',
        requirement: currentStates[skill.title]?.requirement || 'unknown'
      };
    });

  const totalToggledSkills = processedSkills.length;

  // Basic skill match - employee has the skill regardless of level
  const matchingSkills = processedSkills.filter(skill => {
    const employeeSkill = employeeSkills.find(empSkill => empSkill.title === skill.title);
    const roleState = getSkillCompetencyState(skill.title, roleLevel.toLowerCase(), selectedRole);
    return employeeSkill !== undefined && roleState !== undefined;
  });

  // Competency match - employee has the skill at required level or higher
  const competencyMatchingSkills = matchingSkills.filter(skill => {
    const roleSkillState = getSkillCompetencyState(skill.title, roleLevel.toLowerCase(), selectedRole);
    if (!roleSkillState) return false;

    const employeeSkillLevel = currentStates[skill.title]?.level || 'unspecified';
    const roleSkillLevel = roleSkillState.level;

    console.log('Comparing competency levels:', {
      skill: skill.title,
      employeeLevel: employeeSkillLevel,
      roleLevel: roleSkillLevel
    });

    const employeePriority = getLevelPriority(employeeSkillLevel);
    const rolePriority = getLevelPriority(roleSkillLevel);

    return employeePriority >= rolePriority;
  });

  // Skill goal match - employee has marked required skills as skill goals
  const skillGoalMatchingSkills = matchingSkills.filter(skill => {
    const roleSkillState = getSkillCompetencyState(skill.title, roleLevel.toLowerCase(), selectedRole);
    if (!roleSkillState) return false;

    const employeeRequirement = currentStates[skill.title]?.requirement;
    return roleSkillState.requirement === 'required' && 
           employeeRequirement === 'skill_goal';
  });

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