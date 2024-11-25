import { Employee } from "../types/employeeTypes";
import { getEmployeeSkills } from "../benchmark/skills-matrix/initialSkills";
import { roleSkills } from "../skills/data/roleSkills";
import { getSkillProfileId } from "../EmployeeTable";

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
  const profileId = getSkillProfileId(roleId);
  const currentRoleSkills = roleSkills[profileId as keyof typeof roleSkills];

  if (!currentRoleSkills) {
    console.warn('No role skills found for profile:', profileId);
    return { matched: 0, total: 0 };
  }

  // Only count specialized and common skills, excluding certifications
  const requiredSkills = [
    ...currentRoleSkills.specialized,
    ...currentRoleSkills.common
  ];

  const matchingSkills = requiredSkills.filter(roleSkill =>
    employeeSkills.some(empSkill => empSkill.title === roleSkill.title)
  );

  console.log(`Skill match calculation for ${employeeId}:`, {
    matched: matchingSkills.length,
    total: requiredSkills.length,
    roleId,
    profileId,
    employeeSkills: employeeSkills.map(s => s.title),
    requiredSkills: requiredSkills.map(s => s.title)
  });

  return {
    matched: matchingSkills.length,
    total: requiredSkills.length
  };
};