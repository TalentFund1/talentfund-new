import { useEmployeeStore } from "../../employee/store/employeeStore";
import { getEmployeeSkills } from "./initialSkills";
import { roleSkills } from "../../skills/data/roleSkills";
import { getSkillCategory } from "../../skills/data/skills/categories/skillCategories";
import { EmployeeSkillRequirement } from "../../skills/types/SkillTypes";
import { useCompetencyStateReader } from "../../skills/competency/CompetencyStateReader";

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
  const { getSkillState } = useEmployeeStore();
  const { getSkillCompetencyState } = useCompetencyStateReader();
  const employeeSkills = getEmployeeSkills(employeeId);
  const currentRoleSkills = roleSkills[selectedRole as keyof typeof roleSkills];

  if (!currentRoleSkills && isRoleBenchmark) {
    console.warn('No role skills found for role:', selectedRole);
    return { filteredSkills: [] };
  }

  const filterSkills = () => {
    let skills = [...employeeSkills];

    console.log('Starting skill filtering:', {
      employeeId,
      totalSkills: skills.length,
      selectedInterest,
      selectedRoleRequirement,
      currentFilters: {
        level: selectedLevel,
        interest: selectedInterest,
        skillLevel: selectedSkillLevel,
        searchTerm
      }
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

      const skillLevel = employeeSkillState.level.toLowerCase();
      
      if (selectedSkillLevel !== 'all') {
        matchesSkillLevel = skillLevel === selectedSkillLevel.toLowerCase();
      }

      if (selectedInterest !== 'all') {
        // Convert 'required' to 'skill_goal' for filtering
        const normalizedSelectedRequirement = selectedInterest === 'required' ? 'skill_goal' : selectedInterest as EmployeeSkillRequirement;
        matchesRequirement = employeeSkillState.requirement === normalizedSelectedRequirement;
        
        console.log('Requirement matching:', {
          skill: skill.title,
          employeeRequirement: employeeSkillState.requirement,
          selectedRequirement: normalizedSelectedRequirement,
          matches: matchesRequirement
        });
      }

      if (searchTerm) {
        matchesSearch = skill.title.toLowerCase().includes(searchTerm.toLowerCase());
      }

      const matches = matchesLevel && matchesSearch && matchesSkillLevel && matchesRequirement;
      
      if (!matches) {
        console.log('Skill filtered out:', {
          skillName: skill.title,
          employeeRequirement: employeeSkillState.requirement,
          selectedRequirement: selectedInterest,
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
      employeeLevel: getSkillState(employeeId, skill.title).level,
      roleLevel: getSkillCompetencyState(skill.title, comparisonLevel, selectedRole)?.level || 'unspecified',
      requirement: getSkillState(employeeId, skill.title).requirement
    }))
    .sort((a, b) => a.title.localeCompare(b.title));
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