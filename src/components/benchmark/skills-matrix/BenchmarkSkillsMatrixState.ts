import { Set } from 'typescript';

interface FilteredSkillsParams {
  employeeSkills: any[];
  toggledSkills: Set<string>;
  selectedLevel: string;
  selectedInterest: string;
  selectedSkillLevel: string;
  searchTerm: string;
  selectedSearchSkills: string[];
  currentStates: Record<string, any>;
  getSkillCompetencyState: (skillTitle: string, level: string) => any;
  roleLevel: string;
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

const getRequirementPriority = (required: string = 'preferred') => {
  const priorities: { [key: string]: number } = {
    'required': 0,
    'preferred': 1
  };
  return priorities[required.toLowerCase()] ?? 1;
};

const getSkillGoalPriority = (requirement: string = 'unknown') => {
  const priorities: { [key: string]: number } = {
    'skill_goal': 0,
    'required': 0,
    'preferred': 1,
    'not_interested': 2,
    'unknown': 3
  };
  return priorities[requirement.toLowerCase()] ?? 3;
};

export const BenchmarkSkillsMatrixState = {
  getFilteredSkills: ({
    employeeSkills,
    toggledSkills,
    selectedLevel,
    selectedInterest,
    selectedSkillLevel,
    searchTerm,
    selectedSearchSkills,
    currentStates,
    getSkillCompetencyState,
    roleLevel
  }: FilteredSkillsParams) => {
    console.log('Filtering skills with params:', {
      selectedLevel,
      selectedInterest,
      selectedSkillLevel,
      searchTerm,
      selectedSearchSkills
    });

    return employeeSkills
      .filter(skill => {
        if (!toggledSkills.has(skill.title)) return false;

        let matchesLevel = true;
        let matchesInterest = true;
        let matchesSearch = true;
        let matchesSkillLevel = true;

        const competencyState = getSkillCompetencyState(skill.title, roleLevel.toLowerCase());
        console.log('Competency state for skill:', skill.title, competencyState);
        
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

        if (selectedSearchSkills.length > 0) {
          matchesSearch = selectedSearchSkills.some(term => 
            skill.title.toLowerCase().includes(term.toLowerCase())
          );
        } else if (searchTerm) {
          matchesSearch = skill.title.toLowerCase().includes(searchTerm.toLowerCase());
        }

        return matchesLevel && matchesInterest && matchesSearch && matchesSkillLevel;
      })
      .map(skill => ({
        ...skill,
        employeeLevel: currentStates[skill.title]?.level || skill.level || 'unspecified',
        roleLevel: getSkillCompetencyState(skill.title, roleLevel.toLowerCase())?.level || 'unspecified',
        requirement: currentStates[skill.title]?.requirement || skill.requirement || 'unknown'
      }))
      .sort((a, b) => {
        const aRoleLevel = a.roleLevel;
        const bRoleLevel = b.roleLevel;
        
        const roleLevelDiff = getLevelPriority(aRoleLevel) - getLevelPriority(bRoleLevel);
        if (roleLevelDiff !== 0) return roleLevelDiff;

        const employeeLevelDiff = getLevelPriority(a.employeeLevel) - getLevelPriority(b.employeeLevel);
        if (employeeLevelDiff !== 0) return employeeLevelDiff;

        const requirementDiff = getSkillGoalPriority(a.requirement) - getSkillGoalPriority(b.requirement);
        if (requirementDiff !== 0) return requirementDiff;

        return a.title.localeCompare(b.title);
      });
  }
};