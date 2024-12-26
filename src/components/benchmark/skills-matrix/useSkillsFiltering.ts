import { useSkillsMatrixStore } from "./SkillsMatrixState";
import { useCompetencyStateReader } from "../../skills/competency/CompetencyStateReader";
import { getEmployeeSkills } from "./initialSkills";
import { roleSkills } from "../../skills/data/roleSkills";
import { getUnifiedSkillData } from "../../skills/data/skillDatabaseService";
import { UnifiedSkill } from "../../skills/types/SkillTypes";

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
  const employeeSkills = getEmployeeSkills(employeeId);

  console.log('Starting skills filtering with:', {
    employeeId,
    selectedRole,
    comparisonLevel,
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
    // Get role-specific skills
    const currentRoleSkills = roleSkills[selectedRole as keyof typeof roleSkills];
    if (!currentRoleSkills) {
      console.warn('No skills found for role:', selectedRole);
      return [];
    }

    // Get all role skills
    const allRoleSkills = [
      ...currentRoleSkills.specialized,
      ...currentRoleSkills.common,
      ...currentRoleSkills.certifications
    ];

    // Create a set of role skill titles for efficient lookup
    const roleSkillTitles = new Set(allRoleSkills.map(skill => skill.title));

    // Start with employee skills and filter to only those that exist in role skills
    let skills = employeeSkills.filter(empSkill => 
      roleSkillTitles.has(empSkill.title) && toggledSkills.has(empSkill.title)
    );

    console.log('Filtered employee skills against role skills:', {
      totalEmployeeSkills: employeeSkills.length,
      matchingRoleSkills: skills.length,
      roleId: selectedRole
    });

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
      const skillLevel = (currentSkillState?.level || skill.level || 'unspecified').toLowerCase();
      
      if (selectedSkillLevel !== 'all') {
        matchesSkillLevel = skillLevel === selectedSkillLevel.toLowerCase();
      }

      const goalStatus = (currentSkillState?.goalStatus || skill.goalStatus || 'unknown').toLowerCase();

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
    roleId: selectedRole,
    totalSkills: employeeSkills.length,
    filteredSkills: filteredSkills.length,
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