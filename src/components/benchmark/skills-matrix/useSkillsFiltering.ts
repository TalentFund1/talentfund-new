import { useSkillsMatrixStore } from "./SkillsMatrixState";
import { useCompetencyStateReader } from "../../skills/competency/CompetencyStateReader";
import { roleSkills } from "../../skills/data/roleSkills";
import { getUnifiedSkillData } from "../../skills/data/skillDatabaseService";
import { useEmployeeSkillsStore } from "../../employee/store/employeeSkillsStore";
import { useRoleStore } from "../RoleBenchmark";
import { useMemo } from "react";
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
    const toggledRoleSkills = allRoleSkills
      .filter(skill => toggledSkills.has(skill.title))
      .map(skill => {
        const unifiedData = getUnifiedSkillData(skill.title);
        const hasSkill = employeeSkills.some(empSkill => empSkill.title === skill.title);
        
        return {
          ...skill,
          id: unifiedData.id || `${skill.title}-id`,
          category: unifiedData.category || 'specialized',
          weight: unifiedData.weight || 'technical',
          subcategory: unifiedData.subcategory || 'General',
          hasSkill,
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

    if (selectedCategory !== 'all') {
      return toggledRoleSkills.filter(skill => skill.category === selectedCategory);
    }

    if (selectedWeight !== 'all') {
      return toggledRoleSkills.filter(skill => skill.weight === selectedWeight.toLowerCase());
    }

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