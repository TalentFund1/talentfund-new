import { UnifiedSkill } from "../../skills/types/SkillTypes";
import { getUnifiedSkillData } from "../../skills/data/skillDatabaseService";
import { filterSkillsByCategory } from "./skillCategories";
import { roleSkills } from "../../skills/data/roleSkills";

export const useSkillsFiltering = (
  employeeId: string,
  roleId: string,
  roleLevel: string,
  selectedLevel: string,
  selectedInterest: string,
  selectedSkillLevel: string,
  searchTerm: string,
  toggledSkills: Set<string>,
  isRoleBenchmark: boolean = false
) => {
  console.log('useSkillsFiltering - Filtering with params:', {
    employeeId,
    roleId,
    roleLevel,
    selectedLevel,
    selectedInterest,
    selectedSkillLevel,
    searchTerm,
    toggledSkillsCount: toggledSkills.size,
    isRoleBenchmark
  });

  const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills] || roleSkills["123"];
  
  // Get all skills for the role
  const allSkills = [
    ...currentRoleSkills.specialized,
    ...currentRoleSkills.common,
    ...currentRoleSkills.certifications
  ];

  // Filter skills based on category using universal database
  const filterByCategory = (skills: UnifiedSkill[], category: string) => {
    if (category === "all") return skills;

    return skills.filter(skill => {
      const skillData = getUnifiedSkillData(skill.title);
      switch (category) {
        case "specialized":
          return skillData.category === "specialized";
        case "common":
          return skillData.category === "common";
        case "certification":
          return skillData.category === "certification";
        default:
          return true;
      }
    });
  };

  // Filter skills based on selected level
  const filterByLevel = (skills: UnifiedSkill[]) => {
    if (selectedLevel === "all") return skills;

    return skills.filter(skill => {
      const skillData = getUnifiedSkillData(skill.title);
      return skillData.level.toLowerCase() === selectedLevel.toLowerCase();
    });
  };

  // Filter skills based on interest/requirement
  const filterByInterest = (skills: UnifiedSkill[]) => {
    if (selectedInterest === "all") return skills;

    return skills.filter(skill => {
      const skillData = getUnifiedSkillData(skill.title);
      return skillData.requirement?.toLowerCase() === selectedInterest.toLowerCase();
    });
  };

  // Filter skills based on skill level
  const filterBySkillLevel = (skills: UnifiedSkill[]) => {
    if (selectedSkillLevel === "all") return skills;

    return skills.filter(skill => {
      const skillData = getUnifiedSkillData(skill.title);
      return skillData.level.toLowerCase() === selectedSkillLevel.toLowerCase();
    });
  };

  // Filter skills based on search term
  const filterBySearch = (skills: UnifiedSkill[]) => {
    if (!searchTerm) return skills;

    const searchLower = searchTerm.toLowerCase();
    return skills.filter(skill => 
      skill.title.toLowerCase().includes(searchLower) ||
      skill.subcategory?.toLowerCase().includes(searchLower)
    );
  };

  // Apply all filters
  let filteredSkills = allSkills;
  
  // Only filter by toggled skills if in role benchmark mode
  if (isRoleBenchmark) {
    filteredSkills = filteredSkills.filter(skill => toggledSkills.has(skill.title));
  }

  filteredSkills = filterByCategory(filteredSkills, selectedLevel);
  filteredSkills = filterByLevel(filteredSkills);
  filteredSkills = filterByInterest(filteredSkills);
  filteredSkills = filterBySkillLevel(filteredSkills);
  filteredSkills = filterBySearch(filteredSkills);

  console.log('useSkillsFiltering - Results:', {
    totalSkills: allSkills.length,
    filteredCount: filteredSkills.length,
    filters: {
      level: selectedLevel,
      interest: selectedInterest,
      skillLevel: selectedSkillLevel,
      search: searchTerm
    }
  });

  return {
    filteredSkills
  };
};