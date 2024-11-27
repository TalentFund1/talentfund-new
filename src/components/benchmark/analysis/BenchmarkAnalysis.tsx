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
  
  console.log('BenchmarkAnalysis - Starting calculation:', {
    selectedRole,
    roleLevel,
    employeeId,
    toggledSkillsCount: toggledSkills.size
  });

  // Get employee skills but only use them for comparison with selected role
  const employeeSkills = getEmployeeSkills(employeeId);
  
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

  // Filter to only include toggled skills
  const toggledRoleSkills = allRoleSkills.filter(skill => toggledSkills.has(skill.title));
  const totalToggledSkills = toggledRoleSkills.length;

  if (totalToggledSkills === 0) {
    console.log('No toggled skills found, showing empty state');
    return (
      <BenchmarkAnalysisCard 
        skillMatch={{ current: 0, total: 0 }}
        competencyMatch={{ current: 0, total: 0 }}
        skillGoals={{ current: 0, total: 0 }}
      />
    );
  }

  console.log('Analyzing toggled skills:', {
    total: totalToggledSkills,
    skills: toggledRoleSkills.map(s => s.title)
  });

  // 1. Basic Skill Match - only count toggled skills
  const matchingSkills = toggledRoleSkills.filter(roleSkill => {
    const employeeSkill = employeeSkills.find(empSkill => empSkill.title === roleSkill.title);
    return employeeSkill !== undefined;
  });

  // 2. Competency Match - check levels for matched skills
  const competencyMatchingSkills = matchingSkills.filter(skill => {
    const roleSkillState = getSkillCompetencyState(skill.title, roleLevel.toLowerCase());
    if (!roleSkillState) return false;

    const employeeSkillLevel = currentStates[skill.title]?.level || skill.level || 'unspecified';
    const roleSkillLevel = roleSkillState.level;

    console.log('Comparing skill levels:', {
      skill: skill.title,
      employeeLevel: employeeSkillLevel,
      roleLevel: roleSkillLevel
    });

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

  // 3. Skill Goal Match - check requirements for matched skills
  const skillGoalMatchingSkills = matchingSkills.filter(skill => {
    const skillState = currentStates[skill.title];
    if (!skillState) return false;
    return skillState.requirement === 'required' || 
           skillState.requirement === 'skill_goal';
  });

  console.log('Benchmark calculation results:', {
    totalSkills: totalToggledSkills,
    matchingSkills: matchingSkills.length,
    competencyMatches: competencyMatchingSkills.length,
    skillGoalMatches: skillGoalMatchingSkills.length
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