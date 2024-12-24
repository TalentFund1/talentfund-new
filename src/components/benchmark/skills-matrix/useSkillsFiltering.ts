import { useSkillsMatrixStore } from "./SkillsMatrixState";
import { useCompetencyStateReader } from "../../skills/competency/CompetencyStateReader";
import { getEmployeeSkills } from "./initialSkills";
import { roleSkills } from "../../skills/data/roleSkills";
import { getUnifiedSkillData } from "../../skills/data/skillDatabaseService";
import { EmployeeSkillAchievement } from "../../employee/types/employeeSkillTypes";
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
  const currentRoleSkills = roleSkills[selectedRole as keyof typeof roleSkills];

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

  const filterSkills = () => {
    let skills = [...employeeSkills];

    console.log('Starting skills filtering:', {
      totalSkills: skills.length,
      selectedCategory,
      selectedWeight,
      selectedLevel,
      selectedInterest,
      selectedSkillLevel,
      searchTerm
    });

    // Remove duplicates
    const uniqueSkills = new Map();
    skills.forEach(skill => {
      if (!uniqueSkills.has(skill.title)) {
        uniqueSkills.set(skill.title, skill);
      }
    });
    skills = Array.from(uniqueSkills.values());

    // Filter by role skills if in benchmark mode
    if (isRoleBenchmark) {
      const roleSkillTitles = new Set([
        ...(currentRoleSkills.specialized || []).map(s => s.title),
        ...(currentRoleSkills.common || []).map(s => s.title),
        ...(currentRoleSkills.certifications || []).map(s => s.title)
      ]);
      skills = skills.filter(skill => roleSkillTitles.has(skill.title));
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      skills = skills.filter(skill => {
        const skillData = getUnifiedSkillData(skill.title);
        return skillData?.category === selectedCategory;
      });
    }

    // Apply weight filter using universal skills database
    if (selectedWeight !== 'all') {
      skills = skills.filter(skill => {
        const skillData = getUnifiedSkillData(skill.title);
        console.log('Filtering by weight:', {
          skillTitle: skill.title,
          unifiedWeight: skillData?.weight,
          selectedWeight,
          matches: skillData?.weight === selectedWeight.toLowerCase()
        });
        return skillData?.weight === selectedWeight.toLowerCase();
      });
    }

    // Apply level and interest filters
    return skills.filter(skill => {
      let matchesLevel = true;
      let matchesInterest = true;
      let matchesSearch = true;
      let matchesSkillLevel = true;

      const competencyState = getSkillCompetencyState(skill.title, comparisonLevel, selectedRole);
      const roleSkillLevel = competencyState?.level || 'unspecified';

      if (selectedLevel !== 'all') {
        matchesLevel = roleSkillLevel.toLowerCase() === selectedLevel.toLowerCase();
      }

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
      console.log('Mapping skill with weight:', {
        title: skill.title,
        unifiedWeight: unifiedData.weight,
        originalWeight: skill.weight
      });
      return {
        ...skill,
        weight: unifiedData.weight,
        employeeLevel: currentStates[skill.title]?.level || skill.level || 'unspecified',
        roleLevel: getSkillCompetencyState(skill.title, comparisonLevel, selectedRole)?.level || 'unspecified',
        goalStatus: currentStates[skill.title]?.goalStatus || 'unknown'
      };
    })
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
