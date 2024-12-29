import { useSkillsMatrixStore } from "./SkillsMatrixState";
import { useCompetencyStateReader } from "../../skills/competency/CompetencyStateReader";
import { roleSkills } from "../../skills/data/roleSkills";
import { getUnifiedSkillData } from "../../skills/data/skillDatabaseService";
import { useEmployeeSkillsStore } from "../../employee/store/employeeSkillsStore";
import { useRoleStore } from "../RoleBenchmark";
import { useMemo } from "react";

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

    return skills;
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