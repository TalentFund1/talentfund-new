import { Employee } from "../../types/employeeTypes";
import { getSkillProfileId, getLevel } from "../../EmployeeTable";
import { calculateBenchmarkPercentage } from "../BenchmarkCalculator";
import { getEmployeeSkills } from "../../benchmark/skills-matrix/initialSkills";
import { roleSkills } from "../../skills/data/roleSkills";

export const calculateEmployeeBenchmark = (
  employee: Employee,
  selectedJobTitle: string[],
  currentStates: any,
  toggledSkills: Set<string>,
  getSkillCompetencyState: any
) => {
  // Get role ID based on selection or employee's current role
  const targetRoleId = selectedJobTitle.length > 0 
    ? getSkillProfileId(selectedJobTitle[0])
    : getSkillProfileId(employee.role);

  const employeeLevel = getLevel(employee.role);
  
  console.log('Calculating benchmark for employee:', {
    employeeName: employee.name,
    employeeRole: employee.role,
    targetRoleId,
    selectedJobTitle,
    employeeLevel
  });

  // Calculate benchmark percentage
  return calculateBenchmarkPercentage(
    employee.id,
    targetRoleId,
    employeeLevel,
    currentStates,
    toggledSkills,
    getSkillCompetencyState
  );
};

export const getSkillMatch = (
  employee: Employee,
  selectedSkills: string[],
  targetRoleId: string,
  toggledSkills: Set<string>
) => {
  const employeeSkills = getEmployeeSkills(employee.id);

  // If we're in skills filter view (selectedSkills.length > 0)
  if (selectedSkills.length > 0) {
    const matchingSkills = selectedSkills.filter(skillName => 
      employeeSkills.some(empSkill => empSkill.title === skillName)
    );
    return `${matchingSkills.length} / ${selectedSkills.length}`;
  }

  // Default role-based skill matching
  const roleData = roleSkills[targetRoleId as keyof typeof roleSkills];
  if (!roleData) return "0 / 0";

  const allRoleSkills = [
    ...roleData.specialized,
    ...roleData.common,
    ...roleData.certifications
  ].filter(skill => toggledSkills.has(skill.title));

  const matchingSkills = allRoleSkills.filter(roleSkill => 
    employeeSkills.some(empSkill => empSkill.title === roleSkill.title)
  );

  return `${matchingSkills.length} / ${allRoleSkills.length}`;
};

export const getBenchmarkColor = (percentage: number) => {
  if (percentage >= 90) return 'bg-green-100 text-green-800';
  if (percentage >= 70) return 'bg-orange-100 text-orange-800';
  return 'bg-red-100 text-red-800';
};