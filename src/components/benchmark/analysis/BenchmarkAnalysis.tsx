import { useSkillsMatrixStore } from "../skills-matrix/SkillsMatrixState";
import { useCompetencyStateReader } from "../../skills/competency/CompetencyStateReader";
import { BenchmarkAnalysisCard } from "./BenchmarkAnalysisCard";
import { roleSkills } from "../../skills/data/roleSkills";
import { useToggledSkills } from "../../skills/context/ToggledSkillsContext";
import { getEmployeeSkills } from "../skills-matrix/initialSkills";
import { useTrack } from "../../skills/context/TrackContext";

interface BenchmarkAnalysisProps {
  selectedRole: string;
  roleLevel: string;
  employeeId: string;
}

const getLevelPriority = (level: string = 'unspecified') => {
  const priorities: { [key: string]: number } = {
    'advanced': 0,
    'intermediate': 1,
    'beginner': 2,
    'unspecified': 3
  };
  return priorities[level.toLowerCase()] ?? 3;
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
    .filter(skill => toggledSkills.has(skill.title));

  const matchingSkills = processedSkills.filter(roleSkill => {
    const employeeSkill = employeeSkills.find(empSkill => empSkill.title === roleSkill.title);
    return employeeSkill !== undefined;
  });

  const competencyMatchingSkills = matchingSkills.filter(skill => {
    const roleSkillState = getSkillCompetencyState(skill.title, roleLevel.toLowerCase(), selectedRole);
    if (!roleSkillState) return false;

    const employeeSkillLevel = currentStates[skill.title]?.level || skill.level || 'unspecified';
    const roleSkillLevel = roleSkillState.level;

    console.log('Comparing skill levels:', {
      skill: skill.title,
      employeeLevel: employeeSkillLevel,
      roleLevel: roleSkillLevel
    });

    const employeePriority = getLevelPriority(employeeSkillLevel);
    const rolePriority = getLevelPriority(roleSkillLevel);

    return employeePriority <= rolePriority;
  });

  const skillGoalMatchingSkills = matchingSkills.filter(skill => {
    const skillState = currentStates[skill.title];
    const roleSkillState = getSkillCompetencyState(skill.title, roleLevel.toLowerCase(), selectedRole);
    
    if (!skillState || !roleSkillState) return false;

    // Count as a skill goal match if:
    // 1. Employee has marked it as a skill_goal OR
    // 2. Role requires it (required) AND employee's current state matches or exceeds the requirement
    const isSkillGoal = skillState.requirement === 'skill_goal';
    const isRequiredAndMatching = roleSkillState.requirement === 'required' && 
                                 getLevelPriority(skillState.level) <= getLevelPriority(roleSkillState.level);

    console.log('Checking skill goal match:', {
      skill: skill.title,
      isSkillGoal,
      isRequiredAndMatching,
      employeeRequirement: skillState.requirement,
      roleRequirement: roleSkillState.requirement,
      employeeLevel: skillState.level,
      roleLevel: roleSkillState.level
    });

    return isSkillGoal || isRequiredAndMatching;
  });

  const totalToggledSkills = processedSkills.length;
  const matchingSkillsCount = matchingSkills.length;
  const competencyMatchCount = competencyMatchingSkills.length;
  const skillGoalMatchCount = skillGoalMatchingSkills.length;

  console.log('Selected role match calculations:', {
    roleId: selectedRole,
    skillMatches: matchingSkillsCount,
    competencyMatches: competencyMatchCount,
    skillGoalMatches: skillGoalMatchCount,
    totalSkills: totalToggledSkills
  });

  return (
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
  );
};