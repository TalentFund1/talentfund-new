import { useSkillsMatrixStore } from "./SkillsMatrixState";
import { useCompetencyStateReader } from "../../skills/competency/CompetencyStateReader";
import { getEmployeeSkills } from "./initialSkills";
import { roleSkills } from "../../skills/data/roleSkills";
import { getSkillCategory } from "../../skills/data/skills/categories/skillCategories";
import { getCategoryForSkill } from "../../skills/utils/skillCountUtils";
import { EmployeeSkillRequirement } from "../../skills/types/SkillTypes";
import { useEmployeeStore } from "../../employee/store/employeeStore";

export const useSkillsFiltering = (
  employeeId: string,
  selectedRole: string,
  comparisonLevel: string,
  selectedLevel: string,
  selectedInterest: string,
  selectedSkillLevel: string,
  searchTerm: string,
  toggledSkills: Set<string>,
  isRoleBenchmark: boolean = false,
  selectedRoleRequirement: string = 'all'
) => {
  const { currentStates } = useSkillsMatrixStore();
  const { getSkillCompetencyState } = useCompetencyStateReader();
  const employeeSkills = getEmployeeSkills(employeeId);
  const currentRoleSkills = roleSkills[selectedRole as keyof typeof roleSkills];
  const { getSkillState } = useEmployeeStore();

  if (!currentRoleSkills && isRoleBenchmark) {
    console.warn('No role skills found for role:', selectedRole);
    return { filteredSkills: [] };
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

  const normalizeRequirement = (requirement: string): EmployeeSkillRequirement => {
    const normalized = requirement.toLowerCase().replace(/[-_\s]/g, '');
    
    // Map UI values to stored values - if we see 'skillgoal' in UI, match it with 'required' in storage
    if (normalized === 'skillgoal') return 'required';
    if (normalized === 'notinterested') return 'not_interested';
    return 'unknown';
  };

  const filterSkills = () => {
    let skills = [...employeeSkills];

    console.log('Starting skill filtering:', {
      employeeId,
      totalSkills: skills.length,
      selectedInterest,
      selectedRoleRequirement,
      currentStates: Object.keys(currentStates).length
    });

    // Remove duplicates based on normalized titles
    const uniqueSkills = new Map();
    skills.forEach(skill => {
      if (!uniqueSkills.has(skill.title)) {
        uniqueSkills.set(skill.title, skill);
      }
    });
    skills = Array.from(uniqueSkills.values());

    // If this is role benchmark view, filter by role skills
    if (isRoleBenchmark) {
      const roleSkillTitles = new Set([
        ...(currentRoleSkills.specialized || []).map(s => s.title),
        ...(currentRoleSkills.common || []).map(s => s.title),
        ...(currentRoleSkills.certifications || []).map(s => s.title)
      ]);
      skills = skills.filter(skill => roleSkillTitles.has(skill.title));
    }

    // Apply filters
    return skills.filter(skill => {
      let matchesLevel = true;
      let matchesSearch = true;
      let matchesSkillLevel = true;
      let matchesRequirement = true;

      const competencyState = getSkillCompetencyState(skill.title, comparisonLevel, selectedRole);
      const roleSkillLevel = competencyState?.level || 'unspecified';
      const employeeSkillState = getSkillState(employeeId, skill.title);

      if (selectedLevel !== 'all') {
        matchesLevel = roleSkillLevel.toLowerCase() === selectedLevel.toLowerCase();
      }

      const currentSkillState = currentStates[skill.title];
      const skillLevel = (currentSkillState?.level || skill.level || 'unspecified').toLowerCase();
      
      if (selectedSkillLevel !== 'all') {
        matchesSkillLevel = skillLevel === selectedSkillLevel.toLowerCase();
      }

      // Get the employee skill requirement and normalize it for comparison
      const employeeRequirement = employeeSkillState.requirement;
      const normalizedSelectedRequirement = normalizeRequirement(selectedInterest);

      if (selectedInterest !== 'all') {
        console.log('Checking requirement match:', {
          skillTitle: skill.title,
          employeeRequirement,
          selectedInterest,
          normalizedSelectedRequirement,
          matches: employeeRequirement === normalizedSelectedRequirement
        });

        // Direct comparison with employee requirement
        matchesRequirement = employeeRequirement === normalizedSelectedRequirement;
      }

      if (searchTerm) {
        matchesSearch = skill.title.toLowerCase().includes(searchTerm.toLowerCase());
      }

      const matches = matchesLevel && matchesSearch && matchesSkillLevel && matchesRequirement;
      
      if (!matches) {
        console.log('Skill filtered out:', {
          skillName: skill.title,
          employeeRequirement,
          selectedRequirement: normalizedSelectedRequirement,
          matchesRequirement,
          matchesLevel,
          matchesSearch,
          matchesSkillLevel
        });
      }

      return matches;
    })
    .map(skill => ({
      ...skill,
      employeeLevel: currentStates[skill.title]?.level || skill.level || 'unspecified',
      roleLevel: getSkillCompetencyState(skill.title, comparisonLevel, selectedRole)?.level || 'unspecified',
      requirement: getSkillState(employeeId, skill.title).requirement
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

  const filteredSkills = filterSkills();

  console.log('Skills filtering result:', {
    employeeId,
    totalSkills: employeeSkills.length,
    filteredSkills: filteredSkills.length,
    filters: {
      selectedLevel,
      selectedRoleRequirement,
      selectedSkillLevel,
      searchTerm,
      isRoleBenchmark,
      selectedInterest
    }
  });

  return { filteredSkills };
};
