import { useSkillsMatrixStore } from "./SkillsMatrixState";
import { useCompetencyStateReader } from "../../skills/competency/CompetencyStateReader";
import { getEmployeeSkills } from "./initialSkills";
import { roleSkills } from "../../skills/data/roleSkills";
import { getUnifiedSkillData } from "../../skills/data/skillDatabaseService";
import { EmployeeSkillAchievement } from "../../employee/types/employeeSkillTypes";
import { UnifiedSkill } from "../../skills/types/SkillTypes";

const getSkillLevel = (state: any): string => {
  if (typeof state === 'string') return state.toLowerCase();
  if (state && typeof state === 'object' && 'level' in state) return state.level.toLowerCase();
  return 'unspecified';
};

const getGoalStatus = (state: any): string => {
  if (typeof state === 'string') return state.toLowerCase();
  if (state && typeof state === 'object' && 'goalStatus' in state) return state.goalStatus.toLowerCase();
  return 'unknown';
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
  selectedCategory: string,
  selectedWeight: string,
  isRoleBenchmark: boolean = false
) => {
  const { currentStates } = useSkillsMatrixStore();
  const { getSkillCompetencyState } = useCompetencyStateReader();
  
  // Get employee's actual skills
  const employeeSkills = getEmployeeSkills(employeeId);

  console.log('Starting skills filtering with:', {
    employeeId,
    totalEmployeeSkills: employeeSkills.length,
    selectedCategory,
    selectedWeight,
    selectedLevel,
    selectedInterest,
    selectedSkillLevel,
    searchTerm,
    toggledSkills: Array.from(toggledSkills)
  });

  const filterSkills = () => {
    // Start with employee skills only
    let skills = [...employeeSkills];

    // Get role skills for comparison
    const roleData = roleSkills[selectedRole as keyof typeof roleSkills];
    if (!roleData) {
      console.warn('No role data found for:', selectedRole);
      return [];
    }

    const allRoleSkills = [
      ...roleData.specialized,
      ...roleData.common,
      ...roleData.certifications
    ];

    // Filter to only include skills that are both employee skills AND role skills
    skills = skills.filter(empSkill => {
      const isRoleSkill = allRoleSkills.some(roleSkill => roleSkill.title === empSkill.title);
      const isToggled = toggledSkills.has(empSkill.title);
      return isRoleSkill && isToggled;
    });

    console.log('After matching with role skills:', {
      employeeId,
      matchingSkillsCount: skills.length,
      matchingSkills: skills.map(s => s.title)
    });

    // Remove duplicates using a Map with skill titles as keys
    const uniqueSkills = new Map();
    skills.forEach(skill => {
      if (!uniqueSkills.has(skill.title)) {
        uniqueSkills.set(skill.title, skill);
      }
    });
    skills = Array.from(uniqueSkills.values());

    // Apply category filter
    if (selectedCategory !== 'all') {
      skills = skills.filter(skill => {
        const skillData = getUnifiedSkillData(skill.title);
        return skillData?.category === selectedCategory;
      });
    }

    // Apply weight filter
    if (selectedWeight !== 'all') {
      skills = skills.filter(skill => {
        const skillData = getUnifiedSkillData(skill.title);
        return skillData?.weight === selectedWeight.toLowerCase();
      });
    }

    // Apply level and interest filters
    return skills.filter(skill => {
      let matchesLevel = true;
      let matchesInterest = true;
      let matchesSearch = true;
      let matchesSkillLevel = true;

      const currentSkillState = currentStates[skill.title];
      const skillLevel = getSkillLevel(currentSkillState?.level || skill.level || 'unspecified');
      
      if (selectedSkillLevel !== 'all') {
        matchesSkillLevel = skillLevel === selectedSkillLevel.toLowerCase();
      }

      const goalStatus = getGoalStatus(currentSkillState?.goalStatus || skill.goalStatus || 'unknown');

      if (selectedInterest !== 'all') {
        switch (selectedInterest.toLowerCase()) {
          case 'skill_goal':
            matchesInterest = goalStatus === 'required' || goalStatus === 'skill_goal';
            break;
          case 'not_interested':
            matchesInterest = goalStatus === 'not_interested';
            break;
          case 'unknown':
            matchesInterest = !goalStatus || goalStatus === 'unknown';
            break;
          default:
            matchesInterest = goalStatus === selectedInterest.toLowerCase();
        }
      }

      if (searchTerm) {
        matchesSearch = skill.title.toLowerCase().includes(searchTerm.toLowerCase());
      }

      return matchesLevel && matchesInterest && matchesSearch && matchesSkillLevel;
    })
    .map(skill => {
      const unifiedData = getUnifiedSkillData(skill.title);
      const competencyState = getSkillCompetencyState(skill.title, comparisonLevel, selectedRole);
      
      return {
        ...skill,
        id: unifiedData.id,
        weight: unifiedData.weight,
        category: unifiedData.category,
        subcategory: unifiedData.subcategory,
        employeeLevel: currentStates[skill.title]?.level || skill.level || 'unspecified',
        roleLevel: competencyState?.level || 'unspecified',
        goalStatus: currentStates[skill.title]?.goalStatus || skill.goalStatus || 'unknown'
      };
    })
    .sort((a, b) => a.title.localeCompare(b.title));
  };

  const filteredSkills = filterSkills();

  console.log('Skills filtering result:', {
    employeeId,
    totalEmployeeSkills: employeeSkills.length,
    filteredSkills: filteredSkills.length,
    filteredSkillTitles: filteredSkills.map(s => s.title),
    filters: {
      selectedCategory,
      selectedWeight,
      selectedLevel,
      selectedInterest,
      selectedSkillLevel,
      searchTerm,
      isRoleBenchmark
    }
  });

  return { filteredSkills };
};
