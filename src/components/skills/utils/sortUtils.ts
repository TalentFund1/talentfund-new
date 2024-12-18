import { UnifiedSkill } from "../types/SkillTypes";

export const sortSkills = (
  skills: UnifiedSkill[],
  sortField: 'growth' | 'salary' | null,
  sortDirection: 'asc' | 'desc' | null,
  toggledSkills: Set<string>
): UnifiedSkill[] => {
  console.log('Sorting skills:', { sortField, sortDirection, skillsCount: skills.length });

  if (!sortField || !sortDirection) {
    return skills;
  }

  const sortedSkills = [...skills].sort((a, b) => {
    const aValue = sortField === 'growth' ? 
      parseFloat(a.growth.replace('%', '')) : 
      parseFloat(a.salary?.replace(/[^0-9.-]+/g, '') || '0');
    
    const bValue = sortField === 'growth' ? 
      parseFloat(b.growth.replace('%', '')) : 
      parseFloat(b.salary?.replace(/[^0-9.-]+/g, '') || '0');

    return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
  });

  console.log('Sorted skills result:', sortedSkills.length);
  return sortedSkills;
};