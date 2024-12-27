import { UnifiedSkill } from "../../skills/types/SkillTypes";
import { useCompetencyStateReader } from "../../skills/competency/CompetencyStateReader";

const getLevelValue = (level: string): number => {
  switch (level?.toLowerCase()) {
    case 'advanced': return 3;
    case 'intermediate': return 2;
    case 'beginner': return 1;
    case 'unspecified': return 0;
    default: return 0;
  }
};

export const calculateMatchingSkills = (
  toggledRoleSkills: UnifiedSkill[],
  employeeSkills: UnifiedSkill[],
  comparisonLevel: string,
  selectedRole: string,
  track: string,
  getSkillState: any,
  employeeId: string
) => {
  const { getSkillCompetencyState } = useCompetencyStateReader();
  const matchingSkills: UnifiedSkill[] = [];
  const competencyMatchingSkills: UnifiedSkill[] = [];
  const skillGoalMatchingSkills: UnifiedSkill[] = [];

  toggledRoleSkills.forEach(roleSkill => {
    const employeeSkill = employeeSkills.find(empSkill => empSkill.title === roleSkill.title);
    const competencyState = getSkillCompetencyState(roleSkill.title, comparisonLevel, selectedRole);
    const skillState = getSkillState(roleSkill.title, employeeId);

    // Check if skill exists in employee skills
    if (employeeSkill) {
      matchingSkills.push(roleSkill);
    }

    // Check competency match
    const employeeLevel = skillState?.level || 'unspecified';
    const roleLevel = competencyState?.level || 'unspecified';

    console.log('Comparing competency levels:', {
      skill: roleSkill.title,
      employeeLevel,
      roleLevel
    });

    // If role level is unspecified, any employee level is a match
    // OR if employee level is equal/higher than role level
    if (roleLevel === 'unspecified' || 
        getLevelValue(employeeLevel) >= getLevelValue(roleLevel)) {
      competencyMatchingSkills.push(roleSkill);
    }

    // Check skill goal match
    const goalStatus = skillState?.goalStatus || 'unknown';
    if (goalStatus === 'skill_goal' || goalStatus === 'required') {
      skillGoalMatchingSkills.push(roleSkill);
    }
  });

  return {
    matchingSkills,
    competencyMatchingSkills,
    skillGoalMatchingSkills,
    totalToggledSkills: toggledRoleSkills.length
  };
};