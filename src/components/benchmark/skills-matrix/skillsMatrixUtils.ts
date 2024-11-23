import { useSkillsMatrixStore } from "./SkillsMatrixState";
import { useCompetencyStateReader } from "../../skills/competency/CompetencyStateReader";

export const getLevelPriority = (level: string = 'unspecified') => {
  const priorities: { [key: string]: number } = {
    'advanced': 0,
    'intermediate': 1,
    'beginner': 2,
    'unspecified': 3
  };
  return priorities[level.toLowerCase()] ?? 3;
};

export const getRequirementPriority = (required: string = 'preferred') => {
  const priorities: { [key: string]: number } = {
    'required': 0,
    'preferred': 1
  };
  return priorities[required.toLowerCase()] ?? 1;
};

export const getSkillGoalPriority = (requirement: string = 'unknown') => {
  const priorities: { [key: string]: number } = {
    'skill_goal': 0,
    'required': 0,
    'preferred': 1,
    'not_interested': 2,
    'unknown': 3
  };
  return priorities[requirement.toLowerCase()] ?? 3;
};

export const filterAndSortSkills = (
  skills: any[],
  toggledSkills: Set<string>,
  selectedLevel: string,
  selectedInterest: string,
  selectedSkillLevel: string,
  currentStates: any,
  getSkillCompetencyState: any,
  roleLevel: string
) => {
  console.log('Filtering skills with params:', {
    skillsCount: skills.length,
    toggledSkillsCount: toggledSkills.size,
    selectedLevel,
    selectedInterest,
    selectedSkillLevel,
    roleLevel
  });

  return skills
    .filter(skill => {
      // Always include the skill regardless of toggledSkills state
      let matchesLevel = true;
      let matchesInterest = true;
      let matchesSkillLevel = true;

      const competencyState = getSkillCompetencyState(skill.title, roleLevel.toLowerCase());
      const roleSkillLevel = competencyState?.level || 'unspecified';

      if (selectedLevel !== 'all') {
        matchesLevel = roleSkillLevel.toLowerCase() === selectedLevel.toLowerCase();
      }

      const currentSkillState = currentStates[skill.title];
      const skillLevel = (currentSkillState?.level || skill.level || 'unspecified').toLowerCase();
      
      if (selectedSkillLevel !== 'all') {
        matchesSkillLevel = skillLevel === selectedSkillLevel.toLowerCase();
      }

      const requirement = (currentSkillState?.requirement || skill.requirement || 'unknown').toLowerCase();

      if (selectedInterest !== 'all') {
        switch (selectedInterest.toLowerCase()) {
          case 'skill_goal':
            matchesInterest = requirement === 'required' || requirement === 'skill_goal';
            break;
          case 'not_interested':
            matchesInterest = requirement === 'not_interested';
            break;
          case 'unknown':
            matchesInterest = !requirement || requirement === 'unknown';
            break;
          default:
            matchesInterest = requirement === selectedInterest.toLowerCase();
        }
      }

      return matchesLevel && matchesInterest && matchesSkillLevel;
    })
    .sort((a, b) => {
      const aCompetencyState = getSkillCompetencyState(a.title, roleLevel.toLowerCase());
      const bCompetencyState = getSkillCompetencyState(b.title, roleLevel.toLowerCase());
      
      const aRoleLevel = aCompetencyState?.level || 'unspecified';
      const bRoleLevel = bCompetencyState?.level || 'unspecified';
      
      const roleLevelDiff = getLevelPriority(aRoleLevel) - getLevelPriority(bRoleLevel);
      if (roleLevelDiff !== 0) return roleLevelDiff;

      const aRequired = aCompetencyState?.required || 'preferred';
      const bRequired = bCompetencyState?.required || 'preferred';
      
      const requirementDiff = getRequirementPriority(aRequired) - getRequirementPriority(bRequired);
      if (requirementDiff !== 0) return requirementDiff;

      const aState = currentStates[a.title];
      const bState = currentStates[b.title];
      
      const aEmployeeLevel = (aState?.level || a.level || 'unspecified').toLowerCase();
      const bEmployeeLevel = (bState?.level || b.level || 'unspecified').toLowerCase();
      
      const employeeLevelDiff = getLevelPriority(aEmployeeLevel) - getLevelPriority(bEmployeeLevel);
      if (employeeLevelDiff !== 0) return employeeLevelDiff;

      const aSkillGoal = (aState?.requirement || a.requirement || 'unknown').toLowerCase();
      const bSkillGoal = (bState?.requirement || b.requirement || 'unknown').toLowerCase();
      
      const skillGoalDiff = getSkillGoalPriority(aSkillGoal) - getSkillGoalPriority(bSkillGoal);
      if (skillGoalDiff !== 0) return skillGoalDiff;

      return a.title.localeCompare(b.title);
    });
};