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
  const employeeSkills = getEmployeeSkills(employeeId);

  const currentRoleSkills = roleSkills[selectedRole as keyof typeof roleSkills];
  if (!currentRoleSkills) {
    console.error('No role skills found for role:', selectedRole);
    return null;
  }

  // Get all role skills that are toggled
  const allRoleSkills = [
    ...currentRoleSkills.specialized,
    ...currentRoleSkills.common,
    ...currentRoleSkills.certifications
  ];

  const toggledRoleSkills = allRoleSkills.filter(skill => toggledSkills.has(skill.title));
  const totalToggledSkills = toggledRoleSkills.length;

  console.log('Analyzing skills:', {
    totalRoleSkills: allRoleSkills.length,
    toggledSkills: toggledRoleSkills.length,
    employeeSkills: employeeSkills.length
  });

  // Skill Match calculation - match based on skill titles
  const matchingSkills = toggledRoleSkills.filter(roleSkill => {
    const employeeSkill = employeeSkills.find(empSkill => empSkill.title === roleSkill.title);
    console.log(`Checking skill match for ${roleSkill.title}:`, {
      hasMatch: !!employeeSkill,
      employeeSkill: employeeSkill?.title
    });
    return employeeSkill !== undefined;
  });

  // Competency Match calculation - match based on required skill levels
  const competencyMatchingSkills = matchingSkills.filter(skill => {
    const roleSkillState = getSkillCompetencyState(skill.title, roleLevel.toLowerCase());
    if (!roleSkillState) {
      console.log(`No competency state found for ${skill.title}`);
      return true; // If no competency state is found, consider it a match
    }

    const employeeSkillLevel = currentStates[skill.title]?.level || skill.level || 'unspecified';
    const roleSkillLevel = roleSkillState.level;
    const isRequired = roleSkillState.required === 'required';

    console.log(`Checking competency match for ${skill.title}:`, {
      employeeLevel: employeeSkillLevel,
      roleLevel: roleSkillLevel,
      required: roleSkillState.required,
      isRequired
    });

    // Only check level match if the skill is required
    if (!isRequired) {
      return true;
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

    const employeePriority = getLevelPriority(employeeSkillLevel);
    const rolePriority = getLevelPriority(roleSkillLevel);

    const isMatch = employeePriority >= rolePriority;
    console.log(`Competency match result for ${skill.title}:`, {
      employeePriority,
      rolePriority,
      isMatch
    });

    return isMatch;
  });

  // Skill Goal Match calculation - match based on skill goals and requirements
  const skillGoalMatchingSkills = matchingSkills.filter(skill => {
    const skillState = currentStates[skill.title];
    const roleSkillState = getSkillCompetencyState(skill.title, roleLevel.toLowerCase());
    
    if (!skillState) {
      console.log(`No skill state found for ${skill.title}`);
      return false;
    }

    // Consider it a match if either:
    // 1. The skill is marked as required/skill_goal by the employee
    // 2. The skill is required by the role and the employee has it
    const isEmployeeGoal = skillState.requirement === 'required' || 
                          skillState.requirement === 'skill_goal';
    const isRoleRequired = roleSkillState?.required === 'required';
    const isMatch = isEmployeeGoal || (isRoleRequired && skillState.level);

    console.log(`Checking skill goal match for ${skill.title}:`, {
      employeeRequirement: skillState.requirement,
      roleRequired: roleSkillState?.required,
      isEmployeeGoal,
      isRoleRequired,
      isMatch
    });

    return isMatch;
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