import { useSkillsMatrixStore } from "./SkillsMatrixState";
import { useCompetencyStateReader } from "../../skills/competency/CompetencyStateReader";
import { getEmployeeSkills } from "./initialSkills";
import { roleSkills } from "../../skills/data/roleSkills";
import { getUnifiedSkillData } from "../../skills/data/skillDatabaseService";
import { EmployeeSkillAchievement } from "../../employee/types/employeeSkillTypes";
import { UnifiedSkill } from "../../skills/types/SkillTypes";

// Updated levelOrder to sort from Advanced to Unspecified
const levelOrder = {
  'unspecified': 3,
  'beginner': 2,
  'intermediate': 1,
  'advanced': 0
};

const goalStatusOrder = {
  'unknown': 3,
  'not_interested': 2,
  'required': 1,
  'skill_goal': 0
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
    let skills = [...employeeSkills];
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

    skills = skills.filter(empSkill => {
      const isRoleSkill = allRoleSkills.some(roleSkill => roleSkill.title === empSkill.title);
      const isToggled = toggledSkills.has(empSkill.title);
      return isRoleSkill && isToggled;
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
    skills = skills.filter(skill => {
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
    });

    // Sort skills by level and goal status
    return skills
      .map(skill => {
        const unifiedData = getUnifiedSkillData(skill.title);
        const competencyState = getSkillCompetencyState(skill.title, comparisonLevel, selectedRole);
        const currentState = currentStates[skill.title];
        
        return {
          ...skill,
          id: unifiedData.id,
          weight: unifiedData.weight,
          category: unifiedData.category,
          subcategory: unifiedData.subcategory,
          employeeLevel: currentState?.level || skill.level || 'unspecified',
          roleLevel: competencyState?.level || 'unspecified',
          goalStatus: currentState?.goalStatus || skill.goalStatus || 'unknown'
        };
      })
      .sort((a, b) => {
        // Sort by level (Advanced to Unspecified)
        // Reverse the comparison to get Advanced (0) at the top
        const levelDiff = (levelOrder[b.employeeLevel.toLowerCase()] || 3) - 
                         (levelOrder[a.employeeLevel.toLowerCase()] || 3);
        
        if (levelDiff !== 0) return levelDiff;
        
        // Then sort by goal status (Skill Goal to Unknown)
        const goalStatusDiff = (goalStatusOrder[a.goalStatus.toLowerCase()] || 3) - 
                             (goalStatusOrder[b.goalStatus.toLowerCase()] || 3);
        
        if (goalStatusDiff !== 0) return goalStatusDiff;
        
        // Finally sort alphabetically
        return a.title.localeCompare(b.title);
      });
  };

  const filteredSkills = filterSkills();

  console.log('Skills filtering result:', {
    employeeId,
    totalEmployeeSkills: employeeSkills.length,
    filteredSkills: filteredSkills.length,
    filteredSkillTitles: filteredSkills.map(s => ({
      title: s.title,
      level: s.employeeLevel,
      goalStatus: s.goalStatus
    })),
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