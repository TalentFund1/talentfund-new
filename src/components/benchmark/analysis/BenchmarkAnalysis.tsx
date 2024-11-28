import { useSkillsMatrixStore } from "../skills-matrix/SkillsMatrixState";
import { useCompetencyStateReader } from "../../skills/competency/CompetencyStateReader";
import { BenchmarkAnalysisCard } from "./BenchmarkAnalysisCard";
import { roleSkills } from "../../skills/data/roleSkills";
import { useToggledSkills } from "../../skills/context/ToggledSkillsContext";
import { getEmployeeSkills } from "../skills-matrix/initialSkills";
import { useCompetencyStore } from "../../skills/competency/CompetencyState";

interface BenchmarkAnalysisProps {
  selectedRole: string;
  roleLevel: string;
  employeeId: string;
}

export const BenchmarkAnalysis = ({ selectedRole, roleLevel, employeeId }: BenchmarkAnalysisProps) => {
  const { currentStates: matrixStates } = useSkillsMatrixStore();
  const { getSkillCompetencyState } = useCompetencyStateReader();
  const { toggledSkills } = useToggledSkills();
  const { currentStates: competencyStates } = useCompetencyStore();
  
  console.log('BenchmarkAnalysis - Selected Role Analysis:', {
    selectedRole,
    roleLevel,
    employeeId,
    competencyStates
  });

  // Get employee skills but only use them for comparison with selected role
  const employeeSkills = getEmployeeSkills(employeeId);
  console.log('Employee skills loaded for comparison:', employeeSkills);

  // Get skills for the selected role from dropdown
  const currentRoleSkills = roleSkills[selectedRole as keyof typeof roleSkills];
  if (!currentRoleSkills) {
    console.error('No role skills found for selected role:', selectedRole);
    return null;
  }

  // Get all toggled skills for the selected role (not employee's role)
  const allRoleSkills = [
    ...currentRoleSkills.specialized,
    ...currentRoleSkills.common,
    ...currentRoleSkills.certifications
  ];

  const toggledRoleSkills = allRoleSkills.filter(skill => toggledSkills.has(skill.title));
  const totalToggledSkills = toggledRoleSkills.length;

  console.log('Selected role toggled skills:', {
    roleId: selectedRole,
    total: totalToggledSkills,
    skills: toggledRoleSkills.map(s => s.title)
  });

  // Skill Match calculation based on competency states
  const matchingSkills = toggledRoleSkills.filter(roleSkill => {
    const employeeSkill = employeeSkills.find(empSkill => empSkill.title === roleSkill.title);
    const competencyState = competencyStates[selectedRole]?.[roleSkill.title];
    return employeeSkill !== undefined && competencyState !== undefined;
  });

  // Competency Match calculation using competency states
  const competencyMatchingSkills = matchingSkills.filter(skill => {
    const roleSkillState = getSkillCompetencyState(skill.title, roleLevel.toLowerCase(), selectedRole);
    if (!roleSkillState) return false;

    const employeeSkillLevel = matrixStates[skill.title]?.level || skill.level || 'unspecified';
    const roleSkillLevel = roleSkillState.level;

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

    return employeePriority === rolePriority || employeePriority > rolePriority;
  });

  // Skill Goal Match calculation using competency states
  const skillGoalMatchingSkills = matchingSkills.filter(skill => {
    const competencyState = competencyStates[selectedRole]?.[skill.title]?.[roleLevel.toLowerCase()];
    const skillState = matrixStates[skill.title];
    
    if (!competencyState || !skillState) return false;
    
    return skillState.requirement === 'required' || 
           skillState.requirement === 'skill_goal';
  });

  console.log('Selected role match calculations:', {
    roleId: selectedRole,
    skillMatches: matchingSkills.length,
    competencyMatches: competencyMatchingSkills.length,
    skillGoalMatches: skillGoalMatchingSkills.length,
    totalSkills: totalToggledSkills
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