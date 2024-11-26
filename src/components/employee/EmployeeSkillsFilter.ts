import { Employee } from "../types/employeeTypes";
import { getEmployeeSkills } from "../benchmark/skills-matrix/initialSkills";
import { roleSkills } from "../skills/data/roleSkills";
import { getSkillProfileId, getBaseRole } from "../utils/roleUtils";

export const filterEmployeesBySkills = (
  employees: Employee[],
  selectedSkills: string[]
): Employee[] => {
  console.log('Filtering employees by skills:', selectedSkills);

  if (selectedSkills.length === 0) {
    return employees;
  }

  return employees.filter(employee => {
    const employeeSkills = getEmployeeSkills(employee.id);
    const matchingSkills = selectedSkills.filter(skillName => 
      employeeSkills.some(empSkill => empSkill.title === skillName)
    );

    console.log(`Employee ${employee.name} matching skills:`, {
      matched: matchingSkills.length,
      total: selectedSkills.length,
      skills: matchingSkills
    });

    // Update the skillCount to reflect the current match
    employee.skillCount = `${matchingSkills.length}/${selectedSkills.length}`;
    
    return matchingSkills.length > 0;
  });
};

export const getSkillMatchCount = (
  employeeId: string,
  roleId: string
): { matched: number; total: number } => {
  const employeeSkills = getEmployeeSkills(employeeId);
  // Get the employee's actual role ID instead of using the passed roleId
  const profileId = roleId;
  const currentRoleSkills = roleSkills[profileId as keyof typeof roleSkills];

  console.log('Getting skill match count:', {
    employeeId,
    roleId,
    profileId,
    hasRoleSkills: !!currentRoleSkills,
    employeeSkills: employeeSkills.map(s => s.title)
  });

  if (!currentRoleSkills) {
    console.warn('No role skills found for profile:', profileId);
    return { matched: 0, total: 0 };
  }

  // Include all skills (specialized, common, and certifications) for consistent counting
  const allRequiredSkills = [
    ...currentRoleSkills.specialized,
    ...currentRoleSkills.common,
    ...currentRoleSkills.certifications
  ];

  const matchingSkills = allRequiredSkills.filter(roleSkill =>
    employeeSkills.some(empSkill => empSkill.title === roleSkill.title)
  );

  console.log(`Skill match calculation for ${employeeId}:`, {
    roleId,
    profileId,
    totalRequired: allRequiredSkills.length,
    specializedCount: currentRoleSkills.specialized.length,
    commonCount: currentRoleSkills.common.length,
    certificationCount: currentRoleSkills.certifications.length,
    matched: matchingSkills.length,
    employeeSkills: employeeSkills.map(s => s.title),
    requiredSkills: allRequiredSkills.map(s => s.title),
    matchingSkills: matchingSkills.map(s => s.title)
  });

  return {
    matched: matchingSkills.length,
    total: allRequiredSkills.length
  };
};