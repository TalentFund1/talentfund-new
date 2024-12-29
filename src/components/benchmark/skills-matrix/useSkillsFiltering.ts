import { useSkillsMatrixStore } from "./SkillsMatrixState";
import { useCompetencyStateReader } from "../../skills/competency/CompetencyStateReader";
import { roleSkills } from "../../skills/data/roleSkills";
import { getUnifiedSkillData } from "../../skills/data/skillDatabaseService";
import { useEmployeeSkillsStore } from "../../employee/store/employeeSkillsStore";
import { useRoleStore } from "../RoleBenchmark";
import { useMemo } from "react";
import { UnifiedSkill } from "../../skills/types/SkillTypes";

const getLevelPriority = (level: string, hasSkill: boolean): number => {
  if (!hasSkill) return 5; // Missing skills go last
  switch (level?.toLowerCase()) {
    case 'advanced': return 1;
    case 'intermediate': return 2;
    case 'beginner': return 3;
    case 'unspecified': return 4;
    default: return 5;
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
  
  const employeeSkills = useMemo(() => {
    return employeeSkillsStore.getEmployeeSkills(employeeId);
  }, [employeeId, employeeSkillsStore]);

  const currentRoleId = storeSelectedRole || selectedRole;

  const filteredSkills = useMemo(() => {
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

    // Get all toggled skills from role skills
    let toggledRoleSkills = allRoleSkills
      .filter(skill => toggledSkills.has(skill.title))
      .map(skill => {
        const unifiedData = getUnifiedSkillData(skill.title);
        const hasSkill = employeeSkills.some(empSkill => empSkill.title === skill.title);
        const employeeSkill = employeeSkills.find(empSkill => empSkill.title === skill.title);
        
        return {
          ...skill,
          id: unifiedData.id || `${skill.title}-id`,
          category: unifiedData.category || 'specialized',
          weight: unifiedData.weight || 'technical',
          subcategory: unifiedData.subcategory || 'General',
          hasSkill,
          level: employeeSkill?.level || 'unspecified',
          minimumLevel: 'beginner',
          requirementLevel: 'required',
          metrics: {
            growth: unifiedData.growth || '0%',
            salary: unifiedData.salary || 'market',
            skillScore: 0
          }
        } as UnifiedSkill & { hasSkill: boolean };
      });

    console.log('Filtered toggled skills:', {
      totalSkills: toggledRoleSkills.length,
      missingSkills: toggledRoleSkills.filter(s => !s.hasSkill).length,
      presentSkills: toggledRoleSkills.filter(s => s.hasSkill).length
    });

    // Apply category and weight filters
    if (selectedCategory !== 'all') {
      toggledRoleSkills = toggledRoleSkills.filter(skill => skill.category === selectedCategory);
    }

    if (selectedWeight !== 'all') {
      toggledRoleSkills = toggledRoleSkills.filter(skill => skill.weight === selectedWeight.toLowerCase());
    }

    // Sort skills by level priority
    toggledRoleSkills.sort((a, b) => {
      const levelPriorityA = getLevelPriority(a.level, a.hasSkill);
      const levelPriorityB = getLevelPriority(b.level, b.hasSkill);
      
      if (levelPriorityA !== levelPriorityB) {
        return levelPriorityA - levelPriorityB;
      }
      
      // If levels are the same, sort alphabetically by title
      return a.title.localeCompare(b.title);
    });

    console.log('Final sorted skills:', {
      totalSkills: toggledRoleSkills.length,
      sortedSkills: toggledRoleSkills.map(s => ({
        title: s.title,
        level: s.level,
        hasSkill: s.hasSkill,
        priority: getLevelPriority(s.level, s.hasSkill)
      }))
    });

    return toggledRoleSkills;
  }, [
    employeeId,
    currentRoleId,
    employeeSkills,
    selectedCategory,
    selectedWeight,
    toggledSkills
  ]);

  return { filteredSkills };
};