import { useState } from 'react';
import { UnifiedSkill } from '../types/SkillTypes';
import { transformToUnifiedSkill } from '../utils/skillTransformation';
import { roleSkills } from '../data/roleSkills';

type SortDirection = 'asc' | 'desc' | null;
type SortField = 'growth' | 'salary' | null;

export const useSkillFiltering = (roleId: string, skillType: string) => {
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills] || roleSkills["123"];

  const getSkillsByType = (): UnifiedSkill[] => {
    console.log('Getting skills by type:', skillType);
    
    switch (skillType) {
      case "all":
        return [
          ...currentRoleSkills.specialized,
          ...currentRoleSkills.common,
          ...currentRoleSkills.certifications
        ].map(transformToUnifiedSkill);
      case "specialized":
        return currentRoleSkills.specialized.map(transformToUnifiedSkill);
      case "common":
        return currentRoleSkills.common.map(transformToUnifiedSkill);
      case "certification":
        return currentRoleSkills.certifications.map(transformToUnifiedSkill);
      default:
        return [];
    }
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : null);
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return {
    getSkillsByType,
    handleSort,
    sortField,
    sortDirection
  };
};