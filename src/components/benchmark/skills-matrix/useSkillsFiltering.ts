import { useSkillsMatrixStore } from "./SkillsMatrixState";
import { useCompetencyStateReader } from "../../skills/competency/CompetencyStateReader";
import { roleSkills } from "../../skills/data/roleSkills";
import { getUnifiedSkillData } from "../../skills/data/skillDatabaseService";
import { useEmployeeSkillsStore } from "../../employee/store/employeeSkillsStore";
import { useRoleStore } from "../RoleBenchmark";

const getLevelPriority = (level: string): number => {
  switch (level?.toLowerCase()) {
    case 'advanced': return 4;
    case 'intermediate': return 3;
    case 'beginner': return 2;
    case 'unspecified': return 1;
    default: return 0;
  }
};

const getRequirementPriority = (required: string): number => {
  switch (required?.toLowerCase()) {
    case 'required': return 2;
    case 'preferred': return 1;
    default: return 0;
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
  selectedCategory: string,
  selectedWeight: string,
  isRoleBenchmark: boolean = false
) => {
  const { getSkillState } = useSkillsMatrixStore();
  const { getSkillCompetencyState } = useCompetencyStateReader();
  const employeeSkillsStore = useEmployeeSkillsStore();
  const { selectedRole: storeSelectedRole } = useRoleStore();
  
  const employeeSkills = employeeSkillsStore.getEmployeeSkills(employeeId);
  const currentRoleId = storeSelectedRole || selectedRole;

  console.log('Starting skills filtering with:', {
    employeeId,
    selectedRole: currentRoleId,
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

    const roleData = roleSkills[currentRoleId as keyof typeof roleSkills];
    if (!roleData) {
      console.warn('No role data found for:', currentRoleId);
      return [];
    }

    const allRoleSkills = [
      ...(roleData.specialized || []),
      ...(roleData.common || []),
      ...(roleData.certifications || [])
    ];

    console.log('Filtering skills for role:', {
      roleId: currentRoleId,
      roleTitle: roleData.title,
      totalSkills: allRoleSkills.length,
      skillTitles: allRoleSkills.map(s => s.title)
    });

    skills = skills.filter(empSkill => {
      const isRoleSkill = allRoleSkills.some(roleSkill => roleSkill.title === empSkill.title);
      const isToggled = toggledSkills.has(empSkill.title);
      return isRoleSkill && isToggled;
    });

    const uniqueSkills = new Map();
    skills.forEach(skill => {
      if (!uniqueSkills.has(skill.title)) {
        uniqueSkills.set(skill.title, skill);
      }
    });
    skills = Array.from(uniqueSkills.values());

    if (selectedCategory !== 'all') {
      skills = skills.filter(skill => {
        const skillData = getUnifiedSkillData(skill.title);
        return skillData?.category === selectedCategory;
      });
    }

    if (selectedWeight !== 'all') {
      skills = skills.filter(skill => {
        const skillData = getUnifiedSkillData(skill.title);
        return skillData?.weight === selectedWeight.toLowerCase();
      });
    }

    return skills.filter(skill => {
      let matchesLevel = true;
      let matchesInterest = true;
      let matchesSearch = true;
      let matchesSkillLevel = true;

      const skillState = getSkillState(skill.title, employeeId);
      const skillLevel = (skillState?.level || skill.level || 'unspecified').toLowerCase();
      
      if (selectedSkillLevel !== 'all') {
        matchesSkillLevel = skillLevel === selectedSkillLevel.toLowerCase();
      }

      const goalStatus = (skillState?.goalStatus || skill.goalStatus || 'unknown').toLowerCase();

      if (selectedInterest !== 'all') {
        switch (selectedInterest.toLowerCase()) {
          case 'skill_goal':
            matchesInterest = goalStatus === 'skill_goal';
            break;
          case 'not_interested':
            matchesInterest = goalStatus === 'not_interested';
            break;
          case 'unknown':
            matchesInterest = goalStatus === 'unknown';
            break;
          default:
            matchesInterest = true;
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
      const skillState = getSkillState(skill.title, employeeId);
      
      return {
        ...skill,
        id: unifiedData.id,
        weight: unifiedData.weight,
        category: unifiedData.category,
        subcategory: unifiedData.subcategory,
        employeeLevel: skillState?.level || skill.level || 'unspecified',
        roleLevel: competencyState?.level || 'unspecified',
        goalStatus: skillState?.goalStatus || skill.goalStatus || 'unknown',
        required: competencyState?.required || 'preferred'
      };
    })
    .sort((a, b) => {
      // First sort by role skill level (advanced to unspecified)
      const levelDiff = getLevelPriority(b.roleLevel) - getLevelPriority(a.roleLevel);
      if (levelDiff !== 0) return levelDiff;

      // Then sort by requirement (required before preferred)
      const requirementDiff = getRequirementPriority(b.required) - getRequirementPriority(a.required);
      if (requirementDiff !== 0) return requirementDiff;

      // Finally sort alphabetically by title
      return a.title.localeCompare(b.title);
    });
  };

  const filteredSkills = filterSkills();

  return { filteredSkills };
};
