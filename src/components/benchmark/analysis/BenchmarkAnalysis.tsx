import { useSkillsMatrixStore } from "../skills-matrix/SkillsMatrixState";
import { useCompetencyStateReader } from "../../skills/competency/CompetencyStateReader";
import { BenchmarkAnalysisCard } from "./BenchmarkAnalysisCard";
import { roleSkills } from "../../skills/data/roleSkills";
import { useToggledSkills } from "../../skills/context/ToggledSkillsContext";
import { getEmployeeSkills } from "../skills-matrix/initialSkills";

interface BenchmarkAnalysisProps {
  selectedRole: string;
  roleLevel: string;
  employeeId: string;
}

export const BenchmarkAnalysis = ({ selectedRole, roleLevel, employeeId }: BenchmarkAnalysisProps) => {
  const { currentStates } = useSkillsMatrixStore();
  const { getSkillCompetencyState } = useCompetencyStateReader();
  const { toggledSkills } = useToggledSkills();
  
  console.log('BenchmarkAnalysis - Selected Role Analysis:', {
    selectedRole,
    roleLevel,
    employeeId,
    currentStates,
    toggledSkills: Array.from(toggledSkills)
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

  // Get all required skills for the role (not just toggled ones)
  const allRoleSkills = [
    ...currentRoleSkills.specialized,
    ...currentRoleSkills.common,
    ...currentRoleSkills.certifications
  ];

  // Get required skills based on competency states
  const requiredRoleSkills = allRoleSkills.filter(skill => {
    const competencyState = getSkillCompetencyState(skill.title, roleLevel.toLowerCase());
    return competencyState?.required === 'required';
  });

  const totalRequiredSkills = requiredRoleSkills.length;

  console.log('Role skills analysis:', {
    totalSkills: allRoleSkills.length,
    requiredSkills: totalRequiredSkills,
    toggledSkills: toggledSkills.size
  });

  // Skill Match calculation based on required skills
  const matchingSkills = requiredRoleSkills.filter(roleSkill => {
    const employeeSkill = employeeSkills.find(empSkill => empSkill.title === roleSkill.title);
    return employeeSkill !== undefined;
  });

  // Competency Match calculation for required skills
  const competencyMatchingSkills = matchingSkills.filter(skill => {
    const roleSkillState = getSkillCompetencyState(skill.title, roleLevel.toLowerCase());
    if (!roleSkillState) return false;

    const employeeSkillLevel = currentStates[skill.title]?.level || skill.level || 'unspecified';
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

    return employeePriority >= rolePriority;
  });

  // Skill Goal Match calculation for required skills
  const skillGoalMatchingSkills = matchingSkills.filter(skill => {
    const skillState = currentStates[skill.title];
    if (!skillState) return false;
    return skillState.requirement === 'required' || 
           skillState.requirement === 'skill_goal';
  });

  console.log('Match calculations:', {
    skillMatches: matchingSkills.length,
    competencyMatches: competencyMatchingSkills.length,
    skillGoalMatches: skillGoalMatchingSkills.length,
    totalRequired: totalRequiredSkills
  });

  return (
    <BenchmarkAnalysisCard 
      skillMatch={{
        current: matchingSkills.length,
        total: totalRequiredSkills
      }}
      competencyMatch={{
        current: competencyMatchingSkills.length,
        total: totalRequiredSkills
      }}
      skillGoals={{
        current: skillGoalMatchingSkills.length,
        total: totalRequiredSkills
      }}
    />
  );
};