import { useEmployeeStore } from "../../employee/store/employeeStore";
import { getEmployeeSkills } from "./initialSkills";
import { roleSkills } from "../../skills/data/roleSkills";
import { getSkillCategory } from "../../skills/data/skills/categories/skillCategories";
import { EmployeeSkillRequirement, UnifiedSkill } from "../../../types/skillTypes";
import { useCompetencyStateReader } from "../../skills/competency/CompetencyStateReader";

const normalizeRequirement = (requirement: string): EmployeeSkillRequirement => {
  switch (requirement?.toLowerCase()) {
    case 'required':
      return 'skill_goal';
    case 'not-interested':
      return 'not_interested';
    case 'unknown':
      return 'unknown';
    default:
      return 'unknown';
  }
};

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
      selectedLevel,
      selectedInterest,
      selectedSkillLevel,
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

      const employeeSkillState = getSkillState(employeeId, skill.title);
      console.log('Checking skill state:', {
        skill: skill.title,
        employeeState: employeeSkillState,
        selectedSkillLevel
      });

      // Filter by employee skill level if selected
      if (selectedSkillLevel !== 'all') {
        const skillLevel = employeeSkillState?.level?.toLowerCase() || 'unspecified';
        matchesSkillLevel = skillLevel === selectedSkillLevel.toLowerCase();
        console.log('Skill level matching:', {
          skill: skill.title,
          skillLevel,
          selectedSkillLevel,
          matches: matchesSkillLevel
        });
      }

      // Filter by requirement/interest if selected
      if (selectedInterest !== 'all') {
        const normalizedRequirement = normalizeRequirement(employeeSkillState?.requirement || 'unknown');
        matchesRequirement = normalizedRequirement === selectedInterest;
        
        console.log('Requirement matching:', {
          skill: skill.title,
          originalRequirement: employeeSkillState?.requirement,
          normalizedRequirement,
          selectedRequirement: selectedInterest,
          matches: matchesRequirement
        });
      }

      // Search term filtering
      if (searchTerm) {
        matchesSearch = skill.title.toLowerCase().includes(searchTerm.toLowerCase());
      }

      const matches = matchesLevel && matchesSearch && matchesSkillLevel && matchesRequirement;
      
      if (!matches) {
        console.log('Skill filtered out:', {
          skillName: skill.title,
          matchesLevel,
          matchesSearch,
          matchesSkillLevel,
          matchesRequirement
        });
      }

      return matches;
    })
    .map(skill => ({
      ...skill,
      employeeLevel: getSkillState(employeeId, skill.title)?.level || 'unspecified',
      requirement: normalizeRequirement(getSkillState(employeeId, skill.title)?.requirement || 'unknown')
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
      selectedSkillLevel,
      searchTerm,
      isRoleBenchmark,
      selectedInterest
    }
  });

  return { filteredSkills };
};