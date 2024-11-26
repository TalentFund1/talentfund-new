import { roleSkills } from "../data/roleSkills";
import { getEmployeeSkills } from "../../benchmark/skills-matrix/initialSkills";

export const calculateSkillMatch = (
  employeeId: string,
  roleId: string,
  toggledSkills: Set<string>
) => {
  console.log('Calculating skill match:', { employeeId, roleId });
  
  const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills];
  if (!currentRoleSkills) {
    console.log('No role skills found for:', roleId);
    return { matchingCount: 0, totalCount: 0 };
  }

  const employeeSkills = getEmployeeSkills(employeeId);
  
  // Get all toggled skills for the role
  const allRoleSkills = [
    ...currentRoleSkills.specialized,
    ...currentRoleSkills.common,
    ...currentRoleSkills.certifications
  ];

  const toggledRoleSkills = allRoleSkills.filter(skill => toggledSkills.has(skill.title));
  const totalToggledSkills = toggledRoleSkills.length;

  // Match skills based on role profile skills
  const matchingSkills = toggledRoleSkills.filter(roleSkill => {
    const employeeSkill = employeeSkills.find(empSkill => empSkill.title === roleSkill.title);
    return employeeSkill !== undefined;
  });

  console.log('Skill match results:', {
    matching: matchingSkills.length,
    total: totalToggledSkills,
    matchingSkills: matchingSkills.map(s => s.title),
    toggledSkills: toggledRoleSkills.map(s => s.title)
  });

  return {
    matchingCount: matchingSkills.length,
    totalCount: totalToggledSkills
  };
};