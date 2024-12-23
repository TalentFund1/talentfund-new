import { UnifiedSkill } from '../../skills/types/SkillTypes';
import { getUnifiedSkillData } from '../../skills/data/skillDatabaseService';
import { roleSkills } from '../../skills/data/roleSkills';

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
  console.log('useSkillsFiltering - Starting filtering with params:', {
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

  // Get all skills for the role
  const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills] || roleSkills["123"];
  const allSkills = [
    ...currentRoleSkills.specialized,
    ...currentRoleSkills.common,
    ...currentRoleSkills.certifications
  ];

  // Helper function to filter by category using universal database
  const filterByCategory = (skills: UnifiedSkill[], category: string) => {
    if (category === "all") return skills;

    console.log('Filtering by category:', {
      category,
      totalSkills: skills.length
    });

    return skills.filter(skill => {
      const skillData = getUnifiedSkillData(skill.title);
      const matches = category === skillData.category;
      
      console.log('Checking skill category:', {
        skill: skill.title,
        category: skillData.category,
        requestedCategory: category,
        matches
      });
      
      return matches;
    });
  };

  // Filter by level
  const filterByLevel = (skills: UnifiedSkill[]) => {
    if (selectedLevel === "all") return skills;

    console.log('Filtering by level:', {
      selectedLevel,
      totalSkills: skills.length
    });

    return skills.filter(skill => {
      const skillData = getUnifiedSkillData(skill.title);
      return skillData.level.toLowerCase() === selectedLevel.toLowerCase();
    });
  };

  // Filter by interest/requirement
  const filterByInterest = (skills: UnifiedSkill[]) => {
    if (selectedInterest === "all") return skills;

    console.log('Filtering by interest:', {
      selectedInterest,
      totalSkills: skills.length
    });

    return skills.filter(skill => {
      const skillData = getUnifiedSkillData(skill.title);
      return skillData.requirement?.toLowerCase() === selectedInterest.toLowerCase();
    });
  };

  // Filter by skill level
  const filterBySkillLevel = (skills: UnifiedSkill[]) => {
    if (selectedSkillLevel === "all") return skills;

    console.log('Filtering by skill level:', {
      selectedSkillLevel,
      totalSkills: skills.length
    });

    return skills.filter(skill => {
      const skillData = getUnifiedSkillData(skill.title);
      return skillData.level.toLowerCase() === selectedSkillLevel.toLowerCase();
    });
  };

  // Filter by search term
  const filterBySearch = (skills: UnifiedSkill[]) => {
    if (!searchTerm) return skills;

    console.log('Filtering by search term:', {
      searchTerm,
      totalSkills: skills.length
    });

    const searchLower = searchTerm.toLowerCase();
    return skills.filter(skill => 
      skill.title.toLowerCase().includes(searchLower) ||
      skill.subcategory?.toLowerCase().includes(searchLower)
    );
  };

  // Apply all filters
  let filteredSkills = [...allSkills];
  
  // Only filter by toggled skills if in role benchmark mode
  if (isRoleBenchmark) {
    console.log('Filtering toggled skills:', {
      before: filteredSkills.length,
      toggledSkills: Array.from(toggledSkills)
    });
    
    filteredSkills = filteredSkills.filter(skill => toggledSkills.has(skill.title));
    
    console.log('After toggled skills filter:', {
      after: filteredSkills.length
    });
  }

  // Apply category filter first using selectedCategory
  filteredSkills = filterByCategory(filteredSkills, selectedCategory);
  
  // Then apply other filters
  filteredSkills = filterByLevel(filteredSkills);
  filteredSkills = filterByInterest(filteredSkills);
  filteredSkills = filterBySkillLevel(filteredSkills);
  filteredSkills = filterBySearch(filteredSkills);

  console.log('useSkillsFiltering - Final results:', {
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