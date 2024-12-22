import { useEmployeeStore } from "../../employee/store/employeeStore";
import { getEmployeeSkills } from "./initialSkills";
import { roleSkills } from "../../skills/data/roleSkills";
import { getUnifiedSkillData } from "../../skills/data/skillDatabaseService";
import { EmployeeSkillRequirement, UnifiedSkill } from "../../../types/skillTypes";

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

    // Filter by category if selected
    if (selectedLevel !== 'all') {
      skills = skills.filter(skill => {
        const skillData = getUnifiedSkillData(skill.title);
        console.log('Filtering skill by category:', {
          skill: skill.title,
          category: skillData.category,
          selectedLevel,
          matches: skillData.category === selectedLevel
        });
        return skillData.category === selectedLevel;
      });
    }

    // Filter by interest/requirement if selected
    if (selectedInterest !== 'all') {
      skills = skills.filter(skill => {
        const employeeSkillState = getSkillState(employeeId, skill.title);
        if (!employeeSkillState) return false;
        return normalizeRequirement(employeeSkillState.requirement) === selectedInterest;
      });
    }

    // Filter by search term if provided
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      skills = skills.filter(skill => 
        skill.title.toLowerCase().includes(searchLower)
      );
    }

    console.log('Final filtered skills:', {
      totalFiltered: skills.length,
      skills: skills.map(s => ({
        title: s.title,
        category: getUnifiedSkillData(s.title).category,
        requirement: getSkillState(employeeId, s.title)?.requirement
      }))
    });

    return skills;
  };

  const filteredSkills = filterSkills();

  return { filteredSkills };
};