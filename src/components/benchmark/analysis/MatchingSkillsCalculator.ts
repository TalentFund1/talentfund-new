import { UnifiedSkill } from "../../skills/types/SkillTypes";
import { EmployeeSkillState } from "../../employee/types/employeeSkillTypes";
import { SkillCompetencyState } from "../../skills/competency/types/competencyTypes";
import { getCompetencyMatches } from "../utils/competencyMatching";

interface MatchingSkillsResult {
  matchingSkills: UnifiedSkill[];
  competencyMatchingSkills: UnifiedSkill[];
  skillGoalMatchingSkills: UnifiedSkill[];
  totalToggledSkills: number;
}

export const calculateMatchingSkills = (
  toggledRoleSkills: UnifiedSkill[],
  employeeSkills: UnifiedSkill[],
  comparisonLevel: string,
  selectedRole: string,
  track: string,
  getSkillState: (skillTitle: string, employeeId: string) => EmployeeSkillState,
  employeeId: string,
  getSkillCompetencyState: (skillTitle: string, levelKey: string, roleId: string) => SkillCompetencyState
): MatchingSkillsResult => {
  console.log('Calculating matching skills:', {
    toggledSkillCount: toggledRoleSkills.length,
    employeeSkillCount: employeeSkills.length,
    comparisonLevel,
    selectedRole,
    track
  });

  // Basic skill matches - employee has the skill
  const matchingSkills = toggledRoleSkills.filter(skill => {
    return employeeSkills.some(empSkill => empSkill.title === skill.title);
  });

  // Competency matches using the new centralized logic
  const competencyMatchingSkills = getCompetencyMatches(
    toggledRoleSkills,
    getSkillState,
    getSkillCompetencyState,
    employeeId,
    comparisonLevel,
    selectedRole
  );

  // Skill goal matches
  const skillGoalMatchingSkills = toggledRoleSkills.filter(skill => {
    const skillState = getSkillState(skill.title, employeeId);
    return skillState?.goalStatus === 'skill_goal' || skillState?.goalStatus === 'required';
  });

  console.log('Final matching calculations:', {
    totalSkills: toggledRoleSkills.length,
    matchingSkills: matchingSkills.length,
    competencyMatches: competencyMatchingSkills.length,
    skillGoalMatches: skillGoalMatchingSkills.length,
    competencyMatchingSkills: competencyMatchingSkills.map(s => s.title)
  });

  return {
    matchingSkills,
    competencyMatchingSkills,
    skillGoalMatchingSkills,
    totalToggledSkills: toggledRoleSkills.length
  };
};