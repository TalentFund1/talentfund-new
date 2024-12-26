import { UnifiedSkill } from "../../skills/types/SkillTypes";
import { EmployeeSkillAchievement } from "../../employee/types/employeeSkillTypes";
import { benchmarkingService } from "../../../services/benchmarking";
import { SkillState } from "../../skills/competency/state/types";

interface MatchingSkillsResult {
  matchingSkills: UnifiedSkill[];
  competencyMatchingSkills: UnifiedSkill[];
  skillGoalMatchingSkills: UnifiedSkill[];
  totalToggledSkills: number;
}

export const calculateMatchingSkills = (
  toggledRoleSkills: UnifiedSkill[],
  employeeSkills: EmployeeSkillAchievement[],
  comparisonLevel: string,
  selectedRole: string,
  track: string,
  currentStates: Record<string, Record<string, SkillState>>,
  getSkillCompetencyState: (skillName: string, levelKey: string, roleId: string) => SkillState | undefined
): MatchingSkillsResult => {
  console.log('Calculating matching skills:', {
    toggledCount: toggledRoleSkills.length,
    employeeSkillsCount: employeeSkills.length,
    level: comparisonLevel,
    role: selectedRole,
    track
  });

  const matchingSkills = toggledRoleSkills.filter(roleSkill => {
    const employeeSkill = employeeSkills.find(empSkill => empSkill.title === roleSkill.title);
    return employeeSkill !== undefined;
  });

  const competencyMatchingSkills = matchingSkills.filter(skill => {
    const roleSkillState = getSkillCompetencyState(skill.title, comparisonLevel, selectedRole);
    if (!roleSkillState) return false;

    const employeeSkillLevel = currentStates[selectedRole]?.[skill.title]?.level || 
      employeeSkills.find(s => s.title === skill.title)?.level || 
      'unspecified';
    const roleSkillLevel = roleSkillState.level;

    console.log('Comparing skill levels:', {
      skill: skill.title,
      employeeLevel: employeeSkillLevel,
      roleLevel: roleSkillLevel
    });

    const comparison = benchmarkingService.compareSkillLevels(
      { title: skill.title, level: employeeSkillLevel },
      { title: skill.title, minimumLevel: roleSkillLevel }
    );

    return comparison.matchPercentage >= 100;
  });

  const skillGoalMatchingSkills = matchingSkills.filter(skill => {
    const skillState = currentStates[selectedRole]?.[skill.title];
    if (!skillState) return false;
    return skillState.required === 'required' || skillState.required === 'skill_goal';
  });

  return {
    matchingSkills,
    competencyMatchingSkills,
    skillGoalMatchingSkills,
    totalToggledSkills: toggledRoleSkills.length
  };
};