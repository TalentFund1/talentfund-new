import { useSkillsMatrixStore } from "./SkillsMatrixState";
import { useCompetencyStateReader } from "../../skills/competency/CompetencyStateReader";
import { getEmployeeSkills } from "./initialSkills";
import { roleSkills } from "../../skills/data/roleSkills";
import { getSkillCategory } from "../../skills/data/skills/categories/skillCategories";
import { getCategoryForSkill } from "../../skills/utils/skillCountUtils";
import { normalizeSkillTitle } from "../../skills/utils/normalization";

export const useSkillsFiltering = (
  employeeId: string,
  selectedRole: string,
  comparisonLevel: string,
  selectedLevel: string,
  selectedInterest: string,
  selectedSkillLevel: string,
  searchTerm: string,
  toggledSkills: Set<string>,
  isRoleBenchmark: boolean = false
) => {
  const { currentStates } = useSkillsMatrixStore();
  const { getSkillCompetencyState } = useCompetencyStateReader();
  
  // Get only the employee's assigned skills
  const employeeSkills = getEmployeeSkills(employeeId);

  console.log('Initial employee skills for filtering:', {
    employeeId,
    skillCount: employeeSkills.length,
    skills: employeeSkills.map(s => ({
      title: s.title,
      level: s.level,
      requirement: s.requirement
    }))
  });

  const getLevelPriority = (level: string = 'unspecified') => {
    const priorities: { [key: string]: number } = {
      'advanced': 0,
      'intermediate': 1,
      'beginner': 2,
      'unspecified': 3
    };
    return priorities[level.toLowerCase()] ?? 3;
  };

  const filterSkills = () => {
    // Start with only the employee's assigned skills
    let skills = [...employeeSkills];

    console.log('Filtering skills for employee:', {
      employeeId,
      totalSkills: skills.length,
      skills: skills.map(s => ({
        title: s.title,
        level: s.level,
        requirement: s.requirement
      }))
    });

    // Only apply filters if they are actually set
    if (selectedLevel !== 'all' || selectedInterest !== 'all' || 
        selectedSkillLevel !== 'all' || searchTerm) {
      skills = skills.filter(skill => {
        let matchesLevel = true;
        let matchesInterest = true;
        let matchesSearch = true;
        let matchesSkillLevel = true;

        const competencyState = isRoleBenchmark ? 
          getSkillCompetencyState(skill.title, comparisonLevel, selectedRole) :
          { level: skill.level, required: skill.requirement };

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

        if (searchTerm) {
          matchesSearch = skill.title.toLowerCase().includes(searchTerm.toLowerCase());
        }

        return matchesLevel && matchesInterest && matchesSearch && matchesSkillLevel;
      });
    }

    console.log('Filtered skills result:', {
      total: skills.length,
      filters: {
        selectedLevel,
        selectedInterest,
        selectedSkillLevel,
        searchTerm,
        isRoleBenchmark
      }
    });

    return skills
      .map(skill => ({
        ...skill,
        employeeLevel: currentStates[skill.title]?.level || skill.level || 'unspecified',
        roleLevel: isRoleBenchmark ? 
          getSkillCompetencyState(skill.title, comparisonLevel, selectedRole)?.level || 'unspecified' :
          skill.level || 'unspecified',
        requirement: currentStates[skill.title]?.requirement || skill.requirement || 'unknown',
        isToggled: toggledSkills.has(skill.title)
      }))
      .sort((a, b) => {
        // First sort by toggled status
        if (a.isToggled !== b.isToggled) {
          return a.isToggled ? -1 : 1;
        }

        // Then by role level
        const aRoleLevel = a.roleLevel;
        const bRoleLevel = b.roleLevel;
        
        const roleLevelDiff = getLevelPriority(aRoleLevel) - getLevelPriority(bRoleLevel);
        if (roleLevelDiff !== 0) return roleLevelDiff;

        // Then by employee level
        const employeeLevelDiff = getLevelPriority(a.employeeLevel) - getLevelPriority(b.employeeLevel);
        if (employeeLevelDiff !== 0) return employeeLevelDiff;

        // Finally alphabetically
        return a.title.localeCompare(b.title);
      });
  };

  const filteredSkills = filterSkills();

  console.log('Final skills filtering result:', {
    employeeId,
    totalSkills: employeeSkills.length,
    filteredSkills: filteredSkills.length,
    toggledSkills: Array.from(toggledSkills),
    filters: {
      selectedLevel,
      selectedInterest,
      selectedSkillLevel,
      searchTerm,
      isRoleBenchmark
    }
  });

  return { filteredSkills };
};