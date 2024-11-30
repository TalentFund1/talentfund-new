import { useSkillsMatrixStore } from "./SkillsMatrixState";
import { useCompetencyStateReader } from "../../skills/competency/CompetencyStateReader";
import { getEmployeeSkills } from "./initialSkills";
import { roleSkills } from "../../skills/data/roleSkills";
import { filterSkillsByCategory } from "../skills-matrix/skillCategories";

export const useSkillsFiltering = (
  employeeId: string,
  selectedRole: string,
  comparisonLevel: string,
  selectedLevel: string,
  selectedInterest: string,
  selectedSkillLevel: string,
  searchTerm: string,
  toggledSkills: Set<string>
) => {
  const { currentStates } = useSkillsMatrixStore();
  const { getSkillCompetencyState } = useCompetencyStateReader();
  const employeeSkills = getEmployeeSkills(employeeId);

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
    const currentRoleSkills = roleSkills[selectedRole as keyof typeof roleSkills] || roleSkills["123"];
    
    return filterSkillsByCategory(employeeSkills, "all")
      .filter(skill => {
        // Only show skills that are in both employee skills and toggled skills
        const isToggled = toggledSkills.has(skill.title);
        const hasSkill = employeeSkills.some(empSkill => empSkill.title === skill.title);
        
        if (!isToggled || !hasSkill) return false;

        let matchesLevel = true;
        let matchesInterest = true;
        let matchesSearch = true;
        let matchesSkillLevel = true;

        const competencyState = getSkillCompetencyState(skill.title, comparisonLevel);
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
      })
      .map(skill => ({
        ...skill,
        employeeLevel: currentStates[skill.title]?.level || skill.level || 'unspecified',
        roleLevel: getSkillCompetencyState(skill.title, comparisonLevel)?.level || 'unspecified',
        requirement: currentStates[skill.title]?.requirement || skill.requirement || 'unknown'
      }))
      .sort((a, b) => {
        const aRoleLevel = a.roleLevel;
        const bRoleLevel = b.roleLevel;
        
        const roleLevelDiff = getLevelPriority(aRoleLevel) - getLevelPriority(bRoleLevel);
        if (roleLevelDiff !== 0) return roleLevelDiff;

        const employeeLevelDiff = getLevelPriority(a.employeeLevel) - getLevelPriority(b.employeeLevel);
        if (employeeLevelDiff !== 0) return employeeLevelDiff;

        return a.title.localeCompare(b.title);
      });
  };

  console.log('Filtered skills:', {
    employeeId,
    selectedRole,
    comparisonLevel,
    filteredCount: filterSkills().length
  });

  return { filteredSkills: filterSkills() };
};